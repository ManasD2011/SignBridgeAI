from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import SessionLocal

from app.models.message import Message
from app.models.conversation import Conversation

from app.schemas.message import MessageCreate

from app.api.dependencies import get_current_user


router = APIRouter(
    prefix="/messages",
    tags=["Messages"]
)


@router.post("/")
def create_message(
    payload: MessageCreate,
    current_user=Depends(get_current_user)
):

    db: Session = SessionLocal()

    try:

        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.id == payload.conversation_id,
                Conversation.user_id == current_user.id
            )
            .first()
        )

        if not conversation:
            raise HTTPException(
                status_code=404,
                detail="Conversation not found"
            )

        message = Message(
            conversation_id=payload.conversation_id,
            sender_type=payload.sender_type,
            input_type=payload.input_type,
            original_text=payload.original_text,
            translated_text=payload.translated_text,
            confidence_score=payload.confidence_score
        )

        db.add(message)

        db.commit()

        db.refresh(message)

        return message

    finally:
        db.close()


@router.get("/{conversation_id}")
def get_messages(
    conversation_id: str,
    current_user=Depends(get_current_user)
):

    db: Session = SessionLocal()

    try:

        conversation = (
            db.query(Conversation)
            .filter(
                Conversation.id == conversation_id,
                Conversation.user_id == current_user.id
            )
            .first()
        )

        if not conversation:
            raise HTTPException(
                status_code=404,
                detail="Conversation not found"
            )

        messages = (
            db.query(Message)
            .filter(
                Message.conversation_id == conversation_id
            )
            .order_by(
                Message.created_at.asc()
            )
            .all()
        )

        return messages

    finally:
        db.close()


@router.delete("/{message_id}")
def delete_message(
    message_id: str,
    current_user=Depends(get_current_user)
):

    db: Session = SessionLocal()

    try:

        message = (
            db.query(Message)
            .join(Conversation)
            .filter(
                Message.id == message_id,
                Conversation.user_id == current_user.id
            )
            .first()
        )

        if not message:
            raise HTTPException(
                status_code=404,
                detail="Message not found"
            )

        db.delete(message)

        db.commit()

        return {
            "message": "Message deleted successfully"
        }

    finally:
        db.close()