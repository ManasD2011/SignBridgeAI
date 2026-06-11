import axios from "axios";

const API =
  "http://127.0.0.1:8000";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  password: string;
}

export async function login(
  payload: LoginPayload
) {

  const response =
    await axios.post(
      `${API}/auth/login`,
      payload
    );

  localStorage.setItem(
    "token",
    response.data.access_token
  );

  return response.data;
}

export async function register(
  payload: RegisterPayload
) {

  const response =
    await axios.post(
      `${API}/auth/register`,
      payload
    );

  return response.data;
}

export async function getMe() {

  const token =
    localStorage.getItem(
      "token"
    );

  const response =
    await axios.get(
      `${API}/auth/me`,
      {
        headers: {
          Authorization:
            `Bearer ${token}`
        }
      }
    );

  return response.data;
}

export function logout() {

  localStorage.removeItem(
    "token"
  );
}

export function isAuthenticated() {

  return !!localStorage.getItem(
    "token"
  );
}
