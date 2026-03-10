import "./RegisterModal.css";

import ModalWithForm from "../ModalWithForm/ModalWithForm";
import useForm from "../../hooks/useForm";

function RegisterModal({ isOpen, onSignUp, closeActiveModal }) {
  const {
    userData,
    errorR,
    handleSignupInput,
    isDisabled,
    formHandleChangeSignup,
  } = useForm();

  const onRegistration = (e) => {
    e.preventDefault();
    // console.log(userData);
    onSignUp(userData);
  };

  return (
    <>
      <ModalWithForm
        buttonText="Next"
        titleText="Register"
        isOpen={isOpen}
        closeActiveModal={closeActiveModal}
        sign
        changeName="or Login"
        onSubmit={onRegistration}
        isDisabled={isDisabled}
        formHandleChange={formHandleChangeSignup}
      >
        <label htmlFor="register-email-input" className="modal__label">
          Email*
          <span className="modal__error" id="login-email-input-error">
            {errorR.email}
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
            value={userData.email}
            onChange={handleSignupInput}
          />
        </label>
        <label htmlFor="register-password-input" className="modal__label">
          Password*
          <span className="modal__error" id="register-password-input-error">
            {errorR.password}
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
            value={userData.password}
            onChange={handleSignupInput}
          />
        </label>
        <label htmlFor="register-name-input" className="modal__label">
          Name
          <span className="modal__error" id="register-name-input-error">
            {errorR.name}
          </span>
          <input
            id="register-name-input"
            name="name"
            type="text"
            className="modal__input"
            placeholder="Name"
            minLength="2"
            maxLength="40"
            onChange={handleSignupInput}
            value={userData.name}
          />
        </label>
        <label htmlFor="register-avatar-input" className="modal__label">
          Avatar URL
          <span className="modal__error" id="register-avatar-input-error">
            {errorR.avatar}
          </span>
          <input
            id="register-avatar-input"
            name="avatar"
            type="url"
            className="modal__input"
            placeholder="Avatar URL"
            value={userData.avatar}
            onChange={handleSignupInput}
          />
        </label>
      </ModalWithForm>
    </>
  );
}
export default RegisterModal;
