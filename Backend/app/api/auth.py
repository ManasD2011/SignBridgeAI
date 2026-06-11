from fastapi import APIRouter
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.schemas.auth import LoginRequest
from app.core.security import verify_password
from app.core.security import create_access_token
from app.api.dependencies import get_current_user
from fastapi import Depends

from app.core.database import SessionLocal
from app.models.user import User
from app.schemas.auth import RegisterRequest
from app.core.security import hash_password

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register_user(
    payload: RegisterRequest
):

    db: Session = SessionLocal()

    try:

        existing_user = (
            db.query(User)
            .filter(
                User.email == payload.email
            )
            .first()
        )

        if existing_user:
            raise HTTPException(
                status_code=400,
                detail="Email already registered"
            )

        user = User(
            full_name=payload.full_name,
            email=payload.email,
            password_hash=hash_password(
                payload.password
            )
        )

        db.add(user)

        db.commit()

        db.refresh(user)

        return {
            "message": "User registered successfully"
        }

    finally:
        db.close()

@router.post("/login")
def login_user(
    payload: LoginRequest
):

    db: Session = SessionLocal()

    try:

        user = (
            db.query(User)
            .filter(
                User.email == payload.email
            )
            .first()
        )

        if not user:

            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )

        if not verify_password(
            payload.password,
            user.password_hash
        ):

            raise HTTPException(
                status_code=401,
                detail="Invalid credentials"
            )

        access_token = create_access_token(
            {
                "sub": str(user.id),
                "email": user.email
            }
        )

        return {
            "access_token": access_token,
            "token_type": "bearer"
        }

    finally:
        db.close()

@router.get("/me")
def get_me(
    current_user=Depends(
        get_current_user
    )
):

    return {
        "id": str(current_user.id),
        "full_name": current_user.full_name,
        "email": current_user.email
    }
    