from extensions import db
from datetime import datetime

class PasswordResetToken(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(db.Integer,db.ForeignKey('user.id'),nullable=False)

    token = db.Column(db.String(200),unique=True,nullable=False)

    expires_at = db.Column(db.Datetime,nullable=False)
    used = db.Column(db.DateTime,nullable=False)

    created_at = db.Column(db.DateTime,default=datetime.utcnow)