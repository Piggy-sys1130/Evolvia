from flask import Blueprint, jsonify , request
from sqlalchemy.exc import IntegrityError
from extensions import db, bcrypt
from flask_jwt_extended import create_access_token
from models.user import User
from models.stats import UserStats
from utils import get_json_body
from flask_jwt_extended import jwt_required , get_jwt_identity
from datetime import datetime



auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/api/signup', methods=['POST'])
def signup():
    data = get_json_body()

    if data is None:
        return jsonify({"error": "Request body must be a JSON object"}), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')

    if not username or not email or not password:
        return jsonify({"error": "All fields are required"}), 400

    if not all(isinstance(v, str) for v in (username, email, password)):
        return jsonify({"error": "Username, email and password must be text"}), 400

    if User.query.filter_by(username=username).first():
        return jsonify({"error": "Username already taken"}), 409

    if User.query.filter_by(email=email).first():
        return jsonify({"error": "Email already registered"}), 409

    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    new_user = User(username=username, email=email, password_hash=hashed_pw)

    try:
        db.session.add(new_user)
        db.session.flush()

        new_stats = UserStats(user_id=new_user.id)
        db.session.add(new_stats)
        db.session.commit()

    except IntegrityError:
        # Do log ek saath signup kare to check pass ho jata hai, par DB unique rule rok deta hai
        db.session.rollback()
        return jsonify({"error": "Username or email already exists"}), 409

    return jsonify({"message": "User created successfully"}), 201


@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = get_json_body()

    if data is None:
        return jsonify({"error": "Request body must be a JSON object"}), 400

    username = data.get('username')
    password = data.get('password')

    if not isinstance(username, str) or not isinstance(password, str) or not username or not password:
        return jsonify({"error": "Username and password are required"}), 400

    user = User.query.filter_by(username=username).first()

    if not user or not bcrypt.check_password_hash(user.password_hash, password):
        return jsonify({"error": "Invalid username or password"}), 401

    access_token = create_access_token(identity=str(user.id))

    return jsonify({
        "token": access_token,
        "user": {"id": user.id, "username": user.username}
    }), 200


@auth_bp.route("/api/logout",methods=["POST"])
@jwt_required()
def logout():
    return jsonify({
        "success" : True,
        "message" : "Logged out successfully"
    }),200


@auth_bp.route("/api/change-username",methods=["PUT"])
@jwt_required()
def change_username():

    user_id = int(get_jwt_identity())
    data = request.get_json(silent=True)

    if not isinstance(data,dict):
        return jsonify({
            "error" : "Request body must be JSON object"
        }),400

    new_username = data.get("username")

    if not isinstance(new_username,str) or not new_username.strip():
        return jsonify({
            "error" : "Username is required"
        }),400

    new_username = new_username.strip()

    if len(new_username) < 3:
        return jsonify({
            "error" : "Username must be at least 3 characters"
        }),400

    existing_user = User.query.filter_by(username=new_username).first()

    if existing_user and existing_user.id != user_id:
        return jsonify({
            "error" : "Username alredy taken"
        }),409

    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error" : "User not found"
        }),400

    user.username = new_username

    db.session.commit()

    return jsonify({
        "success" : True,
        "message" : "Username changed successfully",
        "username" : user.username
    }),200


@auth_bp.route("/api/delete-account",methods = ["DELETE"])
@jwt_required()
def delte_account():

    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error" : "User not found"
        }),404

    UserStats.query.filter_by(user_id=user_id).delete()

    db.session.delete(user)
    db.session.commit()

    return jsonify({
        "success" : True,
        "message" : "Account deleted successfully" 
    }),200

@auth_bp.route("/api/status",methods = ["GET"])
@jwt_required()
def get_status():

    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user : 
        return jsonify({
            "error" : "User not found "
        }),400

    return jsonify({
        "is_online" : user.is_online,
        "last_seen" : user.last_seen .isoformat() if user.last_seen else None
    }),200


@auth_bp.route("/api/status/online",methods = ["POST"])
@jwt_required()
def set_online():
    user_id = int(get_jwt_identity())
    user = User.query.get(user_id)

    if not user:
        return jsonify({
            "error" : "User not found"
        }),404

    user.is_online = True
    user.last_seen = datetime.utcnow()

    db.session.commit()

    return jsonify({
        "success" : True,
        "is_online" : False,
        "last_seen" : user.last_seen.isoformat()
    }),200
    