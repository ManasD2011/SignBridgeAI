import { useEffect } from "react";

import { useCamera } from "@/hooks/useCamera";

interface LiveCameraProps {
  socket: {
    sendFrame: (
      frame: string
    ) => void;
  };
}

export default function LiveCamera({
  socket,
}: LiveCameraProps) {

  const {
    videoRef,
    canvasRef,
  } = useCamera();

  useEffect(() => {

    console.log(
      "LIVE CAMERA MOUNTED"
    );

    const interval =
      setInterval(() => {

        console.log(
          "INTERVAL RUNNING"
        );

        const video =
          videoRef.current;

        const canvas =
          canvasRef.current;

        console.log(
          "VIDEO:",
          video
        );

        console.log(
          "CANVAS:",
          canvas
        );

        if (
          !video ||
          !canvas
        ) {

          console.log(
            "VIDEO OR CANVAS MISSING"
          );

          return;
        }

        if (
          video.readyState !== 4
        ) {

          console.log(
            "VIDEO NOT READY",
            video.readyState
          );

          return;
        }

        const ctx =
          canvas.getContext(
            "2d"
          );

        if (!ctx) {

          console.log(
            "NO CANVAS CONTEXT"
          );

          return;
        }

        ctx.drawImage(
          video,
          0,
          0,
          canvas.width,
          canvas.height
        );

        const frame =
          canvas.toDataURL(
            "image/jpeg",
            0.7
          );

        console.log(
          "SENDING FRAME"
        );

        socket.sendFrame(
          frame
        );

      }, 500);

    return () => {

      console.log(
        "LIVE CAMERA UNMOUNTED"
      );

      clearInterval(
        interval
      );
    };

  }, [socket]);

  return (
    <>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="
          w-full
          aspect-video
          object-cover
          bg-black
        "
      />

      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        className="hidden"
      />
    </>
  );
}

