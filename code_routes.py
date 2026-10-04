from flask import Blueprint, request, jsonify, current_app
from flask_jwt_extended import jwt_required, get_jwt_identity
import requests
from datetime import date

from extensions import db
from models.stats import UserStats
from models.daily_stats import DailyCodingStats

from services.gamification_service import (
    process_code_run,
    process_error_solved
)

from utils import get_json_body


code_bp = Blueprint("code", __name__)

JUDGE0_URL = "https://ce.judge0.com"

LANGUAGE_IDS = {
    "c": 50,
    "cpp": 54,
    "java": 62,
    "python": 71,
    "html": None
}

MAX_CODE_LENGTH = 20000


def get_daily_stats(user_id):

    today = date.today()

    daily_stats = DailyCodingStats.query.filter_by(
        user_id=user_id,
        date=today
    ).first()

    if not daily_stats:
        daily_stats = DailyCodingStats(
            user_id=user_id,
            date=today
        )

        db.session.add(daily_stats)
        db.session.flush()

    return daily_stats


def update_daily_run_stats(
    daily_stats,
    language,
    accepted,
    xp_earned
):

    daily_stats.total_code_runs += 1

    if accepted:
        daily_stats.successful_runs += 1
    else:
        daily_stats.errors += 1

    daily_stats.xp_earned += xp_earned

    if not daily_stats.favourite_language:
        daily_stats.favourite_language = language


def get_success_rate(daily_stats):

    if daily_stats.total_code_runs == 0:
        return 0

    return round(
        (
            daily_stats.successful_runs
            / daily_stats.total_code_runs
        ) * 100,
        1
    )


# Run code
@code_bp.route("/api/code/run", methods=["POST"])
@jwt_required()
def run_code():

    user_id = int(get_jwt_identity())

    data = get_json_body()

    if data is None:
        return jsonify({
            "error": "Request body must be a JSON object"
        }), 400

    language = data.get("language")
    code = data.get("code")

    if (
        not isinstance(language, str)
        or not isinstance(code, str)
        or not language.strip()
        or not code.strip()
    ):
        return jsonify({
            "error": "Language and code are required"
        }), 400

    if len(code) > MAX_CODE_LENGTH:
        return jsonify({
            "error": f"Code too long (max {MAX_CODE_LENGTH} characters)"
        }), 413

    language = language.lower().strip()

    if language not in LANGUAGE_IDS:
        return jsonify({
            "error": "Language not supported",
            "supported_languages": list(LANGUAGE_IDS.keys())
        }), 400

    stats = UserStats.query.filter_by(
        user_id=user_id
    ).first()

    if not stats:
        stats = UserStats(user_id=user_id)
        db.session.add(stats)
        db.session.flush()

    daily_stats = get_daily_stats(user_id)

    # HTML preview
    if language == "html":

        gamification = process_code_run(
            stats,
            accepted=True
        )

        xp_earned = gamification.get(
            "xp_earned",
            0
        )

        update_daily_run_stats(
            daily_stats,
            "html",
            True,
            xp_earned
        )

        db.session.commit()

        return jsonify({
            "success": True,
            "user_id": user_id,
            "language": "html",
            "status": {
                "id": 3,
                "description": "Accepted"
            },
            "accepted": True,
            "output": code,
            "preview": code,
            "error": None,
            "compile_output": None,
            "time": None,
            "memory": None,
            "gamification": gamification,
            "daily_stats": {
                "total_code_runs": daily_stats.total_code_runs,
                "successful_runs": daily_stats.successful_runs,
                "errors": daily_stats.errors,
                "success_rate": get_success_rate(daily_stats),
                "xp_earned": daily_stats.xp_earned
            }
        }), 200

    # Send code to Judge0
    try:

        response = requests.post(
            f"{JUDGE0_URL}/submissions",
            params={
                "base64_encoded": "false",
                "wait": "true"
            },
            json={
                "source_code": code,
                "language_id": LANGUAGE_IDS[language],
                "cpu_time_limit": 2,
                "memory_limit": 128000
            },
            timeout=15
        )

        if response.status_code not in [200, 201]:

            db.session.rollback()

            current_app.logger.error(
                "Judge0 submission failed: %s %s",
                response.status_code,
                response.text
            )

            return jsonify({
                "error": "Judge0 submission failed",
                "status_code": response.status_code
            }), 502

        result = response.json()

        status = result.get(
            "status",
            {}
        )

        accepted = (
            isinstance(status, dict)
            and status.get("id") == 3
        )

        gamification = process_code_run(
            stats,
            accepted=accepted
        )

        xp_earned = gamification.get(
            "xp_earned",
            0
        )

        update_daily_run_stats(
            daily_stats,
            language,
            accepted,
            xp_earned
        )

        db.session.commit()

        return jsonify({

            "success": True,

            "user_id": user_id,

            "language": language,

            "status": result.get("status"),

            "accepted": accepted,

            "output": result.get("stdout"),

            "error": result.get("stderr"),

            "compile_output": result.get(
                "compile_output"
            ),

            "time": result.get("time"),

            "memory": result.get("memory"),

            "gamification": gamification,

            "daily_stats": {

                "total_code_runs":
                    daily_stats.total_code_runs,

                "successful_runs":
                    daily_stats.successful_runs,

                "errors":
                    daily_stats.errors,

                "success_rate":
                    get_success_rate(daily_stats),

                "xp_earned":
                    daily_stats.xp_earned
            }

        }), 200

    except requests.Timeout:

        db.session.rollback()

        return jsonify({
            "error": "Judge0 request timed out"
        }), 504

    except requests.RequestException:

        db.session.rollback()

        current_app.logger.exception(
            "Judge0 request failed"
        )

        return jsonify({
            "error": "Judge0 service unavailable"
        }), 502

    except Exception:

        db.session.rollback()

        current_app.logger.exception(
            "run_code failed"
        )

        return jsonify({
            "error": "Server error"
        }), 500


# Error solved
@code_bp.route(
    "/api/code/error-solved",
    methods=["POST"]
)
@jwt_required()
def error_solved():

    user_id = int(get_jwt_identity())

    stats = UserStats.query.filter_by(
        user_id=user_id
    ).first()

    if not stats:
        return jsonify({
            "error": "Stats not found"
        }), 404

    gamification = process_error_solved(
        stats
    )

    db.session.commit()

    return jsonify({
        "success": True,
        "user_id": user_id,
        "gamification": gamification
    }), 200


# Add coding time
@code_bp.route(
    "/api/code/time",
    methods=["POST"]
)
@jwt_required()
def add_coding_time():

    user_id = int(get_jwt_identity())

    data = request.get_json(
        silent=True
    )

    if not isinstance(data, dict):
        return jsonify({
            "error": "Request body must be JSON object"
        }), 400

    seconds = data.get("seconds")

    if not isinstance(seconds, int):
        return jsonify({
            "error": "seconds must be greater than 0"
        }), 400

    if seconds <= 0:
        return jsonify({
            "error": "seconds must be greater than 0"
        }), 400

    if seconds > 600:
        return jsonify({
            "error": "Maximum 600 seconds allowed per request"
        }), 400

    stats = UserStats.query.filter_by(
        user_id=user_id
    ).first()

    if not stats:
        return jsonify({
            "error": "Stats not found"
        }), 404

    daily_stats = get_daily_stats(
        user_id
    )

    stats.total_coding_seconds += seconds

    daily_stats.coding_seconds += seconds

    db.session.commit()

    return jsonify({

        "success": True,

        "user_id": user_id,

        "coding_seconds":
            daily_stats.coding_seconds,

        "added_seconds":
            seconds

    }), 200