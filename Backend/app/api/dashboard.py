from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.models.conversation import Conversation
from app.models.message import Message

from app.api.dependencies import get_current_user


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)
@router.get("/summary")
def dashboard_summary(
    current_user=Depends(get_current_user)
):

    db: Session = SessionLocal()

    try:

        conversations_count = (
            db.query(Conversation)
            .filter(
                Conversation.user_id == current_user.id
            )
            .count()
        )

        messages_count = (
            db.query(Message)
            .join(Conversation)
            .filter(
                Conversation.user_id == current_user.id
            )
            .count()
        )

        return {
            "total_conversations": conversations_count,
            "total_messages": messages_count
        }

    finally:
        db.close()


@router.get("/recent-conversations")
def recent_conversations(
    current_user=Depends(get_current_user)
):

    db: Session = SessionLocal()

    try:

        conversations = (
            db.query(Conversation)
            .filter(
                Conversation.user_id == current_user.id
            )
            .order_by(
                Conversation.created_at.desc()
            )
            .limit(5)
            .all()
        )

        return conversations

    finally:
        db.close()
        