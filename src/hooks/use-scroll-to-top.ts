import { useEffect } from "react";

/** Force page to start at top on load / refresh (no restored scroll). */
export function useScrollToTop() {
  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
  }, []);
}
