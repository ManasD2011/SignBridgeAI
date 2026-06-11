from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File

import cv2
import numpy as np

from app.ai.hand_detector import detector

router = APIRouter(
    prefix="/sign",
    tags=["Sign Detection"]
)


@router.post("/detect")
async def detect_hand(
    file: UploadFile = File(...)
):

    contents = await file.read()

    np_arr = np.frombuffer(
        contents,
        np.uint8
    )

    image = cv2.imdecode(
        np_arr,
        cv2.IMREAD_COLOR
    )

    landmarks = detector.detect(
        image
    )

    return {
        "hands_detected": len(landmarks),
        "landmarks": landmarks
    }
    