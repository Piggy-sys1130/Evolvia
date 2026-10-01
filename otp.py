from extensions import db
from datetime import datetime

class OTPCode(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    phone= db.Column(db.String(20),nullable=False)
    otp = db.Column(db.String(6),nullable=False)

    expires_at = db.Column(db.DateTime,nullable=False)
    created_at = db.Column(db.DateTime,default=datetime.utcnow)

    verified = db.Column(db.Boolean,default=False)