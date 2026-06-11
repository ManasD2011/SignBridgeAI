import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
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

export interface Conversation {
  id: string;
  title: string;
  source_language: string;
  target_language: string;
}

export async function getConversations() {

  const response =
    await api.get(
      "/conversations/"
    );

  return response.data;
}

export async function createConversation(
  title: string,
  sourceLanguage: string,
  targetLanguage: string
) {

  const response =
    await api.post(
      "/conversations/",
      {
        title,
        source_language:
          sourceLanguage,
        target_language:
          targetLanguage,
      }
    );

  return response.data;
}

export async function deleteConversation(
  id: string
) {

  await api.delete(
    `/conversations/${id}`
  );
}
