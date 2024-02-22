import IMAGES from "../../images";
import toDateFunction from "../../toDateFunction";

export default function Main({ weatherData }) {
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
              <span>{condition}</span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
