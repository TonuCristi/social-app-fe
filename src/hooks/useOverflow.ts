import { useEffect } from "react";

export function useOverflow() {
  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflowY = "auto";
    };
  }, []);
}
