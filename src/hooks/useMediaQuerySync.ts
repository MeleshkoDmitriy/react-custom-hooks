import { useSyncExternalStore } from "react";

export const useMediaQuerySync = (query: string) => {
  const getSnapshot = () => window.matchMedia(query).matches;

  const subscribe = (callback) => {
    const mediaQueryList = window.matchMedia(query);
    mediaQueryList.addEventListener("change", callback);

    return () => mediaQueryList.removeEventListener("change", callback);
  };

  return useSyncExternalStore(subscribe, getSnapshot);
};
