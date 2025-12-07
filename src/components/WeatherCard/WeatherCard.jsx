import "./WeatherCard.css";
import { weatherCard } from "../../utils/constants";
import { CurrentTemperatureUnitContext } from "../contexts/CurrentTemperatureUnitContext";
import { useContext } from "react";

function WeatherCard({ temperature, weatherData }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);

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

  const cardImageFilterTime = weatherData.dayNight ? "D" : "N";
  const selectedCard = `${cardImageFilter}${cardImageFilterTime}`;

  return (
    <section className="weather-card__container">
      <p className="weather-card__temperature">
        {temperature}° {currentTemperatureUnit}
      </p>
      <img
        src={weatherCard[weatherData.dayNight ? "day" : "night"][selectedCard]}
        alt={selectedCard}
        className="weather-card__image"
      />
    </section>
  );
}

export default WeatherCard;
