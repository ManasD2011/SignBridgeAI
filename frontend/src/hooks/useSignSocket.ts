import { SignSocket } from "@/services/websocket";
import type { SignResponse } from "@/services/websocket";
import { useEffect, useState } from "react";

export function useSignSocket() {
  const [data, setData] =
   useState<SignResponse>({
    hands_detected: 0,
    prediction: null,
    stable_prediction: null,
    confidence: 0,
    current_word: "",
    sentence: "",
    });

  const [socket] = useState(
    () => new SignSocket()
  );

  useEffect(() => {
    socket.connect(setData);

    return () => {
      socket.disconnect();
    };
  }, []);

  return {
    data,
    socket,
  };
}
