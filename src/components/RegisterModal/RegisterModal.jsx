import "./RegisterModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";
import { defaultRegData } from "../../utils/constants";

import { useEffect } from "react";

function RegisterModal({
  isOpen,
  onSignUp,
  closeActiveModal,
  toggleModal,
  setRegisteredData,
  registeredData,
}) {
  const { error, handleInput, isDisabled, formHandleChange } =
    useForm(defaultRegData);

  const onRegistration = (e) => {
    e.preventDefault();
    onSignUp(registeredData);
  };

  useEffect(() => {
    if (isOpen) {
      setRegisteredData(defaultRegData);
    }
  }, [isOpen]);

  return (
    <>
      <ModalWithForm
        buttonText="Next"
        titleText="Register"
        isOpen={isOpen}
        closeActiveModal={closeActiveModal}
        changeName="or Login"
        onSubmit={onRegistration}
        isDisabled={isDisabled}
        formHandleChange={formHandleChange}
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
            value={registeredData.email}
            onChange={(evt) => handleInput(evt, setRegisteredData)}
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
            value={registeredData.password}
            onChange={(evt) => handleInput(evt, setRegisteredData)}
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
            onChange={(evt) => handleInput(evt, setRegisteredData)}
            value={registeredData.name}
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
            value={registeredData.avatar}
            onChange={(evt) => handleInput(evt, setRegisteredData)}
          />
        </label>
      </ModalWithForm>
    </>
  );
}
export default RegisterModal;
