import "./ModalWithoutForm.css";

function ModalWithoutForm({
  modalCaption,
  closeActiveModal,
  buttonProceed,
  isOpen,
  proceedHandler,
}) {
  return (
    <section className={`modal_nf ${isOpen ? "modal_nf_is-opened" : ""}`}>
      <div className="modal_nf__container">
        <button
          type="button"
          className="modal_nf__close-btn"
          onClick={closeActiveModal}
        ></button>

        <h2 className="modal_nf__caption">{modalCaption}</h2>

        <button
          type="button"
          className="modal_nf__btn"
          onClick={proceedHandler}
        >
          {buttonProceed}
        </button>
        <button
          type="button"
          className="modal_nf__btn modal_nf__btn_cancel"
          onClick={closeActiveModal}
        >
          Cancel
        </button>
      </div>
    </section>
  );
}

export default ModalWithoutForm;
