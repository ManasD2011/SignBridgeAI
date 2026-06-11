import { useEffect } from "react";
import { useState } from "react";

import {
  getMessages,
  type Message,
} from "@/services/message";

import {
  useConversationStore,
} from "@/store/conversationStore";

export default function ChatWindow() {

  const {
    activeConversationId,
  } =
    useConversationStore();

  const [
    messages,
    setMessages,
  ] = useState<
    Message[]
  >([]);

  async function loadMessages() {

    if (
      !activeConversationId
    ) {
      return;
    }

    try {

      const data =
        await getMessages(
          activeConversationId
        );

      setMessages(
        data
      );

    } catch (error) {

      console.error(
        error
      );
    }
  }

  useEffect(() => {

    loadMessages();

  }, [
    activeConversationId
  ]);

  return (
    <section
      className="
        flex-1
        bg-zinc-950
        p-6
        overflow-auto
      "
    >

      <div
        className="
          max-w-4xl
          mx-auto
          space-y-4
        "
      >

        {messages.length === 0 && (

          <div
            className="
              h-[70vh]
              flex
              items-center
              justify-center
              text-zinc-500
            "
          >
            No messages yet
          </div>

        )}

        {messages.map(
          (message) => (

            <div
              key={message.id}
              className="space-y-2"
            >

              <div
                className="
                  flex
                  justify-start
                "
              >

                <div
                  className="
                    rounded-2xl
                    bg-zinc-900
                    border
                    border-zinc-800
                    px-5
                    py-3
                    max-w-lg
                  "
                >
                  {
                    message.original_text
                  }
                </div>

              </div>

              {message.translated_text && (

                <div
                  className="
                    flex
                    justify-end
                  "
                >

                  <div
                    className="
                      rounded-2xl
                      bg-white
                      text-black
                      px-5
                      py-3
                      font-medium
                      max-w-lg
                    "
                  >
                    {
                      message.translated_text
                    }
                  </div>

                </div>

              )}

            </div>

          )
        )}

      </div>

    </section>
  );
}

