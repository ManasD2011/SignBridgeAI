from collections import deque
from collections import Counter


class PredictionStabilizer:

    def __init__(
        self,
        window_size=10
    ):

        self.window = deque(
            maxlen=window_size
        )

    def update(
        self,
        prediction
    ):

        self.window.append(
            prediction
        )

        if len(self.window) < 5:
            return None

        counts = Counter(
            self.window
        )

        stable_prediction = counts.most_common(
            1
        )[0][0]

        return stable_prediction


stabilizer = PredictionStabilizer()