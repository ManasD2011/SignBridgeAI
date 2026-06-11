import cv2
import mediapipe as mp


class HandDetector:

    def __init__(self):

        self.mp_hands = mp.solutions.hands

        self.hands = self.mp_hands.Hands(
            static_image_mode=False,
            max_num_hands=2,
            min_detection_confidence=0.7,
            min_tracking_confidence=0.7
        )

    def detect(self, image):

        rgb = cv2.cvtColor(
            image,
            cv2.COLOR_BGR2RGB
        )

        result = self.hands.process(rgb)

        landmarks = []

        if result.multi_hand_landmarks:

            for hand in result.multi_hand_landmarks:

                points = []

                for lm in hand.landmark:

                    points.append({
                        "x": lm.x,
                        "y": lm.y,
                        "z": lm.z
                    })

                landmarks.append(points)

        return landmarks


detector = HandDetector()
