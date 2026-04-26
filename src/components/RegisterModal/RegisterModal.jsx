import "./RegisterModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import { defaultRegData } from "../../utils/constants";

import { useEffect } from "react";

function RegisterModal({ isOpen, onSignUp, closeActiveModal, toggleModal }) {
  const {
    error,
    handleInput,
    isDisabled,
    formHandleChange,
    values,
    handleChange,
    setValues,
  } = useForm(defaultRegData);

  const onRegistration = (e) => {
    e.preventDefault();
    onSignUp(values);
  };

  useEffect(() => {
    if (isOpen) {
      setValues(defaultRegData);
    }
  }, [isOpen]);

  return (
    <ModalWithForm
      buttonText="Next"
      titleText="Register"
      isOpen={isOpen}
      closeActiveModal={closeActiveModal}
      changeName="or Login"
      onSubmit={onRegistration}
      isDisabled={isDisabled}
      toggleModal={toggleModal}
    >
      <label htmlFor="register-email-input" className="modal__label">
        Email*
        <span className="modal__error" id="register-email-input-error">
          {error.email}
        </span>
        <input
          id="register-email-input"
          name="email"
          type="email"
          className="modal__input"
          placeholder="Email"
          required
          minLength="2"
          maxLength="40"
          value={values.email}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="register-password-input" className="modal__label">
        Password*
        <span className="modal__error" id="register-password-input-error">
          {error.password}
        </span>
        <input
          id="register-password-input"
          name="password"
          type="password"
          className="modal__input"
          placeholder="Password"
          minLength="8"
          maxLength="10"
          required
          value={values.password}
          onChange={handleChange}
        />
      </label>
      <label htmlFor="register-name-input" className="modal__label">
        Name
        <span className="modal__error" id="register-name-input-error">
          {error.name}
        </span>
        <input
          id="register-name-input"
          name="name"
          type="text"
          className="modal__input"
          placeholder="Name"
          minLength="2"
          maxLength="40"
          onChange={handleChange}
          value={values.name}
        />
      </label>
      <label htmlFor="register-avatar-input" className="modal__label">
        Avatar URL
        <span className="modal__error" id="register-avatar-input-error">
          {error.avatar}
        </span>
        <input
          id="register-avatar-input"
          name="avatar"
          type="url"
          className="modal__input"
          placeholder="Avatar URL"
          value={values.avatar}
          onChange={handleChange}
        />
      </label>
    </ModalWithForm>
  );
}
export default RegisterModal;
