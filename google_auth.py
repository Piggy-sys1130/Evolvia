from flask import Blueprint,redirect,request,jsonify
from google_auth_oauthlib.flow import Flow
from flask_jwt_extended import create_access_token
from extensions import db
from user import User
from stats import UserStats
import os
import requests

google_bp = Blueprint("google", __name__)

GOOGLE_CLIENT_ID = os.getenv("GOOGLE_CLIENT_ID")
GOOGLE_CLIENT_SECRET = os.getenv("GOOGLE_CLIENT_SECRET")

GOOGLE_REDIRECT_URL = "https://evolvia-1lco.onrender.com/api/auth/google/callback"

GOOGLE_CLIENT_CONFIG = {
    "web" : {
        "client_id" : GOOGLE_CLIENT_ID,
        "client_secret" : GOOGLE_CLIENT_SECRET,
        "auth_uri" : "https://accounts.google.com/o/oauth2/auth",
        "token_uri" : "https://oauth2.googleapis.com/token",
        "redirect_uris" : [GOOGLE_REDIRECT_URL],
    }
}

GOOGLE_SCOPES = [
    "openid",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
]

@google_bp.route("/api/auth/google")
def google_login():
   flow = Flow.from_client_config(
      GOOGLE_CLIENT_CONFIG,
      scopes=GOOGLE_SCOPES,
   )
   flow.redirect_uri = GOOGLE_REDIRECT_URL

   authorization_url,state = flow.authorization_url(
      access_type = "offline",
      include_granted_scopes="true",
   )

   return redirect(authorization_url)

@google_bp.route("/api/auth/google/callback")
def google_callback():
   flow = Flow.from_client_config(
      GOOGLE_CLIENT_CONFIG,
      scopes = GOOGLE_SCOPES,
   )
   flow.redirect_uri = GOOGLE_REDIRECT_URL
   flow.fetch_token(authorization_response=request.url)

   credentials = flow.credentitals

   response = requests.get(
      "https://www.googleapis.com/oauth2/v2/userinfo",
      headers={"Authorization" : f"Bearer {credentials.token}"},
   )

   google_user = response.json()
   email = google_user.get("email")
   name = google_user.get("name")

   if not email:
      return jsonify({"error" : "Google account email not found"}),400

   user = User.query.filter_by(email=email).first()

   if not user : 
         base_username = (name.replace(" ", "").lower() if name else email.split("@")[0])
         username = base_username
         counter = 1
   
         # username unique rakhne ke liye
         while User.query.filter_by(username=username).first():
               username = f"{base_username}{counter}"
               counter += 1
   
         user = User(
               username=username,
               email=email,
               password_hash="google_oauth",
         )

         db.session.add(user)
         db.session.flush()

         stats = UserStats(user_id=user.id)
         db.session.add(stats)

         db.session.commit()

   token = create_access_token(identity=str(user.id))
   
   return jsonify({
         "message": "Google login successful",
         "token": token,
         "user": {
               "id": user.id,
               "username": user.username,
               "email": user.email,
         },
      }), 200
      

