import { useEffect, useRef } from "react";
import gsap from "gsap";

export function BackgroundMusic({
  start,
}: {
  start: boolean;
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!start || audioRef.current) return;

    const audio = new Audio("/audio/audio.mp3");
    audio.loop = true;
    audio.volume = 0;
    audioRef.current = audio;

    audio.play().catch(() => {});

    gsap.to(audio, {
      volume: 0.5,
      duration: 6,
      ease: "power2.out",
    });
  }, [start]);

  return null;
}
