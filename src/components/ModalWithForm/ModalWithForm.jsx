import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  titleText,
  activeModal,
  closeActiveModal,
  isOpen,
}) {
  return (
    <>
      <section className={`modal ${isOpen ? "modal_is-opened" : ""}`}>
        <div className="modal__container">
          <button
            type="button"
            className="modal__close-btn"
            onClick={closeActiveModal}
          ></button>
          <h2 className="modal__title">{titleText}</h2>
          <form className="modal__form" noValidate>
            {children}
            <button type="submit" className="modal__submit-btn">
              {buttonText}
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

export default ModalWithForm;
