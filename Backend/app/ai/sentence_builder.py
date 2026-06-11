import time


class SentenceBuilder:

    def __init__(self):

        self.sentence = ""

        self.last_added = None

        self.hand_removed = True

        self.last_detection_time = 0

    def update(
        self,
        prediction
    ):

        if prediction is None:

            self.hand_removed = True

            return self.sentence

        if (
            prediction == self.last_added
            and not self.hand_removed
        ):
            return self.sentence

        self.hand_removed = False

        self.last_added = prediction

        self.last_detection_time = time.time()

        if prediction == "space":

            self.sentence += " "

        elif prediction == "del":

            self.sentence = self.sentence[:-1]

        else:

            self.sentence += prediction

        return self.sentence

    def clear(self):

        self.sentence = ""

        self.last_added = None

        self.hand_removed = True

        return self.sentence


sentence_builder = SentenceBuilder()
