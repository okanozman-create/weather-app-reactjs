import IMAGES from "../../images";
import { useEffect } from "react";

export default function Search({ city, setCity, onSearchClick, fetchData }) {
  useEffect(() => {
    const handleKeyPress = async function (e) {
      if (e.key === "Enter") {
        await fetchData();
        setCity("");
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [fetchData, setCity]);

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