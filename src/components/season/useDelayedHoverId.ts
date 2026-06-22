import { useEffect, useRef, useState } from "react";

function useDelayedHoverId<T>(delayMs = 150) {
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [activeId, setActiveId] = useState<T | null>(null);

  useEffect(() => {
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, []);

  const onHoverStart = (id: T) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }

    hoverTimerRef.current = setTimeout(() => {
      setActiveId(id);
    }, delayMs);
  };

  const onHoverEnd = (id: T) => {
    if (hoverTimerRef.current) {
      clearTimeout(hoverTimerRef.current);
    }

    setActiveId((prev) => (prev === id ? null : prev));
  };

  return {
    activeId,
    onHoverStart,
    onHoverEnd,
  };
}

export default useDelayedHoverId;
