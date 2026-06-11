import os
import joblib
import numpy as np


MODEL_PATH = os.path.join(
    os.path.dirname(__file__),
    "models",
    "asl_classifier.pkl"
)


class ASLPredictor:

    def __init__(self):

        print("Loading ASL Model...")

        self.model = joblib.load(
            MODEL_PATH
        )

        print("ASL Model Loaded")

    def predict(
        self,
        landmarks
    ):

        if not landmarks:

            return None

        try:

            row = []

            for point in landmarks[0]:

                row.extend([
                    point["x"],
                    point["y"],
                    point["z"]
                ])

            features = np.array(
                row
            ).reshape(1, -1)

            prediction = self.model.predict(
                features
            )[0]

            probabilities = self.model.predict_proba(
                features
            )[0]

            confidence = float(
                np.max(probabilities)
            )

            return {
                "prediction": prediction,
                "confidence": round(
                    confidence,
                    4
                )
            }

        except Exception as e:

            print(
                "Prediction Error:",
                e
            )

            return None


predictor = ASLPredictor()

