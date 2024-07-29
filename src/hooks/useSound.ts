import { useEffect, useState } from "react";

/**
 * Custom hook to play a sound
 * @param url
 */
const useSound = (url: string) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();

  const play = () => {
    if (!audio) {
      return;
    }

    audio.volume = 0.2;
    return audio.play();
  }

  useEffect(() => {
    setAudio(new Audio(url))
  }, [url])

  return {
    play
  };
}

export default useSound;
