import uuid

from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import Float
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from pydantic import BaseModel

from sqlalchemy.sql import func

from sqlalchemy.dialects.postgresql import UUID

from app.core.database import Base


class TranslationSession(Base):
    __tablename__ = "translation_sessions"

    id = Column(
        UUID(as_uuid=True),
        primary_key=True,
        default=uuid.uuid4
    )

    user_id = Column(
        UUID(as_uuid=True),
        ForeignKey("users.id"),
        nullable=False
    )

    mode = Column(
        String(50),
        nullable=False
    )

    source_language = Column(
        String(50),
        nullable=False
    )

    target_language = Column(
        String(50),
        nullable=False
    )

    total_messages = Column(
        String,
        default="0"
    )

    average_confidence = Column(
        Float,
        nullable=True
    )

    started_at = Column(
        DateTime(timezone=True),
        server_default=func.now()
    )

    ended_at = Column(
        DateTime(timezone=True),
        nullable=True
    )


