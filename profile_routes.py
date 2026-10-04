from flask import Blueprint, jsonify , request
from flask_jwt_extended import jwt_required, get_jwt_identity

from models.user import User
from models.stats import UserStats
from extensions import db
from services.gamification_service import (
    get_all_badges,
    get_effective_daily_xp,
    get_effective_streak
)

profile_bp = Blueprint("profile", __name__)


@profile_bp.route("/api/profile", methods=["GET"])
@jwt_required()
def get_profile():

    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    stats = UserStats.query.filter_by(
        user_id=user_id
    ).first()

    if not stats:
        return jsonify({
            "error": "Stats not found"
        }), 404

    daily_xp = get_effective_daily_xp(stats)

    return jsonify({
        "user": {
            "id": user.id,
            "username": user.username,
            "email": user.email
        },

        "stats": {
            "score": stats.total_score,
            "xp": stats.total_xp,
            "daily_xp": daily_xp,
            "level": stats.level,
            "streak": get_effective_streak(stats),
            "code_runs": stats.total_code_runs,
            "error_solved": stats.errors_solved,
            "coding_seconds": stats.total_coding_seconds
        },

        "badges": get_all_badges(stats)

    }), 200


@profile_bp.route("/api/favourite-language",methods = ["GET"])
@jwt_required()
def get_favourite_language():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error" : "User not found"
        }),404

    return jsonify({
        "favourite_language" : user.favourite_language
    }),200

@profile_bp.route("/api/favourite-language",methods=["PUT"])
@jwt_required()
def update_favourite_language():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user :
        return jsonify({
            "error" : "User not found"
        }),404

    data = request.get_json(silent=True)

    if not isinstance(data,dict):
        return jsonify({
            "error" : "Request body must be JSON object"
        }),400

    language = data.get("language")

    if not isinstance(language,str) or not language.strip():
        return jsonify({
            "error" : "Language is requried"
        }),400

    language = language.strip()
    user.favourite_language = language

    db.session.commit()

    return jsonify({
        "success" : True,
        "message" : "Favourite language updated",
        "favourite_language" : user.favourite_language
    }),200

@profile_bp.route("/api/users/search", methods=["GET"])
@jwt_required()
def search_users():

    username = request.args.get("username", "").strip()

    if not username:
        return jsonify({
            "error": "Username is required"
        }), 400

    users = User.query.filter(
        User.username.ilike(f"%{username}%")
    ).limit(10).all()

    return jsonify({
        "users": [
            {
                "id": user.id,
                "username": user.username
            }
            for user in users
        ]
    }), 200

