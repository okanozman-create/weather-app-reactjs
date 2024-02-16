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
    try {
  
      setIsLoading(true);
      setError("");

      // const lambdaEndpoint =
      //   "https://nb5ol5oy4g.execute-api.eu-west-1.amazonaws.com/default";
      // const res = await fetch(
      //   `${lambdaEndpoint}/myWeatherAppFunction-staging?city=${city}`
      // );

      const lambdaEndpoint = "https://vzgnt19q7c.execute-api.eu-west-1.amazonaws.com/default/";

      // Construct the URL with the correct query parameters
      const url = `${lambdaEndpoint}?city=${city}`;
      
      // Make the fetch request to the Lambda function endpoint
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
    if (!city.trim()) {
      setError("Please enter a city name.");
      return;
    }
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
