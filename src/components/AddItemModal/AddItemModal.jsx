import "./AddItemModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import { disableBtnElement } from "../../validation";
import { settings } from "../../utils/constants.js";

function AddItemModal({ isOpen, onAddItem, closeActiveModal }) {
  const defaultValues = { name: "", imageUrl: "", weather: "" };
  const { values, setValues, handleChange } = useForm(defaultValues);

  const inputs = Array.from(
    document.querySelectorAll(".modal__input, .modal__radio-input")
  );

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onAddItem(values);
    setValues(defaultValues);
    const fieldset = document.querySelector(".modal__fieldset");
    const radioInputArray = fieldset.querySelectorAll(".modal__radio-input");
    radioInputArray.forEach((item) => {
      item.checked = false;
    });
    const btnElement = evt.target.querySelector(".modal__submit-btn");
    disableBtnElement(btnElement, settings);

    inputs.forEach((item) => console.log(item.validity.valid));
  };

  return (
    <>
      <ModalWithForm
        buttonText="Add garment"
        titleText="New garment"
        closeActiveModal={closeActiveModal}
        isOpen={isOpen}
        onSubmit={handleSubmit}
      >
        <label htmlFor="garment-name-input" className="modal__label">
          Name
          <span className="modal__error" id="garment-name-input-error"></span>
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
          <span className="modal__error" id="garment-image-input-error"></span>
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

          <div className="modal__radio-btn">
            <input
              type="radio"
              id="type-hot-input"
              className="modal__radio-input"
              name="weather"
              required
              value="hot"
              onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
            <label htmlFor="type-cold-input" className="modal__label_radio">
              Cold
            </label>
          </div>
        </fieldset>
      </ModalWithForm>
    </>
  );
}
export default AddItemModal;
