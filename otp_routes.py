from flask import Blueprint,jsonify,request
from extensions import db
from models.otp import OTPCode
from datetime import datetime,timedelta
import random
from flask_jwt_extended import create_access_token

otp_bp = Blueprint("otp",__name__)

@otp_bp.route("/api/send-otp",methods=["POST"])
def send_otp():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error" : "Request body is required"
        }),400

    phone = data.get("phone")

    if not phone:
        return jsonify({
            "error" : "Phone number is required"
        }),400

    last_otp = OTPCode.query.filter_by(
        phone=phone
    ).order_by(OTPCode.created_at.desc()).first()

    if last_otp:
        time_passed = datetime.utcnow() - last_otp.created_at

        if time_passed < timedelta(minutes=2):
            remaining = 120 - int(time_passed.total_seconds())

            return jsonify({
                "error" : "Please wait before requesting another OTP",
                "remaining_seconds" : remaining
            }),429
        

    otp = str(random.randint(100000,999999))

    otp_code = OTPCode(
        phone=phone,
        otp=otp,
        expires_at = datetime.utcnow() + timedelta(minutes=2)
    )

    db.session.add(otp_code)
    db.session.commit()

    return jsonify({
        "message" : "OTP genereated successfully",
        "otp" : otp
    }),200


@otp_bp.route("/api/verify-otp/",methods=["POST"])
def verify_otp():

    data = request.get_json(silent=True)

    if not data:
        return jsonify({
            "error": "Request body is required"
        }),400

    phone = data.get("phone")
    otp = data.get("otp")

    if not phone or not otp:
        return jsonify({
            "error" : "Phone number and OTP are required"
        }),400

    otp_code = OTPCode.query.filter_by(
        phone=phone,
        otp=otp,
        verified = False
    ).order_by(OTPCode.created_at.desc()).first()

    if not otp_code:
        return jsonify({
            "error": "Invalid OTP"
        }),400

    if otp_code.expires_at < datetime.utcnow():
        return jsonify({
            "error" : "OTP has expired"
        }),400

    otp_code.verified = True

    db.session.commit()

    access_token = create_access_token(identity=str(otp_code.phone))



    return jsonify({
        "message" : "OTP verified successfully"
    }),200