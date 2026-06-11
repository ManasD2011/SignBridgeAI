from fastapi import APIRouter
from sqlalchemy import text

from app.core.database import SessionLocal

router = APIRouter()


@router.get("/db-test")
def db_test():

    db = SessionLocal()

    try:

        result = db.execute(
            text("SELECT 1")
        )

        return {
            "status": "success",
            "database": "connected"
        }

    except Exception as e:

        return {
            "status": "error",
            "message": str(e)
        }

    finally:
        db.close()
        