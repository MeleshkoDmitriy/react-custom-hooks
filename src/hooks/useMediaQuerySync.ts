import { useSyncExternalStore } from "react";

export const useMediaQuerySync = (query: string) => {
  const getSnapshot = () => window.matchMedia(query).matches;

  const subscribe = (callback) => {
    const mediaQueryList = window.matchMedia(query);
    const controller = new AbortController();

    mediaQueryList.addEventListener("change", callback, { signal: controller.signal });

    // return () => mediaQueryList.removeEventListener("change", callback);
    return () => controller.abort();
  };

  return useSyncExternalStore(subscribe, getSnapshot);
};
