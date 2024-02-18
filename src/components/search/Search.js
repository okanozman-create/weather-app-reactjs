// import IMAGES from "../../images";
// import { useEffect } from "react";

// export default function Search({ city, setCity, onSearchClick, fetchData }) {
//   useEffect(() => {
//     const handleKeyPress = async function (e) {
//       if (e.key === "Enter") {
//         await fetchData();
//         setCity("");
//       }
//     };

//     document.addEventListener("keydown", handleKeyPress);

//     return () => {
//       document.removeEventListener("keydown", handleKeyPress);
//     };
//   }, [fetchData, setCity]);

//   return (
//     <div className="search-box">
//       <input
//         type="text"
//         className="input-field"
//         placeholder="Enter City..."
//         value={city}
//         onChange={(e) => setCity(e.target.value)}
//       />
//       <img
//         className="search-logo"
//         src={IMAGES.search}
//         alt="search-logo"
//         onClick={onSearchClick}
//       />
//     </div>
//   );
// }

import IMAGES from "../../images";
import { useEffect } from "react";

export default function Search({ city, setCity, onSearchClick }) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") {
        onSearchClick();
        setCity(""); // Consider if you really want to clear the city after search. It might be better user experience to clear it only on a successful search or let the user manually clear it.
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [onSearchClick, setCity]); 

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
        alt="search"
        onClick={onSearchClick} 
      />
    </div>
  );
}
