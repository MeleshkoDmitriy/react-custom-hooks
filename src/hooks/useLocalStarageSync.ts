import { useSyncExternalStore } from "react";

export const useLocalStorageSync = (key: string, initialValue: string) => {
  const getSnapshot = () => {
    const storeValue = localStorage.getItem(key);
    return storeValue ? JSON.parse(storeValue) : initialValue;
  };

  const subscribe = (callback) => {
    const controller = new AbortController();
    const handleStorageChange = (event) => {
      if (event.key === key) {
        callback();
      }
    };

    window.addEventListener("storage", handleStorageChange, { signal: controller.signal });

    return () => {
      // window.removeEventListener("storage", handleStorageChange);
      controller.abort();
    };
  };

  const value = useSyncExternalStore(subscribe, getSnapshot);

  const setValue = (newValue: string) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }
  return [value, setValue];
};
