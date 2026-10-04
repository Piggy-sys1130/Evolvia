from flask import Blueprint , request , jsonify , current_app
from flask_jwt_extended import jwt_required , get_jwt_identity
import requests 
from datetime import date 
from extensions import db
from models.stats import UserStats
from models.daily_stats import DailyCodingStats
from services.gamification_service import (
    process_code_run,
    process_error_solved
)
from utils import get_json_body

code_bp = Blueprint("code",__name__)

JUDGE0_URL = "https://ce.judge0.com"

LANGUAGE_IDS = {
    "c" : 50,
    "cpp" : 54,
    "java" : 62,
    "python" : 71,
    "html" : None
}

MAX_CODE_LENGTH = 20000

def get_daily_stats(user_id):

    today = date.today()
    daily_stats = DailyCodingStats.query.filter_by(
        user_id=user_id,
        date=today
    ).first()

    if not daily_stats:
        daily_stats = DailyCodingStats(
            user_id = user_id,
            date=today
        )

        db.session.add(daily_stats)
        db.session.flush()

    return daily_stats

def get_daily_stats(user_id):

    today = date.today()
    daily_stats = DailyCodingStats.query.filter_by(
        user_id = user_id,
        date=today
    ).first()

    if not daily_stats:
        daily_stats = DailyCodingStats(
            user_id = user_id,
            date=today
        )    

        db.session.add(daily_stats)
        db.session.flush()

    return daily_stats

def update_daily_run_stats(
        daily_stats,
        language,
        accepted,
        xp_earned
):

    daily_stats.total_code_runs += 1

    if accepted:
        daily_stats.successful_runs += 1

    else:
        daily_stats.errors += 1

    daily_stats.xp_earned += xp_earned

    if not daily_stats.favourite_language:

        daily_stats.favourite_language = language


def get_success_rate(daily_stats):

    if daily_stats.total_code_runs == 0:
        return 0 

    return round(
        (
            daily_stats.successful_runs
                    /
            daily_stats.total_code_runs        
        )*100,
        1
    )

#======================
# run code
#======================

