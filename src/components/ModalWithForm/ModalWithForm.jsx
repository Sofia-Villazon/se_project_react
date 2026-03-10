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
  sign,
  changeName,
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
          <div className="modal__btns">
            <button
              type="submit"
              className="modal__submit-btn"
              disabled={isDisabled}
              onClick={uncheckCheckbox}
            >
              {buttonText}
            </button>
            {sign ? (
              <button className="modal__change-btn" disabled={isDisabled}>
                {changeName}
              </button>
            ) : null}
          </div>
        </form>
      </div>
    </section>
  );
}

export default ModalWithForm;
