from flask import Blueprint, jsonify , request
from flask_jwt_extended import jwt_required, get_jwt_identity
from models.user import User

from models.notification import Notification
from extensions import db

from services.notification_service import create_notification



notification_bp = Blueprint("notification", __name__)


@notification_bp.route("/api/notifications", methods=["GET"])
@jwt_required()
def get_notifications():

    user_id = int(get_jwt_identity())

    notifications = Notification.query.filter_by(
        user_id=user_id
    ).order_by(
        Notification.created_at.desc()
    ).all()

    return jsonify({
        "notifications": [
            {
                "id": notification.id,
                "title": notification.title,
                "message": notification.message,
                "type": notification.notification_type,
                "is_read": notification.is_read,
                "created_at": notification.created_at.isoformat()
            }
            for notification in notifications
        ]
    }), 200

@notification_bp.route("/api/notifications/test",methods=["POST"])
@jwt_required()
def create_test_notification():
    user_id = int(get_jwt_identity())
    notification = create_notification(
        user_id,
        "Test Notification",
        "Your Evolvia notifications are working!",
        "test"
    )

    return jsonify({
        "message" : "Notification created successfully",
        "notification_id" : notification.id

    }),201


@notification_bp.route("/api/notification-settings", methods=["GET"])
@jwt_required()
def get_notification_settings():

    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error" : "User not found"
        }),404

    return jsonify({
        "notifications_enabled" : user.notifications_enabled,
        "friend_request_notifications" : user.friend_request_notifications,
        "badge_notifications" : user.badge_notifications,
        "level_up_notifictions" : user.level_up_notifications
    }),200


@notification_bp.route("/api/notification-settings", methods=["GET"])
@jwt_required()
def get_notification_settings():

    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    return jsonify({
        "notifications_enabled": user.notifications_enabled,
        "friend_request_notifications": user.friend_request_notifications,
        "badge_notifications": user.badge_notifications,
        "level_up_notifications": user.level_up_notifications
    }), 200


@notification_bp.route("/api/notification-settings", methods=["PUT"])
@jwt_required()
def update_notification_settings():

    user_id = int(get_jwt_identity())

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error": "User not found"
        }), 404

    data = request.get_json(silent=True)

    if not isinstance(data, dict):
        return jsonify({
            "error": "Request body must be JSON object"
        }), 400

    if "notifications_enabled" in data:
        user.notifications_enabled = bool(
            data["notifications_enabled"]
        )

    if "friend_request_notifications" in data:
        user.friend_request_notifications = bool(
            data["friend_request_notifications"]
        )

    if "badge_notifications" in data:
        user.badge_notifications = bool(
            data["badge_notifications"]
        )

    if "level_up_notifications" in data:
        user.level_up_notifications = bool(
            data["level_up_notifications"]
        )

    db.session.commit()

    return jsonify({
        "success": True,
        "message": "Notification settings updated",
        "settings": {
            "notifications_enabled": user.notifications_enabled,
            "friend_request_notifications": user.friend_request_notifications,
            "badge_notifications": user.badge_notifications,
            "level_up_notifications": user.level_up_notifications
        }
    }), 200