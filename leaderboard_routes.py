from flask import Blueprint, jsonify
from models.stats import UserStats
from models.user import User

#leaderboard ke liye code 

leaderboard_bp = Blueprint("leaderboard", __name__)

@leaderboard_bp.route("/api/leaderboard",methods = ["GET"])
def get_leaderboard():
    leaderboard = (
        UserStats.query
        .join(User,User.id == UserStats.user_id)
        .order_by(
            UserStats.total_score.desc(),
            User.id.asc()
        )
        .limit(100)
        .all()
    )

    result = []

    for rank, stats in enumerate(leaderboard,start=1):
        user = User.query.get(stats.user_id)

        if not user :
            continue

        result.append({
            "rank" : rank,
            "username" : user.username,
            "score" : stats.total_score,
            "xp" : stats.total_xp,
            "level" : stats.level
        })

        return jsonify({
            "leaderboard" : result
        }),200

