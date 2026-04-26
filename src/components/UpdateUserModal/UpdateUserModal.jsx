import "./UpdateUserModal.css";
import useForm from "../../hooks/useForm";
import { useContext, useEffect } from "react";
import CurrentUserContext from "../../hooks/contexts/CurrentUserContext";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { defaultRegData } from "../../utils/constants";

function UpdateUserModal({ isOpen, closeActiveModal, onSubmit }) {
  const { userData } = useContext(CurrentUserContext);
  const { handleInput, error, isDisabled, values, setValues, handleChange } =
    useForm(defaultRegData);
  useEffect(() => {
    if (isOpen) {
      setValues({
        name: userData.name || "",
        avatar: userData.avatar || "",
      });
    }
  }, [isOpen, userData]);

  const onUpdateUser = (e) => {
    e.preventDefault();
    onSubmit({ name: values.name, avatar: values.avatar });
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
            value={values.name || ""}
            onChange={handleChange}
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
            value={values.avatar || ""}
            onChange={handleChange}
          />
        </label>
      </ModalWithForm>
    </>
  );
}
export default UpdateUserModal;
