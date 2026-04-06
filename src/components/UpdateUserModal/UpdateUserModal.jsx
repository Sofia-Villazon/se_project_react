import "./UpdateUserModal.css";
import useForm from "../../hooks/useForm";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../hooks/contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function UpdateUserModal({ isOpen, closeActiveModal, onSubmit }) {
  const { currentUser } = useContext(CurrentUserContext);
  const {
    handleUpdateInput,
    error,
    isDisabled,
    formHandleChangeUpdate,
    userData,
    setUserData,
  } = useForm();
  console.log(currentUser);
  useEffect(() => {
    if (isOpen) {
      setUserData({
        name: userData.name,
        avatar: userData.avatar,
      });
    }
  }, [isOpen, currentUser]);

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
        formHandleChange={formHandleChangeUpdate}
      >
        <label htmlFor="update-user-name-input" className="modal__label">
          Name*
          <span className="modal__error" id="update-user-name-input-error">
            {error.name}
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
            value={userData.name || ""}
            onChange={handleUpdateInput}
          />
        </label>
        <label htmlFor="update-user-avatar-input" className="modal__label">
          Avatar
          <span className="modal__error" id="update-user-avatar-input-error">
            {error.avatar}
          </span>
          <input
            id="update-user-avatar-input"
            name="avatar"
            type="url"
            className="modal__input"
            placeholder="avatar"
            required
            value={userData.avatar || ""}
            onChange={handleUpdateInput}
          />
        </label>
      </ModalWithForm>
    </>
  );
}
export default UpdateUserModal;
