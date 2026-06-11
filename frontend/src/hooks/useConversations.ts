import { useEffect } from "react";
import { useState } from "react";

import {
  getConversations,
  createConversation,
} from "@/services/conversation";

export function useConversations() {

  const [
    conversations,
    setConversations,
  ] = useState([]);

  const load =
    async () => {

      const data =
        await getConversations();

      setConversations(
        data
      );
    };

  useEffect(() => {
    load();
  }, []);

  const create =
    async () => {

      await createConversation();

      await load();
    };

  return {
    conversations,
    create,
    reload: load,
  };
}
