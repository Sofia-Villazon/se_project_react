import { useState } from "react";
import { useEffect } from "react";

import { settings, cordinates, APIkey } from "../../utils/constants.js";
import { enableValidation, disableBtnElement } from "../../validation.js";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import ItemModal from "../ItemModal/ItemModal";
import "./App.css";
import "../../vendor/normalize.css";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 999 },
    type: "",
    condition: {},
    isDay: {},
  });
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleMenuClick = () => {
    setActiveModal("menu");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  useEffect(() => {
    const submitBtn = document.querySelector(".modal__submit-btn");
    disableBtnElement(submitBtn, settings);
    enableValidation(settings);

    getWeather({ cordinates, APIkey })
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <div className="page">
        <div className="page__content">
          <Header
            handleAddClick={handleAddClick}
            handleMenuClick={handleMenuClick}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
            weatherData={weatherData}
          />
          <Main weatherData={weatherData} handleCardClick={handleCardClick} />
          <Footer />
          <ModalWithForm
            buttonText="Add garment"
            titleText="New garment"
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
          >
            <label htmlFor="garment-name-input" className="modal__label">
              Name
              <input
                id="garment-name-input"
                type="text"
                className="modal__input"
                placeholder="Name"
                required
                minLength="2"
                maxLength="40"
              />
              <span
                className="modal__error"
                id="garment-name-input-error"
              ></span>
            </label>
            <label htmlFor="garment-image-input" className="modal__label">
              Image
              <input
                id="garment-image-input"
                type="url"
                className="modal__input"
                placeholder="Image URL"
                required
              />
              <span
                className="modal__error"
                id="garment-image-input-error"
              ></span>
            </label>
            <fieldset className="modal__fieldset">
              <legend className="modal__legend">
                Select the weather type:
              </legend>

              <div className="modal__radio-btn">
                <input
                  type="radio"
                  id="type-hot-input"
                  className="modal__radio-input"
                  name="type"
                  required
                />
                <label htmlFor="type-hot-input" className="modal__label_radio">
                  Hot
                </label>
              </div>

              <div className="modal__radio-btn">
                <input
                  type="radio"
                  id="type-warm-input"
                  className="modal__radio-input"
                  name="type"
                  required
                />
                <label htmlFor="type-warm-input" className="modal__label_radio">
                  Warm
                </label>
              </div>

              <div className="modal__radio-btn">
                <input
                  type="radio"
                  id="type-cold-input"
                  className="modal__radio-input"
                  name="type"
                  required
                />
                <label htmlFor="type-cold-input" className="modal__label_radio">
                  Cold
                </label>
              </div>
            </fieldset>
          </ModalWithForm>
          <ItemModal
            card={selectedCard}
            activeModal={activeModal}
            closeActiveModal={closeActiveModal}
          />
        </div>
      </div>
    </>
  );
}

export default App;

// mkdir ItemCard && touch ItemCard/ItemCard.jsx ItemCard/ItemCard.css
