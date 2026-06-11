from app.models.translation_session import TranslationSession

class TranslationSessionCreate(BaseModel):
    mode: str
    source_language: str
    target_language: str
