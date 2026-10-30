import { useState, useEffect, RefObject } from 'react';

export function useElementScrollProgress(ref: RefObject<HTMLElement>) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start when top reaches 80% of window height
      const start = windowHeight * 0.8;
      // End when bottom reaches 20% of window height
      const end = windowHeight * 0.2;

      const totalDistance = rect.height + (start - end);
      const currentProgress = (start - rect.top) / totalDistance;

      setProgress(Math.min(Math.max(currentProgress, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return progress;
}

