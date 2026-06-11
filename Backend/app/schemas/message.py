from pydantic import BaseModel


class MessageCreate(BaseModel):
    conversation_id: str

    sender_type: str

    input_type: str

    original_text: str

    translated_text: str | None = None

    confidence_score: float | None = None


class MessageResponse(BaseModel):
    id: str

    original_text: str

    translated_text: str | None

    confidence_score: float | None

    