from pydantic import BaseModel


class ConversationCreate(BaseModel):
    title: str
    source_language: str
    target_language: str


class ConversationResponse(BaseModel):
    id: str
    title: str
    source_language: str
    target_language: str
    