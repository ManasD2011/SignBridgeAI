from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.auth import router as auth_router
from app.api.conversations import router as conversations_router
from app.api.messages import router as messages_router
from app.api.database import router as db_router
from app.api.dashboard import router as dashboard_router
from app.api.ws import router as ws_router
from app.api.sign_ws import router as sign_ws_router
from app.api.sign import router as sign_router


app = FastAPI(
    title="SignBridge AI API",
    version="1.0.0"
)


# CORS CONFIGURATION
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ROUTES
app.include_router(db_router)
app.include_router(auth_router)
app.include_router(conversations_router)
app.include_router(messages_router)
app.include_router(dashboard_router)
app.include_router(ws_router)
app.include_router(sign_ws_router)
app.include_router(sign_router)


@app.get("/")
def root():
    return {
        "message": "SignBridge AI Backend Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }

    