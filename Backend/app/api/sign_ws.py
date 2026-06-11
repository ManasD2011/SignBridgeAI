import json
import base64
import cv2
import numpy as np

from fastapi import APIRouter
from fastapi import WebSocket
from fastapi import WebSocketDisconnect

from app.ai.hand_detector import detector
from app.ai.predictor import predictor
from app.ai.stabilizer import stabilizer
from app.ai.word_builder import word_builder
from app.ai.sentence_builder import sentence_builder


router = APIRouter(
    tags=["Sign Detection"]
)


@router.websocket("/ws/sign")
async def sign_socket(
    websocket: WebSocket
):

    await websocket.accept()

    print("SIGN SOCKET CONNECTED")

    try:

        while True:

            data = await websocket.receive_text()

            image_bytes = base64.b64decode(
                data.split(",")[1]
            )

            np_arr = np.frombuffer(
                image_bytes,
                np.uint8
            )

            frame = cv2.imdecode(
                np_arr,
                cv2.IMREAD_COLOR
            )

            landmarks = detector.detect(
                frame
            )

            # -------------------------
            # NO HAND DETECTED
            # -------------------------

            if not landmarks:

                word_result = (
                    word_builder.update(
                        None
                    )
                )

                if (
                    word_result[
                        "completed_word"
                    ]
                ):

                    sentence_builder.update(
                        word_result[
                            "completed_word"
                        ]
                    )

                await websocket.send_text(
                    json.dumps(
                        {
                            "hands_detected": 0,
                            "prediction": None,
                            "stable_prediction": None,
                            "confidence": 0,
                            "current_word":
                                word_result[
                                    "current_word"
                                ],
                            "sentence":
                                sentence_builder.sentence
                        }
                    )
                )

                continue

            # -------------------------
            # PREDICT LETTER
            # -------------------------

            result = predictor.predict(
                landmarks
            )

            if not result:

                await websocket.send_text(
                    json.dumps(
                        {
                            "hands_detected": 1,
                            "prediction": None,
                            "stable_prediction": None,
                            "confidence": 0,
                            "current_word":
                                word_builder.current_word,
                            "sentence":
                                sentence_builder.sentence
                        }
                    )
                )

                continue

            stable_prediction = (
                stabilizer.update(
                    result[
                        "prediction"
                    ]
                )
            )

            if stable_prediction:

                word_result = (
                    word_builder.update(
                        stable_prediction
                    )
                )

                if (
                    word_result[
                        "completed_word"
                    ]
                ):

                    sentence_builder.update(
                        word_result[
                            "completed_word"
                        ]
                    )

            else:

                word_result = {
                    "completed_word":
                        None,
                    "current_word":
                        word_builder.current_word
                }

            response = {
                "hands_detected": 1,
                "prediction":
                    result[
                        "prediction"
                    ],
                "stable_prediction":
                    stable_prediction,
                "confidence":
                    result[
                        "confidence"
                    ],
                "current_word":
                    word_result[
                        "current_word"
                    ],
                "sentence":
                    sentence_builder.sentence
            }

            await websocket.send_text(
                json.dumps(
                    response
                )
            )

    except WebSocketDisconnect:

        print(
            "SIGN SOCKET CLOSED"
        )

    except Exception as e:

        print(
            "WEBSOCKET ERROR:",
            e
        )