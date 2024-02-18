import { useState } from "react";
import config from "./aws-exports";
import { Amplify } from "aws-amplify";
import ErrorMessage from "./components/error/ErrorMessage";
import Loader from "./components/loader/Loader";
import Search from "./components/search/Search";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";

Amplify.configure(config);

const App = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function fetchData() {
    setIsLoading(true);
    setError("");

    const lambdaEndpoint = "https://vzgnt19q7c.execute-api.eu-west-1.amazonaws.com/prod1/";

    const url = `${lambdaEndpoint}myWeatherAppFunction-staging?city=${encodeURIComponent(city)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong...");
      }

      if (data.cod === "404") {
        throw new Error("Please check the city name and try again.");
      }

      setWeatherData(data);
      setCity(""); 
    } catch (error) {
      setError(error.message);
    
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
