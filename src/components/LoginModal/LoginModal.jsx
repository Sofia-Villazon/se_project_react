import "./LoginModal.css";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function LoginModal({ isOpen, onSignin, closeActiveModal, toggleModal }) {
  const {
    userDataL,
    handleSigninInput,
    errorLogin,
    isDisabled,
    formHandleChangeSignin,
  } = useForm();

  const onLogin = (e) => {
    e.preventDefault();
    onSignin(userDataL);
  };

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
        formHandleChange={formHandleChangeSignin}
        toggleModal={toggleModal}
      >
        <label htmlFor="login-email-input" className="modal__label">
          Email
          <span className="modal__error" id="login-email-input-error">
            {errorLogin.email}
          </span>
          <input
            id="login-email-input"
            name="email"
            type="email"
            className="modal__input"
            placeholder="Email"
            required
            value={userDataL.email}
            onChange={handleSigninInput}
          />
        </label>
        <label htmlFor="login-password-input" className="modal__label">
          Password
          <span className="modal__error" id="login-password-input-error">
            {errorLogin.password}
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
            value={userDataL.password}
            onChange={handleSigninInput}
          />
        </label>
      </ModalWithForm>
    </>
  );
}
export default LoginModal;
