import { useSyncExternalStore } from "react";

export const useLocalStorageSync = (key: string, initialValue: string) => {
  const getSnapshot = () => {
    const storeValue = localStorage.getItem(key);
    return storeValue ? JSON.parse(storeValue) : initialValue;
  };

  const subscribe = (callback) => {
    const handleStorageChange = (event) => {
      if (event.key === key) {
        callback();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  };

  const value = useSyncExternalStore(subscribe, getSnapshot);

  const setValue = (newValue: string) => {
    localStorage.setItem(key, JSON.stringify(newValue));
  }
  return [value, setValue];
};
