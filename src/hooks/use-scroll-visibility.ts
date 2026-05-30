import { useEffect, useRef, useState } from "react";

/** Show UI chrome when scrolling up or near top; hide when scrolling down. */
export function useScrollVisibility(threshold = 64) {
  const [visible, setVisible] = useState(true);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (y <= threshold) {
        setVisible(true);
      } else {
        setVisible(y < lastY.current - 4);
      }
      lastY.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return visible;
}
