import cv2

from app.ai.hand_detector import detector


image = cv2.imread("test.jpg")

landmarks = detector.detect(image)

print(f"Hands Detected: {len(landmarks)}")

if landmarks:
    print(f"Points: {len(landmarks[0])}")