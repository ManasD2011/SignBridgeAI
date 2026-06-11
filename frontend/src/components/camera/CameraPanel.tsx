import { Wifi } from "lucide-react";

import LiveCamera from "@/components/camera/LiveCamera";

interface CameraPanelProps {

  socket: {
    sendFrame: (
      frame: string
    ) => void;
  };

  prediction: string | null;

  stablePrediction: string | null;

  currentWord: string;

  confidence: number;

  sentence: string;
}

export default function CameraPanel({

  socket,
  prediction,
  stablePrediction,
  currentWord,
  confidence,
  sentence,

}: CameraPanelProps) {

  return (

    <aside className="w-80 border-l border-zinc-800 bg-zinc-950 p-4">

      <div className="h-full rounded-3xl border border-zinc-800 bg-zinc-900 overflow-hidden flex flex-col">

        <div className="overflow-hidden">

          <LiveCamera
            socket={socket}
          />

        </div>

        <div className="p-5 space-y-5 flex-1">

          <div className="flex items-center gap-2 text-green-500">

            <Wifi className="h-4 w-4" />

            <span className="text-sm">
              Connected
            </span>

          </div>

          <div>

            <p className="text-xs uppercase text-zinc-500 mb-1">
              Prediction
            </p>

            <h2 className="text-4xl font-bold text-orange-500">
              {prediction ?? "-"}
            </h2>

          </div>

          <div>

            <p className="text-xs uppercase text-zinc-500 mb-1">
              Stable Prediction
            </p>

            <h3 className="text-xl font-medium text-white">
              {stablePrediction ?? "-"}
            </h3>

          </div>

          <div>

            <p className="text-xs uppercase text-zinc-500 mb-1">
              Current Word
            </p>

            <h3 className="text-xl font-medium text-cyan-400">
              {currentWord || "-"}
            </h3>

          </div>

          <div>

            <p className="text-xs uppercase text-zinc-500 mb-1">
              Confidence
            </p>

            <h3 className="text-xl font-medium text-white">
              {confidence.toFixed(2)}%
            </h3>

          </div>

          <div>

            <p className="text-xs uppercase text-zinc-500 mb-1">
              Sentence
            </p>

            <div className="rounded-xl border border-zinc-800 bg-zinc-950 p-4 min-h-[100px]">

              <p className="text-white break-words">
                {sentence || "..."}
              </p>

            </div>

          </div>

        </div>

      </div>

    </aside>
  );
}