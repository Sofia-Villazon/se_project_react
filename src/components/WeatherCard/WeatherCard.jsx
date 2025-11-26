import "./WeatherCard.css";
import { weatherCard } from "../../utils/constants";

function WeatherCard({ temperature, weatherData }) {
  const cardImageFilter =
    weatherData.condition < 300
      ? "storm"
      : weatherData.condition < 600
      ? "rain"
      : weatherData.condition < 700
      ? "snow"
      : weatherData.condition < 800
      ? "fog"
      : weatherData.condition === 800
      ? "sunny"
      : "cloudy";

  const cardImageFilterTime = weatherData.isDay ? "D" : "N";
  const selectedCard = `${cardImageFilter}${cardImageFilterTime}`;

  return (
    <>
      <section className="weather-card__container">
        <p className="weather-card__temperature">{temperature}°F</p>
        <img
          src={
            weatherCard[weatherData.dayNight ? "day" : "night"][selectedCard]
          }
          alt="cloudy"
          className="weather-card__image"
        />
      </section>
    </>
  );
}

export default WeatherCard;
