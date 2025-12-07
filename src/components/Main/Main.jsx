import { useContext } from "react";

import ItemCard from "../ItemCard/ItemCard";
import WeatherCard from "../WeatherCard/WeatherCard";
import { CurrentTemperatureUnitContext } from "../../hooks/contexts/CurrentTemperatureUnitContext";

import "./Main.css";

function Main({ weatherData, handleCardClick, clothingItems }) {
  const { currentTemperatureUnit } = useContext(CurrentTemperatureUnitContext);
  const temperature = weatherData.temp[`${currentTemperatureUnit}`];

  const filteredCards = clothingItems
    .filter((item) => {
      return item.weather === weatherData.type.toLowerCase();
    })
    .map((item) => {
      return (
        <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
      );
    });
  return (
    <main>
      <WeatherCard temperature={temperature} weatherData={weatherData} />
      <section className="cards">
        <p className="cards__text">
          Today is {temperature}° {currentTemperatureUnit} / You may want to
          wear:
        </p>
        <ul className="cards__list">{filteredCards}</ul>
      </section>
    </main>
  );
}

export default Main;
