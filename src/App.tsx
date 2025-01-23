import { useId, useRef, useState } from "react";
import "./App.css";
import { useFetch } from "./hooks/useFetch";
import { useDebounced } from "./hooks/useDebounced";
import { useMediaQuerySync } from "./hooks/useMediaQuerySync";
import { useLocalStorageSync } from "./hooks/useLocalStarageSync";
import { useHover } from "./hooks/useHover";
import { useLocalStorage } from "./hooks/useLocalStorage";

function App() {
  const searchId = useId();
  const usernameId = useId();
  const storageId = useId();

  const { data: UseFetchData } = useFetch(
    "https://jsonplaceholder.typicode.com/comments"
  );
  // console.log("UseFetchData", UseFetchData);

  const [inputValue, setInputValue] = useState<string>("");
  const handleInputTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    // console.log("inputValue", inputValue);
  };
  const debouncedValue = useDebounced(inputValue, 150);

  const isScreenDesktop = useMediaQuerySync("screen and (min-width: 1024px)");
  // console.log("isScreenDesktop", isScreenDesktop);

  const [storageValue, setStorageValue] = useLocalStorageSync("username", "");
  const handleStorageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStorageValue(e.target.value);
    // console.log("storageValue", storageValue);
  };

  const [localValue, setLocalValue] = useLocalStorage("test", "");

  const hoverBlockRef = useRef<HTMLDivElement>(null);
  const isHoveredBlock = useHover(hoverBlockRef);
  // console.log("isHoveredBlock", isHoveredBlock);


  // const handleModalClose = () => {
  //   setIsModal(false);
  // };
  // useClickOutside(modalRef, handleModalClose);

  return (
    <>
      <div
        ref={hoverBlockRef}
        style={{
          backgroundColor: `${isHoveredBlock ? "red" : "green"}`,
          cursor: "pointer",
        }}
      >
        <h1>Hover Hook</h1>
      </div>
      <div>
        <p>- Screen desktop?</p>
        <p>- {isScreenDesktop ? "Yes" : "No"}</p>
      </div>
      <div>
        <label htmlFor={storageId}>LocalStorage</label>
        <input
          type="text"
          placeholder="LocalStorage"
          id={storageId}
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor={usernameId}>Username Sync</label>
        <input
          type="text"
          name="username"
          placeholder="LocalStorageSync"
          id={usernameId}
          value={storageValue}
          onChange={handleStorageChange}
        />
      </div>
      <div>
        <label htmlFor={searchId}>Search</label>
        <input
          id={searchId}
          type="search"
          value={inputValue}
          onChange={(e) => handleInputTextChange(e)}
        />
      </div>
      <ul>
        {UseFetchData?.filter((item) =>
          item.email.toLowerCase().includes(debouncedValue.toLowerCase())
        ).map((item) => (
          <li key={item.id}>{item.email}</li>
        ))}
      </ul>
    </>
  );
}

export default App;
