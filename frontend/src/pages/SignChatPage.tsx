import { useEffect } from "react";

import Navbar from "@/components/layout/Navbar";
import ConversationSidebar from "@/components/conversation/ConversationSidebar";
import ChatWindow from "@/components/chat/ChatWindow";
import CameraPanel from "@/components/camera/CameraPanel";

import { useSignSocket } from "@/hooks/useSignSocket";

import {
  createMessage,
} from "@/services/message";

import {
  useConversationStore,
} from "@/store/conversationStore";

import {
  useMessageStore,
} from "@/store/messageStore";

export default function SignChatPage() {

  const {
    data,
    socket,
  } = useSignSocket();

  const activeConversationId =
    useConversationStore(
      (state) =>
        state.activeConversationId
    );

  const {
    lastSavedSentence,
    setLastSavedSentence,
  } = useMessageStore();

  useEffect(() => {

    if (
      !activeConversationId
    ) {
      return;
    }

    if (
      !data.sentence
    ) {
      return;
    }

    if (
      data.sentence ===
      lastSavedSentence
    ) {
      return;
    }

    createMessage(
      activeConversationId,
      data.sentence
    );

    setLastSavedSentence(
      data.sentence
    );

  }, [
    data.sentence,
    activeConversationId,
    lastSavedSentence,
    setLastSavedSentence,
  ]);

  return (

    <div className="h-screen bg-zinc-950 text-white flex flex-col">

      <Navbar />

      <div className="flex flex-1 overflow-hidden">

        <ConversationSidebar />

        <ChatWindow />

        <CameraPanel
          socket={socket}
          prediction={
            data.prediction
          }
          stablePrediction={
            data.stable_prediction
          }
          currentWord={
            data.current_word
          }
          confidence={
            data.confidence
          }
          sentence={
            data.sentence
          }
        />

      </div>

    </div>
  );
} 