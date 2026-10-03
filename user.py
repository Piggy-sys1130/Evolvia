from extensions import db
from datetime import datetime
class User(db.Model):
    id = db.Column(
        db.Integer,
        primary_key = True
    )

    username = db.Column(
        db.String(80),
        unique = True,
        nullable = False
    )

    email = db.Column(
        db.String(120),
        unique = True,
        nullable = False
    )

    password_hash = db.Column(
        db.String(200),
        nullable = False
    )

    notification_enabled = db.Column(
        db.Boolean,
        default = True,
        nullable = False
    )

    friend_request_notification = db.Column(
        db.Boolean,
        default = True,
        nullable = False
    )

    badge_notifications = db.Column(
        db.Boolean,
        default = True,
        nullable = False
    )

    last_seen = db.Column(
        db.DateTime,
        nullable = True
    )

    is_online = db.Column(
        db.Boolean,
        default = False,
        nullable = False
    )