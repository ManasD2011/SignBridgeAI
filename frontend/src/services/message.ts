import axios from "axios";

const api = axios.create({
  baseURL:
    "http://127.0.0.1:8000",
});

api.interceptors.request.use(
  (config) => {

    const token =
      localStorage.getItem(
        "token"
      );

    if (token) {

      config.headers.Authorization =
        `Bearer ${token}`;
    }

    return config;
  }
);

export interface Message {

  id: string;

  original_text: string;

  translated_text:
    string | null;

  confidence_score:
    number | null;
}

export async function createMessage(
  conversationId: string,
  text: string
) {

  const response =
    await api.post(
      "/messages",
      {
        conversation_id:
          conversationId,

        sender_type:
          "user",

        input_type:
          "sign",

        original_text:
          text,

        translated_text:
          null,

        confidence_score:
          100,
      }
    );

  return response.data;
}

export async function getMessages(
  conversationId: string
) {

  const response =
    await api.get(
      `/messages/${conversationId}`
    );

  return response.data;
}

