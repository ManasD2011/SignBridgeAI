import { create } from "zustand";

interface ConversationStore {

  activeConversationId:
    string | null;

  setActiveConversation:
    (
      id: string
    ) => void;
}

export const useConversationStore =
  create<ConversationStore>(
    (set) => ({

      activeConversationId:
        null,

      setActiveConversation:
        (id) =>
          set({
            activeConversationId:
              id,
          }),

    })
  );