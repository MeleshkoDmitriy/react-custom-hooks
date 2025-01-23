import { useSyncExternalStore } from "react";

export const useOnline = (): { isOnline: boolean } => {
  const getSnapshot = () => window.navigator.onLine;

  const subscribe = (callback) => {
    window.addEventListener("online", callback);
    window.addEventListener("offline", callback);

    return () => {
      window.removeEventListener("online", callback);
      window.removeEventListener("offline", callback);
    };
  };

  const isOnline = useSyncExternalStore(subscribe, getSnapshot);

  // const checkInternetConnection = async () => {
  //   try {
  //     const response = await fetch("https://www.google.com", {
  //       method: "HEAD",
  //       mode: "no-cors",
  //     });
  //     return response.ok;
  //   } catch (error) {
  //     console.error("Ошибка при проверке интернет-соединения:", error);
  //     return false;
  //   }
  // };

  // useEffect(() => {
  //   const checkConnection = async () => {
  //     const onlineStatus = await checkInternetConnection();
  //     if (!onlineStatus) {
  //       console.log("Нет доступа к интернету");
  //     }
  //   };

  //   const intervalId = setInterval(checkConnection, 5000);

  //   return () => clearInterval(intervalId);
  // }, []);

  return { isOnline };
};
