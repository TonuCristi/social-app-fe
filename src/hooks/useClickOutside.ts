import { RefObject, useEffect } from "react";

export function useClickOutside(
  containerRef: RefObject<HTMLDivElement>,
  cb: () => void
) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
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
