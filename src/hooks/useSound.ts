/**
 * Custom hook to play a sound
 * @param url
 */
const useSound = (url: string) => {
  const audio = new Audio(url);


  const play = () => {
    audio.volume = 0.2;
    return audio.play();
  }

  return {
    play };
}

export default useSound;
