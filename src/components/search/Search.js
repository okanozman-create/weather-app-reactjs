import IMAGES from "../../images";
import { useEffect } from "react";

export default function Search({ city, setCity, onSearchClick }) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        onSearchClick();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
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
