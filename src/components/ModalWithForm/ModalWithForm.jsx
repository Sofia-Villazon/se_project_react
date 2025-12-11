import { defaultInputCheck } from "../../utils/constants";
import "./ModalWithForm.css";
import useForm from "../../hooks/useForm";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  onSubmit,
  closeActiveModal,
  isOpen,
  isDisabled,
  formHandleChange,
}) {
  const { setIsChecked, isChecked, values } = useForm();
  const uncheckCheckbox = () => {
    setIsChecked(defaultInputCheck);
  };

  return (
    <section className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
      <div className="modal__container">
        <button
          type="button"
          className="modal__close-btn"
          onClick={closeActiveModal}
        />
        <h2 className="modal__title">{titleText}</h2>
        <form
          className="modal__form"
          onSubmit={onSubmit}
          onChange={formHandleChange}
        >
          {children}
          <button
            type="submit"
            className="modal__submit-btn"
            disabled={isDisabled}
            onClick={uncheckCheckbox}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default ModalWithForm;
