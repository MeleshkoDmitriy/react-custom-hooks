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

    if (target) {
      target.addEventListener("pointerenter", handleEnter);
      target.addEventListener("pointerleave", handleLeave);
    }

    return () => {
      if (target) {
        target.removeEventListener("pointerenter", handleEnter);
        target.removeEventListener("pointerleave", handleLeave);
      }
    };
  }, [ref, onEnter, onLeave]);

  return isHovered;
};
