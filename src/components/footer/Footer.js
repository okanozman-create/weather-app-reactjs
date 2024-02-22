import IMAGES from "../../images";

export default function Footer({ weatherData }) {
  const hasWeatherData = weatherData && weatherData.main && weatherData.wind;

  return (
    <div className="footer">
      {hasWeatherData && (
        <>
          <div className="humidity">
            <img src={IMAGES.humidity} alt="humidity-logo" />
            <p className="p-humidity"> Humidity</p>
            <progress value={weatherData.main.humidity} max="100"></progress>
            <p>{weatherData.main.humidity} %</p>
          </div>

          <div className="wind">
            <img src={IMAGES.wind} alt="wind-logo" />
            <p className="p-wind">Wind</p>
            <p className="p-wind2">{weatherData.wind.speed} km/s</p>
          </div>
        </>
      )}
    </div>
  );
}
