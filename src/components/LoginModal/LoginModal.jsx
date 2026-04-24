import "./LoginModal.css";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { defaultLogData } from "../../utils/constants";
import { useEffect } from "react";

function LoginModal({
  isOpen,
  onSignin,
  closeActiveModal,
  toggleModal,
  loginData,
  setLoginData,
}) {
  const { setUserDataL, handleInput, error, isDisabled, formHandleChange } =
    useForm(defaultLogData);

  const onLogin = (e) => {
    e.preventDefault();
    onSignin(loginData);
  };

  useEffect(() => {
    if (isOpen) {
      setLoginData(defaultLogData);
    }
  }, [isOpen]);

  return (
    <>
      <ModalWithForm
        buttonText="Login"
        titleText="Login"
        isOpen={isOpen}
        closeActiveModal={closeActiveModal}
        changeName="or Register"
        onSubmit={onLogin}
        isDisabled={isDisabled}
        formHandleChange={formHandleChange}
        toggleModal={toggleModal}
      >
        <label htmlFor="login-email-input" className="modal__label">
          Email
          <span className="modal__error" id="login-email-input-error">
            {error.email}
          </span>
          <input
            id="login-email-input"
            name="email"
            type="email"
            className="modal__input"
            placeholder="Email"
            required
            value={loginData.email}
            onChange={(evt) => handleInput(evt, setLoginData)}
          />
        </label>
        <label htmlFor="login-password-input" className="modal__label">
          Password
          <span className="modal__error" id="login-password-input-error">
            {error.password}
          </span>
          <input
            id="login-password-input"
            name="password"
            type="password"
            className="modal__input"
            placeholder="Password"
            minLength="8"
            maxLength="10"
            required
            value={loginData.password}
            onChange={(evt) => handleInput(evt, setLoginData)}
          />
        </label>
      </ModalWithForm>
    </>
  );
}
export default LoginModal;
