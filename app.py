import os
from datetime import timedelta

from flask import Flask
from flask_cors import CORS
from extensions import db, bcrypt, jwt

from routes.auth_routes import auth_bp
from google_auth import google_bp
from routes.stats_routes import stats_bp
from routes.code_routes import code_bp
from routes.profile_routes import profile_bp
from routes.friend_routes import friend_bp
from routes.leaderboard_routes import leaderboard_bp


app = Flask(__name__)

CORS(app, resources={
    r"/api/*": {"origins": "*"}
})

app.config["SECRET_KEY"] = os.environ.get(
    "SECRET_KEY",
    "dev-secret-key"
)

app.config["JWT_SECRET_KEY"] = os.environ.get(
    "JWT_SECRET_KEY",
    "dev-only-secret-change-me-before-deploying-1234567890"
)

app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=2)


db.init_app(app)
bcrypt.init_app(app)
jwt.init_app(app)


app.register_blueprint(auth_bp)
app.register_blueprint(google_bp)
app.register_blueprint(stats_bp)
app.register_blueprint(code_bp)
app.register_blueprint(profile_bp)
app.register_blueprint(friend_bp)
app.register_blueprint(leaderboard_bp)


with app.app_context():
    db.create_all()


if __name__ == "__main__":
    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )