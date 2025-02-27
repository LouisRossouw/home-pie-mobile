import { useEffect, useRef, useState } from "react";
import { Dispatch, SetStateAction } from "react";

export interface UsePoll {
  pollCount: number;
  isPolling: boolean;
  startPolling: () => void;
  stopPolling: () => void;
  pausePolling: (duration: number) => () => void;
  setPollCount: Dispatch<SetStateAction<number>>;
}

const pollResetAt = 99;

export function usePoll(): UsePoll {
  const intervalIdRef = useRef<number | null>(null);

  const [pollCount, setPollCount] = useState(0);
  const [isPolling, setIsPolling] = useState(true);

  useEffect(() => {
    if (isPolling) {
      startPolling();
    } else {
      stopPolling();
    }
    return () => stopPolling();
  }, [isPolling]);

  const polling = () => {
    setPollCount((prevCount) => {
      if (prevCount < pollResetAt) return prevCount + 1;
      return 0;
    });
  };

  const startPolling = () => {
    stopPolling();
    intervalIdRef.current = window.setInterval(polling, 1000);
  };

  const stopPolling = () => {
    if (intervalIdRef.current !== null) {
      clearInterval(intervalIdRef.current);
      intervalIdRef.current = null;
    }
  };

  const pausePolling = (duration: number) => {
    setIsPolling(false);
    const timer = setTimeout(() => {
      setIsPolling(true);
    }, duration);
    return () => clearTimeout(timer);
  };

  return {
    pollCount,
    isPolling,
    startPolling,
    stopPolling,
    pausePolling,
    setPollCount,
  };
}
