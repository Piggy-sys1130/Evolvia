from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from datetime import date

from extensions import db
from models.user import User
from models.stats import UserStats
from models.daily_stats import DailyCodingStats

from services.gamification_service import (
    DAILY_XP_MAX,
    get_all_badges,
    get_effective_daily_xp,
    get_effective_streak,
    update_level
)


stats_bp = Blueprint("stats", __name__)


@stats_bp.route("/api/stats", methods=["GET"])
@jwt_required()
def get_stats():

    user_id = int(get_jwt_identity())

    stats = UserStats.query.filter_by(
        user_id=user_id
    ).first()

    if not stats:
        return jsonify({
            "error": "Stats not found"
        }), 404

    update_level(stats)
    db.session.commit()

    badges = get_all_badges(stats)

    daily_xp = get_effective_daily_xp(stats)

    return jsonify({

        "score": stats.total_score,

        "xp": stats.total_xp,

        "daily_xp": daily_xp,

        "daily_xp_max": DAILY_XP_MAX,

        "daily_xp_remaining": max(
            0,
            DAILY_XP_MAX - daily_xp
        ),

        "level": stats.level,

        "code_runs": stats.total_code_runs,

        "errors_solved": stats.errors_solved,

        "coding_seconds": stats.total_coding_seconds,

        "streak": get_effective_streak(stats),

        "badges": badges

    }), 200


@stats_bp.route("/api/daily-stats", methods=["GET"])
@jwt_required()
def get_daily_stats():

    user_id = int(get_jwt_identity())

    today = date.today()

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

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

    # Profile wali favourite language
    daily_stats.favourite_language = (
        user.favourite_language
    )

    db.session.commit()

    total_runs = daily_stats.total_code_runs

    successful_runs = daily_stats.successful_runs

    if total_runs > 0:

        success_rate = round(
            (
                successful_runs
                / total_runs
            ) * 100,
            1
        )

    else:

        success_rate = 0

    return jsonify({

        "date": today.isoformat(),

        "total_code_runs":
            total_runs,

        "successful_runs":
            successful_runs,

        "errors":
            daily_stats.errors,

        "success_rate":
            success_rate,

        "favourite_language":
            daily_stats.favourite_language,

        "coding_seconds":
            daily_stats.coding_seconds,

        "xp_earned":
            daily_stats.xp_earned

    }), 200