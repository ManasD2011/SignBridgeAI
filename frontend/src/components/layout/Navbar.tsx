import { MessageSquareMore } from "lucide-react";

export default function Navbar() {
  return (
    <header className="h-16 border-b border-zinc-800 bg-zinc-950 px-6 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-xl bg-orange-500 flex items-center justify-center">
          <MessageSquareMore className="h-5 w-5 text-black" />
        </div>

        <div>
          <h1 className="text-lg font-bold text-white">
            SignBridge
          </h1>

          <p className="text-xs text-zinc-400">
            Communicate without barriers
          </p>
        </div>
      </div>

      <div className="text-sm text-zinc-400">
        Live Session
      </div>
    </header>
  );
}