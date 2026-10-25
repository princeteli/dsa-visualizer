import { useState, useEffect, useRef } from "react";

export default function useStepper() {
  const [steps, setSteps] = useState([]);
  const [i, setI] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(1); // 0.5x, 1x, 2x, 4x

  const timerRef = useRef(null);

  const load = (newSteps) => {
    setIsPlaying(false);
    setSteps(newSteps || []);
    setI(0);
  };

  const next = () => setI((v) => Math.min(v + 1, Math.max(0, steps.length - 1)));
  const prev = () => setI((v) => Math.max(v - 1, 0));
  const reset = () => {
    setIsPlaying(false);
    setI(0);
  };

  const togglePlay = () => {
    if (steps.length === 0) return;
    if (i >= steps.length - 1) {
      setI(0);
      setIsPlaying(true);
    } else {
      setIsPlaying((prev) => !prev);
    }
  };

  const goTo = (index) => {
    if (steps.length === 0) return;
    setI(Math.max(0, Math.min(index, steps.length - 1)));
  };

  useEffect(() => {
    if (!isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    const intervalMs = Math.max(80, Math.round(550 / speed));
    timerRef.current = setInterval(() => {
      setI((curr) => {
        if (curr >= steps.length - 1) {
          setIsPlaying(false);
          return curr;
        }
        return curr + 1;
      });
    }, intervalMs);

    return () => clearInterval(timerRef.current);
  }, [isPlaying, speed, steps.length]);

  return {
    step: steps[i],
    i,
    total: steps.length,
    load,
    next,
    prev,
    reset,
    isPlaying,
    togglePlay,
    speed,
    setSpeed,
    goTo,
  };
}