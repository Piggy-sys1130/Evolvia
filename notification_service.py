from extensions import db
from models.notification import Notification

def create_notification(
        user_id,
        title,
        message,
        notification_type
):
    notification = Notification(
        user_id=user_id,
        title=title,
        message=message,
        notification_type=notification_type
    )

    db.session.add(notification)
    db.session.commit()

    return notification