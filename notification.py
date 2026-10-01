from extensions import db
from datetime import datetime

class Notification(db.Model):
    id = db.Column(db.Integer,primary_key=True)
    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )

    title = db.Column(
        db.Ineger,
        db.ForeignKey("user.id"),
        nullable=False
    )

    message = db.Column(
        db.String(300),
        nullable = False
    )

    notification_type = db.Column(
        db.String(50),
        nullable = False
    )

    is_read = db.Column(
        db.Boolean,
        default= False
    )

    created_at = db.Column(
        db.DateTime,
        default = datetime.utcnow
    )