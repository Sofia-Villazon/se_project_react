import "./AddItemModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import { settings, defaultValues } from "../../utils/constants.js";

function AddItemModal({ isOpen, onAddItem, closeActiveModal }) {
  const {
    values,
    setValues,
    handleImage,
    error,
    handleName,
    handleRadioBtn,
    isChecked,
    isDisabled,
    setIsDisabled,
  } = useForm();

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (error === defaultValues) {
      onAddItem(values);
      setValues(defaultValues);
    }
  };
  return (
    <>
      <ModalWithForm
        buttonText="Add garment"
        titleText="New garment"
        closeActiveModal={closeActiveModal}
        isOpen={isOpen}
        onSubmit={handleSubmit}
        error={error}
        isDisabled={isDisabled}
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
            onChange={handleName}
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
            onChange={handleImage}
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
              onChange={handleRadioBtn}
              checked={isChecked.hot}
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
              onChange={handleRadioBtn}
              checked={isChecked.warm}
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
              onChange={handleRadioBtn}
              checked={isChecked.cold}
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
