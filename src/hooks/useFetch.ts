import { useEffect, useRef, useState } from "react";

interface UseFetchReturn<T> {
  data: T | null;
  isLoading: boolean;
  isError: boolean;
  errorMessage: string | null;
}

export const useFetch = <T>(
  url: string,
  options?: RequestInit
): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const cache = useRef<{ [key: string]: T | null }>({});
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchData = async (link: string) => {
      if (cache.current[link]) {
        const cachedData = cache.current[link];
        setData(cachedData);
      } else {
        try {
          abortController.current = new AbortController();
          const { signal } = abortController.current;

          setLoading(true);
          setIsError(false);
          setErrorMessage(null);

          const response = await fetch(link, { ...options, signal });
          if (!response.ok) {
            throw new Error(
              `Ошибка: ${response.status} ${response.statusText}`
            );
          }
          const result = await response.json();
          cache.current[url] = result;
          if (isMounted) {
            setData(result);
          }
        } catch (error) {
          if (isMounted) {
            setIsError(true);
            setErrorMessage((error as Error).message);
          }
        } finally {
          if (isMounted) {
            setLoading(false);
          }
        }
      }
    };

    fetchData(url);

    return () => {
      isMounted = false;
      abortController.current?.abort();
    };
  }, [url, options]);

  return {
    data,
    isLoading,
    isError,
    errorMessage,
  };
};
