import os
import secrets
import requests

from flask import Blueprint, redirect, request, jsonify, session
from google_auth_oauthlib.flow import Flow
from flask_jwt_extended import create_access_token

from extensions import db, bcrypt
from models.user import User
from models.stats import UserStats


google_bp = Blueprint("google", __name__)


GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

# PythonAnywhere URL
GOOGLE_REDIRECT_URL = "https://Bhavishyajoshi07.pythonanywhere.com/api/auth/google/callback"


GOOGLE_CLIENT_CONFIG = {
    "web": {
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "auth_uri": "https://accounts.google.com/o/oauth2/auth",
        "token_uri": "https://oauth2.googleapis.com/token",
        "redirect_uris": [GOOGLE_REDIRECT_URL]
    }
}


GOOGLE_SCOPES = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile"
]


# Google login
@google_bp.route("/api/auth/google")
def google_login():

    if not GOOGLE_CLIENT_ID or not GOOGLE_CLIENT_SECRET:
        return jsonify({
            "error": "Google OAuth is not configured"
        }), 500

    flow = Flow.from_client_config(
        GOOGLE_CLIENT_CONFIG,
        scopes=GOOGLE_SCOPES
    )

    flow.redirect_uri = GOOGLE_REDIRECT_URL

    authorization_url, state = flow.authorization_url(
        access_type="offline",
        include_granted_scopes="true",
        prompt="select_account"
    )

    session["google_oauth_state"] = state

    return redirect(authorization_url)


# Google callback
@google_bp.route("/api/auth/google/callback")
def google_callback():

    try:

        state = session.get("google_oauth_state")

        if not state:
            return jsonify({
                "error": "Google login session expired"
            }), 400

        flow = Flow.from_client_config(
            GOOGLE_CLIENT_CONFIG,
            scopes=GOOGLE_SCOPES,
            state=state
        )

        flow.redirect_uri = GOOGLE_REDIRECT_URL

        flow.fetch_token(
            authorization_response=request.url
        )

        credentials = flow.credentials

        response = requests.get(
            "https://www.googleapis.com/oauth2/v2/userinfo",
            headers={
                "Authorization": f"Bearer {credentials.token}"
            },
            timeout=10
        )

        if response.status_code != 200:
            return jsonify({
                "error": "Could not get Google user information"
            }), 502

        google_user = response.json()

        email = google_user.get("email")
        name = google_user.get("name")

        if not email:
            return jsonify({
                "error": "Google account email not found"
            }), 400

        user = User.query.filter_by(
            email=email
        ).first()

        # Create new user
        if not user:

            base_username = (
                name.replace(" ", "").lower()
                if name
                else email.split("@")[0]
            )

            username = base_username
            counter = 1

            while User.query.filter_by(
                username=username
            ).first():

                username = f"{base_username}{counter}"
                counter += 1

            # Google users don't use normal password login
            random_password = secrets.token_urlsafe(32)

            password_hash = bcrypt.generate_password_hash(
                random_password
            ).decode("utf-8")

            user = User(
                username=username,
                email=email,
                password_hash=password_hash
            )

            db.session.add(user)
            db.session.flush()

            stats = UserStats(
                user_id=user.id
            )

            db.session.add(stats)

            db.session.commit()

        # Create Evolvia JWT
        token = create_access_token(
            identity=str(user.id)
        )

        session.pop("google_oauth_state", None)

        return jsonify({
            "message": "Google login successful",
            "token": token,
            "user": {
                "id": user.id,
                "username": user.username,
                "email": user.email
            }
        }), 200

    except Exception:

        db.session.rollback()

        return jsonify({
            "error": "Google login failed"
        }), 500

