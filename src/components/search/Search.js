import IMAGES from "../../images";
import { useEffect } from "react";

export default function Search({ city, setCity, onSearchClick }) {
  //  useEffect(() => {
  //   const handleKeyPress = async function (e) {
  //     if (e.key === "Enter") {
  //       await fetchData();
  //       setCity("");
  //      }
  //   };

  //    document.addEventListener("keydown", handleKeyPress);

  //   return () => {
  //     document.removeEventListener("keydown", handleKeyPress);
  //   };
  //  }, [fetchData, setCity]);

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        onSearchClick();
      }
    };
    const inputField = document.querySelector(".input-field");
    if (inputField) {
      inputField.addEventListener("keydown", handleKeyPress);
    }

    return () => {
      // Komponent temizlenirken dinleyiciyi kaldırın
      if (inputField) {
        inputField.removeEventListener("keydown", handleKeyPress);
      }
    };
  }, [onSearchClick]);

  return (
    <div className="search-box">
      <input
        type="text"
        className="input-field"
        placeholder="Enter City..."
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <img
        className="search-logo"
        src={IMAGES.search}
        alt="search-logo"
        onClick={onSearchClick}
      />
    </div>
  );
}
