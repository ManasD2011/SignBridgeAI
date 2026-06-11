from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import SessionLocal
from app.models.conversation import Conversation

from app.schemas.conversation import ConversationCreate

from app.api.dependencies import get_current_user


router = APIRouter(
    prefix="/conversations",
    tags=["Conversations"]
)


@router.post("/")
def create_conversation(
    payload: ConversationCreate,
    current_user=Depends(get_current_user)
):

    db: Session = SessionLocal()

    try:

        conversation = Conversation(
            user_id=current_user.id,
            title=payload.title,
            source_language=payload.source_language,
            target_language=payload.target_language
        )

        db.add(conversation)

        db.commit()

        db.refresh(conversation)

        return conversation

    finally:
        db.close()


@router.get("/")
def get_conversations(
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
            .all()
        )

        return conversations

    finally:
        db.close()


@router.get("/{conversation_id}")
def get_conversation(
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

        return conversation

    finally:
        db.close()


@router.delete("/{conversation_id}")
def delete_conversation(
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

        db.delete(conversation)

        db.commit()

        return {
            "message": "Conversation deleted"
        }

    finally:
        db.close()
        