import { useEffect, useState } from "react";
import IMAGES from "./images";
import toDateFunction from "./toDateFunction";
import config from "./aws-exports";
import { Amplify } from "aws-amplify";

Amplify.configure(config);

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  // async function fetchData() {
  //   try {
  //     setIsLoading(true);

  //     const lambdaEndpoint =
  //       "https://nb5ol5oy4g.execute-api.eu-west-1.amazonaws.com/default";
  //     const res = await fetch(
  //       `${lambdaEndpoint}/myWeatherAppFunction-staging?city=${city}`
  //     );

  //     const data = await res.json();

  //     if (data.cod === "404") {
  //       throw new Error("Please check the city name and try again.");
  //     }

  //     if (!res.ok) {
  //       throw new Error(data.message || "Something went wrong...");
  //     }

  //     setError("");
  //     setWeatherData(data);
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }


 // const url = `${lambdaEndpoint}?city=${encodeURIComponent(city)}`;
    //   const lambdaEndpoint =
    //   "https://nb5ol5oy4g.execute-api.eu-west-1.amazonaws.com/default";
    // const res = await fetch(
    //   `${lambdaEndpoint}/myWeatherAppFunction-staging?city=${city}`
    // );

    // const data = await res.json();

    // const res = await fetch(
    //   `${lambdaEndpoint}/myWeatherAppFunction-staging?city=${city}`
    // );


  // async function fetchData() {
  //   if (!city) {
  //     setError("Please enter a city name.");
  //     setIsLoading(false);
  //     return;
  //   }

  //   setIsLoading(true);
  //   setError("");
   

  //   const lambdaEndpoint =
  //     "https://vzgnt19q7c.execute-api.eu-west-1.amazonaws.com/prod1";
  //   const url = `${lambdaEndpoint}/myWeatherF?city=${city}`;

  //   try {
  //     const res = await fetch(url);
  //     const data = await res.json();

  //     if (!res.ok) {
  //       throw new Error(data.message || "Something went wrong...");
  //     }

  //     if (data.cod === "404") {
  //       throw new Error("Please check the city name and try again.");
  //     }

  //     setWeatherData(data);
  //     setCity(""); // Başarılı API çağrısından sonra şehir durumunu sıfırla
  //   } catch (error) {
  //     setError(error.message);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // }

  async function fetchData() {
    try {
      setIsLoading(true);

      const lambdaEndpoint =
        "https://vzgnt19q7c.execute-api.eu-west-1.amazonaws.com/prod1";

      const url = `${lambdaEndpoint}/myWeatherF?city=${city}`;

      const res = await fetch(url);

      const data = await res.json();

      if (data.cod === "404") {
        throw new Error("Please check the city name and try again.");
      }

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong...");
      }

      setError("");
      setWeatherData(data);
    } catch (error) {
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
          fetchData={fetchData}
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
};

export default App;

function ErrorMessage({ message }) {
  return <p className="error">{message}</p>;
}

function Loader() {
  return <p className="loader">Loading...</p>;
}

function Search({ city, setCity, onSearchClick, fetchData }) {
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

function Main({ weatherData }) {
  const hasWeatherData =
    weatherData && weatherData.weather && weatherData.weather.length > 0;

  const temp = hasWeatherData ? Math.round(weatherData.main.temp) : null;
  const condition = hasWeatherData ? weatherData.weather[0].main : null;

  function checkWeather(condition) {
    if (!condition) {
      return "Please check the city name and try again.";
    }

    switch (condition) {
      case "Rain":
        return IMAGES.rain;
      case "Snow":
        return IMAGES.snow;
      case "Clouds":
        return IMAGES.cloud;
      case "Clear":
        return IMAGES.clear;
      case "Mist":
      case "Haze":
        return IMAGES.haze;
      default:
        return "";
    }
  }

  return (
    <div className="weather-details">
      {hasWeatherData && (
        <>
          <h1>{weatherData.name}</h1>
          <h3>{toDateFunction()}</h3>
          <div className="new-flex">
            <div className="main-img">
              <img src={checkWeather(condition)} alt="conditional-weather" />
            </div>
            <div className="new-flex-2">
              <p>{temp} °C</p>
              <p style={{ color: "#0d2949" }}>{condition}</p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function Footer({ weatherData }) {
  const hasWeatherData = weatherData && weatherData.main && weatherData.wind;

  return (
    <div className="footer">
      {hasWeatherData && (
        <>
          <div className="humidity">
            <img src={IMAGES.humidity} alt="humidity-logo" />
            <p>Humidity: {weatherData.main.humidity} %</p>
          </div>

          <div className="wind">
            <img src={IMAGES.wind} alt="wind-logo" />
            <p>Wind: {weatherData.wind.speed} km/s</p>
          </div>
        </>
      )}
    </div>
  );
}
