import { useState } from "react";
import { motion } from "framer-motion";

import { register } from "@/services/auth";

interface RegisterFormProps {
  onSwitch: () => void;
}

export default function RegisterForm({
  onSwitch,
}: RegisterFormProps) {

  const [fullName, setFullName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [success, setSuccess] =
    useState("");

  const handleRegister =
    async (
      e: React.FormEvent
    ) => {

      e.preventDefault();

      try {

        setLoading(true);

        await register({
          full_name:
            fullName,
          email,
          password,
        });

        setSuccess(
          "Account created successfully"
        );

        setTimeout(() => {
          onSwitch();
        }, 1200);

      } catch {

        setSuccess(
          "Registration failed"
        );

      } finally {

        setLoading(false);

      }
    };

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: -50,
      }}
      animate={{
        opacity: 1,
        x: 0,
      }}
      exit={{
        opacity: 0,
        x: 50,
      }}
      transition={{
        duration: 0.35,
      }}
      className="w-full max-w-md"
    >

      <div className="rounded-2xl border border-zinc-800 bg-zinc-950/50 backdrop-blur-xl p-8">

        <h2 className="text-3xl font-bold text-white">
          Create account
        </h2>

        <p className="mt-2 text-zinc-500">
          Join SignBridge
        </p>

        <form
          onSubmit={
            handleRegister
          }
          className="mt-8 space-y-4"
        >

          <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) =>
              setFullName(
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
            "
          />

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
            "
          />

          {success && (
            <p className="text-sm text-green-500">
              {success}
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
              hover:bg-zinc-200
            "
          >
            {loading
              ? "Creating..."
              : "Create Account"}
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
          Already have an account?
        </button>

      </div>

    </motion.div>
  );
}
