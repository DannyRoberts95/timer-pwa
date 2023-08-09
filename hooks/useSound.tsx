import { useState, useEffect } from "react";

interface UseSoundReturn {
  playing: boolean;
  toggle: () => void;
  pause: () => void;
  play: () => void;
}

const useSound = (url: string, volume: number = 1): UseSoundReturn => {
  const [audio, setAudio] = useState<any>(null);
  const [playing, setPlaying] = useState(false);

  const toggle = () => setPlaying(!playing);

  const play = () => {
    if (audio) {
      audio.currentTime = 0;
      audio.play();
      setPlaying(true);
    }
  };

  const pause = () => {
    if (audio) {
      audio.pause();
      setPlaying(false);
    }
  };

  useEffect(() => {
    let audioInstance: any;
    if (typeof Audio !== "undefined") {
      audioInstance = new Audio(url);
      audioInstance.volume = volume;
      setAudio(audioInstance);
    }

    return () => {
      if (audioInstance) {
        audioInstance.pause();
        setPlaying(false);
        setAudio(null);
      }
    };
  }, [url]);

  useEffect(() => {
    playing ? play() : pause();
  }, [playing]);

  return { playing, toggle, pause, play };
};

export default useSound;
