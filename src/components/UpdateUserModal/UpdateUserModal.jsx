import "./UpdateUserModal.css";
import useForm from "../../hooks/useForm";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function UpdateUserModal({ isOpen, closeActiveModal, onSubmit }) {
  const { handleSignupInput, errorR, isDisabled, formHandleChangeSignup } =
    useForm();

  const onUpdateUser = (e) => {
    e.preventDefault();
    onSubmit({ name: e.target.name.value, avatar: e.target.avatar.value });
  };
  return (
    <>
      <ModalWithForm
        buttonText="Save changes"
        titleText="Change profile data"
        isOpen={isOpen}
        closeActiveModal={closeActiveModal}
        onSubmit={onUpdateUser}
        isDisabled={isDisabled}
        formHandleChange={formHandleChangeSignup}
      >
        <label htmlFor="update-user-name-input" className="modal__label">
          Name*
          <span className="modal__error" id="update-user-name-input-error">
            {errorR.name}
          </span>
          <input
            id="update-user-name-input"
            name="name"
            type="text"
            className="modal__input"
            placeholder="Name"
            minLength="2"
            maxLength="40"
            required
            onChange={handleSignupInput}
          />
        </label>
        <label htmlFor="update-user-avatar-input" className="modal__label">
          Avatar
          <span className="modal__error" id="update-user-avatar-input-error">
            {errorR.avatar}
          </span>
          <input
            id="update-user-avatar-input"
            name="avatar"
            type="url"
            className="modal__input"
            placeholder="avatar"
            required
            onChange={handleSignupInput}
          />
        </label>
      </ModalWithForm>
    </>
  );
}
export default UpdateUserModal;
