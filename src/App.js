import { useState } from "react";
import Search from "./components/search/Search";
import Main from "./components/main/Main";
import Loader from "./components/loader/Loader";
import Footer from "./components/footer/Footer";
import ErrorMessage from "./components/error/ErrorMessage";

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchData() {
    setIsLoading(true);
    setError("");
    const endpoint =
      "https://vzgnt19q7c.execute-api.eu-west-1.amazonaws.com/prod1";
    const postData = { city: city };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!res.ok) throw new Error("Please enter a valid city name. ⛷️⛷️⛷️");

      const data = await res.json();
      if (data.cod === "404")
        throw new Error("Please check the city name and try again.");

      setWeatherData(data);
    } catch (error) {
      setError(error.message);

      setWeatherData({});
    } finally {
      setIsLoading(false);
    }
  }

  function handleSearchClick() {
    fetchData();
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

        {error && (
          <div className="errorMessageContainer">
            <ErrorMessage message={error} />
          </div>
        )}

        {!isLoading && !error && weatherData && weatherData.weather && (
          <>
            <Main weatherData={weatherData} />
            <Footer weatherData={weatherData} />
          </>
        )}
      </div>
    </div>
  );
};

export default App;
