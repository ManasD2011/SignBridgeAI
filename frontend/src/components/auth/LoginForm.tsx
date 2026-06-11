import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { login } from "@/services/auth";

interface LoginFormProps {
  onSwitch: () => void;
}

export default function LoginForm({
  onSwitch,
}: LoginFormProps) {

  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState("");

  const handleLogin = async (
    e: React.FormEvent
  ) => {

    e.preventDefault();

    try {

      setLoading(true);
      setError("");

      await login({
        email,
        password,
      });

      navigate("/");

    } catch {

      setError(
        "Invalid credentials"
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: 50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: -50,
      }}
      transition={{
        duration: 0.35,
      }}
      className="w-full max-w-md"
    >

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl p-8">

        <h2 className="text-3xl font-bold text-white">
          Welcome back
        </h2>

        <p className="mt-2 text-zinc-500">
          Sign in to continue
        </p>

        <form
          onSubmit={handleLogin}
          className="mt-8 space-y-4"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-zinc-800
              bg-black
              px-4
              py-3
              text-white
              outline-none
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(
                e.target.value
              )
            }
            className="
              w-full
              rounded-xl
              border
              border-zinc-800
              bg-black
              px-4
              py-3
              text-white
              outline-none
            "
          />

          {error && (
            <p className="text-sm text-red-500">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-xl
              bg-white
              py-3
              font-semibold
              text-black
              transition
              hover:bg-zinc-200
            "
          >
            {loading
              ? "Signing In..."
              : "Continue"}
          </button>

        </form>

        <button
          onClick={onSwitch}
          className="
            mt-6
            text-sm
            text-zinc-500
            hover:text-white
          "
        >
          Create an account
        </button>

      </div>

    </motion.div>
  );
}
