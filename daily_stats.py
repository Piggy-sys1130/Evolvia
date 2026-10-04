from extensions import db
from datetime import date


class DailyCodingStats(db.Model):
    id = db.Column(db.Integer, primary_key=True)

    user_id = db.Column(
        db.Integer,
        db.ForeignKey("user.id"),
        nullable=False
    )

    date = db.Column(
        db.Date,
        default=date.today,
        nullable=False
    )

    total_code_runs = db.Column(
        db.Integer,
        default=0
    )

    successful_runs = db.Column(
        db.Integer,
        default=0
    )

    errors = db.Column(
        db.Integer,
        default=0
    )

    coding_seconds = db.Column(
        db.Integer,
        default=0
    )

    xp_earned = db.Column(
        db.Integer,
        default=0
    )

    favourite_language = db.Column(
        db.String(30),
        nullable=True
    )