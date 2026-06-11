import { useEffect } from "react";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  getConversations,
  createConversation,
  type Conversation,
} from "@/services/conversation";

import {
  useConversationStore,
} from "@/store/conversationStore";

export default function ConversationSidebar() {

  const [
    conversations,
    setConversations,
  ] = useState<
    Conversation[]
  >([]);

  const {
    activeConversationId,
    setActiveConversation,
  } =
    useConversationStore();

  async function loadConversations() {

    try {

      const data =
        await getConversations();

      setConversations(
        data
      );

      if (
        data.length > 0 &&
        !activeConversationId
      ) {

        setActiveConversation(
          data[0].id
        );
      }

    } catch (
      error
    ) {

      console.error(
        error
      );
    }
  }

  useEffect(() => {

    loadConversations();

  }, []);

  async function handleNewSession() {

    try {

      const conversation =
        await createConversation(
          `Session ${
            conversations.length + 1
          }`,
          "English",
          "ISL"
        );

      await loadConversations();

      setActiveConversation(
        conversation.id
      );

    } catch (
      error
    ) {

      console.error(
        error
      );
    }
  }

  return (
    <aside className="
      w-72
      border-r
      border-zinc-800
      bg-zinc-950
      p-4
    ">

      <Button
        onClick={
          handleNewSession
        }
        className="
          w-full
          bg-white
          text-black
          hover:bg-zinc-200
        "
      >
        New Session
      </Button>

      <div className="mt-6">

        <p className="
          text-xs
          uppercase
          tracking-wider
          text-zinc-500
          mb-3
        ">
          Sessions
        </p>

        <div className="space-y-2">

          {conversations.map(
            (
              conversation
            ) => (

              <button
                key={
                  conversation.id
                }
                onClick={() =>
                  setActiveConversation(
                    conversation.id
                  )
                }
                className={`
                  w-full
                  rounded-xl
                  border
                  p-3
                  text-left
                  transition

                  ${
                    activeConversationId ===
                    conversation.id

                      ? `
                        border-white
                        bg-zinc-800
                      `

                      : `
                        border-zinc-800
                        bg-zinc-900
                        hover:border-zinc-600
                      `
                  }
                `}
              >

                <p className="
                  text-sm
                  font-medium
                  text-white
                ">
                  {
                    conversation.title
                  }
                </p>

                <p className="
                  mt-1
                  text-xs
                  text-zinc-500
                ">
                  {
                    conversation.source_language
                  }
                  {" → "}
                  {
                    conversation.target_language
                  }
                </p>

              </button>

            )
          )}

        </div>

      </div>

    </aside>
  );
}
