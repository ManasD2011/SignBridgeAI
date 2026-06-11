import os
import cv2
import mediapipe as mp
import pandas as pd

from tqdm import tqdm

# ============================================================
# CONFIG
# ============================================================

DATASET_PATH = "dataset/asl_alphabet_train/asl_alphabet_train"

OUTPUT_DIR = "output"
CHECKPOINT_DIR = "checkpoints"

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(CHECKPOINT_DIR, exist_ok=True)

CSV_OUTPUT = os.path.join(
    OUTPUT_DIR,
    "asl_features.csv"
)

CHECKPOINT_FILE = os.path.join(
    CHECKPOINT_DIR,
    "checkpoint.csv"
)

# ============================================================
# MEDIAPIPE
# ============================================================

mp_hands = mp.solutions.hands

hands = mp_hands.Hands(
    static_image_mode=True,
    max_num_hands=1,
    min_detection_confidence=0.2
)

# ============================================================
# STORAGE
# ============================================================

features = []
labels = []

processed = 0
failed = 0

class_stats = {}

# ============================================================
# HAND DETECTION FUNCTION
# ============================================================

def extract_landmarks(image):

    image = cv2.resize(
        image,
        (224, 224)
    )

    rgb = cv2.cvtColor(
        image,
        cv2.COLOR_BGR2RGB
    )

    result = hands.process(rgb)

    if result.multi_hand_landmarks:

        hand = result.multi_hand_landmarks[0]

        row = []

        for lm in hand.landmark:

            row.extend([
                lm.x,
                lm.y,
                lm.z
            ])

        return row

    # --------------------------------------------------------
    # RETRY WITH FLIPPED IMAGE
    # --------------------------------------------------------

    flipped = cv2.flip(
        image,
        1
    )

    rgb = cv2.cvtColor(
        flipped,
        cv2.COLOR_BGR2RGB
    )

    result = hands.process(rgb)

    if result.multi_hand_landmarks:

        hand = result.multi_hand_landmarks[0]

        row = []

        for lm in hand.landmark:

            row.extend([
                lm.x,
                lm.y,
                lm.z
            ])

        return row

    return None


# ============================================================
# PROCESS DATASET
# ============================================================

classes = sorted(
    os.listdir(DATASET_PATH)
)

print("=" * 60)
print("SIGNBRIDGE LANDMARK EXTRACTION")
print("=" * 60)

for label in classes:

    # ----------------------------------------------
    # REMOVE NOTHING CLASS
    # ----------------------------------------------

    if label.lower() == "nothing":

        print(
            "\nSkipping class: nothing"
        )

        continue

    class_path = os.path.join(
        DATASET_PATH,
        label
    )

    if not os.path.isdir(class_path):
        continue

    images = os.listdir(
        class_path
    )

    print(
        f"\nProcessing Class: {label}"
    )

    class_processed = 0
    class_failed = 0

    for image_name in tqdm(
        images,
        desc=label
    ):

        image_path = os.path.join(
            class_path,
            image_name
        )

        image = cv2.imread(
            image_path
        )

        if image is None:

            failed += 1
            class_failed += 1

            continue

        try:

            row = extract_landmarks(
                image
            )

            if row is None:

                failed += 1
                class_failed += 1

                continue

            features.append(row)

            labels.append(label)

            processed += 1
            class_processed += 1

            # --------------------------------------
            # CHECKPOINT
            # --------------------------------------

            if processed % 5000 == 0:

                temp = pd.DataFrame(
                    features
                )

                temp["label"] = labels

                temp.to_csv(
                    CHECKPOINT_FILE,
                    index=False
                )

                print(
                    f"\nCheckpoint Saved: {processed}"
                )

        except Exception:

            failed += 1
            class_failed += 1

    class_stats[label] = {
        "processed": class_processed,
        "failed": class_failed
    }

# ============================================================
# CREATE DATAFRAME
# ============================================================

columns = []

for i in range(21):

    columns.extend([
        f"x_{i}",
        f"y_{i}",
        f"z_{i}"
    ])

df = pd.DataFrame(
    features,
    columns=columns
)

df["label"] = labels

df.to_csv(
    CSV_OUTPUT,
    index=False
)

# ============================================================
# RESULTS
# ============================================================

print("\n")
print("=" * 60)
print("EXTRACTION COMPLETE")
print("=" * 60)

print(
    f"Processed : {processed}"
)

print(
    f"Failed    : {failed}"
)

print(
    f"Saved To  : {CSV_OUTPUT}"
)

print(
    f"Shape     : {df.shape}"
)

print("\n")
print("=" * 60)
print("CLASS STATS")
print("=" * 60)

for label, stats in class_stats.items():

    print(
        f"{label:10s}"
        f" Processed={stats['processed']}"
        f" Failed={stats['failed']}"
    )