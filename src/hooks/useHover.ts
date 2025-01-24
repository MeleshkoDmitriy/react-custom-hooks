import { useEffect, useState, RefObject } from "react";

export const useHover = (
  ref: RefObject<HTMLElement>,
  onEnter?: (e: MouseEvent) => void,
  onLeave?: (e: MouseEvent) => void
) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  useEffect(() => {
    const handleEnter = (e: MouseEvent) => {
      setIsHovered(true);
      if (onEnter) {
        onEnter(e);
      }
    };

    const handleLeave = (e: MouseEvent) => {
      setIsHovered(false);
      if (onLeave) {
        onLeave(e);
      }
    };

    const target = ref.current;
    const controllerEnter = new AbortController();
    const controllerLeave = new AbortController();

    if (target) {
      target.addEventListener("pointerenter", handleEnter, { signal: controllerEnter.signal });
      target.addEventListener("pointerleave", handleLeave, { signal: controllerLeave.signal });
    }

    return () => {
      // if (target) {
      //   target.removeEventListener("pointerenter", handleEnter);
      //   target.removeEventListener("pointerleave", handleLeave);
      // }
      controllerEnter.abort();
      controllerLeave.abort();
    };
  }, [ref, onEnter, onLeave]);

  return isHovered;
};
