import { useEffect, useState } from "react";

/**
 * Custom hook to play a sound
 * @param url
 * @param volume
 */
const useSound = (url: string, volume = 0.2) => {
  const [audio, setAudio] = useState<HTMLAudioElement>();

  const play = () => {
    if (!audio) {
      return;
    }

    audio.volume = volume;
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
