import IMAGES from "../../images";

export default function Footer({ weatherData }) {
  const hasWeatherData = weatherData && weatherData.main && weatherData.wind;

  return (
    <div className="footer">
      {hasWeatherData && (
        <>
          <div className="humidity">
            <div>
            <img src={IMAGES.humidity} alt="humidity-logo" />
            </div>
            <div>
            <p className="p-humidity"> Humidity: {weatherData.main.humidity} %</p>
            </div>
            {/* <progress value={weatherData.main.humidity} max="100"></progress> */}
            {/* <p>{weatherData.main.humidity} %</p> */}
          </div>

          <div className="wind">
            <img src={IMAGES.wind} alt="wind-logo" />
            <p className="p-wind">Wind: {weatherData.wind.speed} km/s</p>
            {/* <p className="p-wind2">{weatherData.wind.speed} km/s</p> */}
          </div>
        </>
      )}
    </div>
  );
}
