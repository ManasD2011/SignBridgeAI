import { useEffect, useRef } from "react";

export function useCamera() {
  const videoRef =
    useRef<HTMLVideoElement>(null);

  const canvasRef =
    useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
      })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject =
            stream;
        }
      })
      .catch(console.error);
  }, []);

  return {
    videoRef,
    canvasRef,
  };
}