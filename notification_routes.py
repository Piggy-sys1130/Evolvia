from flask import Blueprint, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity

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
