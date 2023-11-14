import { useState } from "react";
import IMAGES from "./images";
import toDateFunction from "./toDateFunction";
import config from "./config.json";


const apiKey = config.apiKey;

export default function App() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [containerRes, setConatinerRes] = useState([]);

  async function fetchData() {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
      );

      if (containerRes.find((el) => el.url === res.url)) return;
      if (!containerRes.find((el) => el.url === res.url))
        setConatinerRes((prevContainer) => {
          const newContainerRes = [res, ...prevContainer];
          if (newContainerRes.length > 10) {
            newContainerRes.pop();
          }

          return newContainerRes;
        });

      if (res.status === 404) throw new Error("City not found");
      if (!res.ok) throw new Error("Something went wrong...");

      const data = await res.json();
    

      setError("");
      setWeatherData(data);
    } catch (error) {
      console.error(error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  function handleSearchClick() {
    fetchData();
    setCity("");
  }
  return (
    <div className="App">
      <div className="container">
        <Search
          city={city}
          setCity={setCity}
          onSearchClick={handleSearchClick}
        />
        {isLoading && <Loader />}

        {!isLoading && !error && (
          <>
            <Main weatherData={weatherData} />
            <Footer weatherData={weatherData} />
          </>
        )}
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
}

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function Search({ city, setCity, onSearchClick }) {
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

function Main({ weatherData }) {
  const temp = Math.round(weatherData?.main?.temp || null);

  const condition =
    Object.keys(weatherData).length !== 0 ? weatherData.weather[0]?.main : null;
  function checkWeather(condition) {
    if (condition === "Rain") return IMAGES.rain;
    if (condition === "Snow") return IMAGES.snow;
    if (condition === "Clouds") return IMAGES.cloud;
    if (condition === "Clear") return IMAGES.clear;
    if (condition === "Mist") return IMAGES.haze;
    if (condition === "Haze") return IMAGES.haze;
    else {
      return "";
    }
  }

  return (
    <div className="weather-details">
      <h1>{weatherData.name}</h1>
      <h3>{toDateFunction()}</h3>
      <div className="new-flex">
        {Object.keys(weatherData).length !== 0 && (
          <div className="main-img">
            <img src={checkWeather(condition)} alt="conditional-weather" />
          </div>
        )}
        <div className="new-flex-2">
          {Object.keys(weatherData).length !== 0 && (
            <>
              <p>{temp} °C</p>
              <p style={{ color: "#94d82d" }}>{weatherData.weather[0].main}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

function Footer({ weatherData }) {
  return (
    <div className="footer">
      {Object.keys(weatherData).length !== 0 && (
        <>
          <div className="humidity">
            <img src={IMAGES.humidity} alt="humidity-logo" />
            <p>Humidity: {weatherData.main?.humidity} %</p>
          </div>

          <div className="wind">
            <img src={IMAGES.wind} alt="wind-logo" />
            <p>Wind: {weatherData.wind?.speed} km/s</p>
          </div>
        </>
      )}
    </div>
  );
}
