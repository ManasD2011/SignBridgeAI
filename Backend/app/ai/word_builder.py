import time


class WordBuilder:

    def __init__(self):

        self.current_word = ""

        self.last_letter = None

        self.last_seen_time = time.time()

        self.word_timeout = 1.5

    def update(
        self,
        prediction
    ):

        current_time = time.time()

        # No hand detected

        if prediction is None:

            if (
                self.current_word
                and current_time
                - self.last_seen_time
                > self.word_timeout
            ):

                completed_word = (
                    self.current_word
                )

                self.current_word = ""

                self.last_letter = None

                return {
                    "completed_word":
                        completed_word,
                    "current_word":
                        ""
                }

            return {
                "completed_word":
                    None,
                "current_word":
                    self.current_word
            }

        self.last_seen_time = current_time

        # Ignore duplicate letters

        if prediction == self.last_letter:

            return {
                "completed_word":
                    None,
                "current_word":
                    self.current_word
            }

        self.current_word += prediction

        self.last_letter = prediction

        return {
            "completed_word":
                None,
            "current_word":
                self.current_word
        }

    def clear(self):

        self.current_word = ""

        self.last_letter = None

        self.last_seen_time = (
            time.time()
        )


word_builder = WordBuilder()

