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

  const fetchData = async () => {
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }

    setIsLoading(true);
    setError("");

    const lambdaEndpoint = 'https://vzgnt19q7c.execute-api.eu-west-1.amazonaws.com/prod1/';
    const url = `${lambdaEndpoint}?city=${encodeURIComponent(city)}`;

    try {
      const response = await fetch(url, { method: "GET", headers: { "Content-Type": "application/json" } });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong...");
      }

      setWeatherData(data);
    } catch (error) {
      console.error("Fetch error:", error);
      setError("An error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="App">
      <div className="container">
        <Search city={city} setCity={setCity} onSearchClick={() => fetchData()} />
        {isLoading && <Loader />}
        {!isLoading && !error && <><Main weatherData={weatherData} /><Footer weatherData={weatherData} /></>}
        {error && <ErrorMessage message={error} />}
      </div>
    </div>
  );
};

export default App;
