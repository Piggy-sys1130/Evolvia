from flask import Blueprint, jsonify,request
from extensions import db  , bcrypt
from models.user import User
from models.password_reset import PasswordResetToken
from datetime import datetime, timedelta
import secrets



password_bp = Blueprint("password", __name__)


@password_bp.route("/api/forgot-password", methods=["POST"])
def forgot_password():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error": "Request body is required"}), 400

    email = data.get("email")

    if not email:
        return jsonify({"error": "Email is required"}), 400

    user = User.query.filter_by(email=email).first()

    if not user:
        return jsonify({
            "message": "If this email exists, a password reset link will be sent."
        }), 200

    token = secrets.token_urlsafe(32)

    reset_token = PasswordResetToken(
        user_id=user.id,
        token=token,
        expires_at=datetime.utcnow() + timedelta(minutes=15)
    )

    db.session.add(reset_token)
    db.session.commit()

    return jsonify({
        "message": "Password reset token created",
        "token": token
    }), 200

@password_bp.routes("/api/reset-password", methods=["POST"])
def reset_password():
    data = request.get_json(silent=True)

    if not data:
        return jsonify({"error" : "Request body is requried"}),400

    token = data.get("new_password")
    new_password = data.get("new_password")

    if not token or not new_password:
        return jsonify({"error" : "Token and new password are requried"}),400
    reset_token = PasswordResetToken.query.filter_by(
        token = token,
        used = False
    ).first()

    if not reset_token:
        return jsonify({
            "error" : "Invalid or expires token"
        }),400

    if reset_token.expires_at < datetime.utcnow():
        return jsonify({
            "error" : "Invalid or expired token"
        }),400

    user = User.query.get(reset_token.user_id)

    if not user:
        return jsonify({
            "error" : "User not found"
        }),404

    user.password_hash(
        new_password
    ).decode("utf-8")

    reset_token.used = True

    db.session.commit()

    return jsonify({
        "message" : "Password reset successfully"
    })

