import { useEffect, useState } from "react";

export const useLocalStorage = (key: string, initialValue: string) => {
  const [value, setValue] = useState(() => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  });

  useEffect(() => {
    const item = JSON.stringify(value);
    window.localStorage.setItem(key, item);
  }, [value, key]);

  return [value, setValue];
};
