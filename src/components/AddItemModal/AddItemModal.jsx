import "./AddItemModal.css";

import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import {
  defaultClothValues,
  defaultInputCheck,
} from "../../utils/constants.js";

function AddItemModal({
  isOpen,
  onAddItem,
  closeActiveModal,
  setValues,
  values,
}) {
  const {
    handleImage,
    error,
    handleInput,
    handleRadioBtn,
    setIsChecked,
    isChecked,
    setIsDisabled,
    isDisabled,
    formHandleChange,
  } = useForm(defaultClothValues, values);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const hasErrors = Object.values(error).some((e) => e !== "");
    if (!hasErrors) {
      onAddItem(values);
    }
  };

  useEffect(() => {
    if (!isOpen) {
      setValues(defaultClothValues);
      setIsChecked(defaultInputCheck);
    }
  });

  const handleChange = (evt) => {
    handleInput(evt, setValues);
  };

  return (
    <ModalWithForm
      buttonText="Add garment"
      titleText="New garment"
      closeActiveModal={closeActiveModal}
      isOpen={isOpen}
      onSubmit={handleSubmit}
      error={error}
      isDisabled={isDisabled}
      formHandleChange={formHandleChange}
    >
      <label htmlFor="garment-name-input" className="modal__label">
        Name
        <span className="modal__error" id="garment-name-input-error">
          {error.name}
        </span>
        <input
          id="garment-name-input"
          name="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          required
          minLength="2"
          maxLength="40"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="garment-image-input" className="modal__label">
        Image
        <span className="modal__error" id="garment-image-input-error">
          {error.imageUrl}
        </span>
        <input
          id="garment-image-input"
          name="imageUrl"
          type="url"
          className="modal__input"
          placeholder="Image URL"
          required
          value={values.imageUrl}
          onChange={handleChange}
        />
      </label>
      <fieldset className="modal__fieldset">
        <legend className="modal__legend">Select the weather type:</legend>
        <span className="modal__error" id="garment-name-input-error">
          {error.weather}
        </span>

        <div className="modal__radio-btn">
          <input
            type="radio"
            id="type-hot-input"
            className="modal__radio-input"
            name="weather"
            required
            value="hot"
            onChange={(evt) => handleRadioBtn(evt, setValues)}
            checked={values.weather === "hot"}
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
            name="weather"
            required
            value="warm"
            onChange={(evt) => handleRadioBtn(evt, setValues)}
            checked={values.weather === "warm"}
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
            name="weather"
            required
            value="cold"
            onChange={(evt) => handleRadioBtn(evt, setValues)}
            checked={values.weather === "cold"}
          />
          <label htmlFor="type-cold-input" className="modal__label_radio">
            Cold
          </label>
        </div>
      </fieldset>
    </ModalWithForm>
  );
}
export default AddItemModal;
