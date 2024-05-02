import { RefObject, useEffect } from "react";

export function useClickOutside(
  containerRef: RefObject<HTMLElement>,
  cb: () => void
) {
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      e.stopPropagation();
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        cb();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [containerRef, cb]);
}
