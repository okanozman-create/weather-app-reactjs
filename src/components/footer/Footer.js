import IMAGES from "../../images";

export default function Footer({ weatherData }) {
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
