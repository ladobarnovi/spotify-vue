export const useTimer = () => {
  function millisecondToTimer(milliseconds: number) {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = ((totalSeconds % 60) + "").padStart(2, "0");

    return minutes + ":" + seconds;
  }

  return {
    millisecondToTimer
  };
};
