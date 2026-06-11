import { useState } from "react";

import AuthHero from "@/components/auth/AuthHero";
import RegisterForm from "@/components/auth/RegisterForm";
import LoginForm from "@/components/auth/LoginForm";

export default function AuthPage() {
  const [mode, setMode] = useState<
    "register" | "login"
  >("register");

  return (
    <div
      className="
        min-h-screen
        bg-black
        text-white
        flex
        overflow-y-auto
      "
    >
      <AuthHero />

      <div
        className="
          flex-1
          flex
          items-center
          justify-center
          p-8
          lg:p-16
          relative
          z-20
        "
      >
        {mode === "register" ? (
          <RegisterForm
            onSwitch={() =>
              setMode("login")
            }
          />
        ) : (
          <LoginForm
            onSwitch={() =>
              setMode("register")
            }
          />
        )}
      </div>
    </div>
  );
}
