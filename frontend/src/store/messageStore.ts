import { create } from "zustand";

interface MessageStore {

  lastSavedSentence:
    string;

  setLastSavedSentence:
    (
      sentence: string
    ) => void;
}

export const useMessageStore =
  create<MessageStore>(
    (set) => ({

      lastSavedSentence:
        "",

      setLastSavedSentence:
        (
          sentence
        ) =>
          set({
            lastSavedSentence:
              sentence,
          }),

    })
  );
  