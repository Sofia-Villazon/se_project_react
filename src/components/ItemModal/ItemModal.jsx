import "../ModalWithForm/ModalWithForm.css";
import "./ItemModal.css";

function ItemModal({ card, activeModal, closeActiveModal, deleteHandler }) {
  const deleteCardHandler = () => {
    deleteHandler(card._id);
  };
  return (
    <section
      className={`modal ${activeModal === "preview" ? "modal_is-opened" : ""}`}
    >
      <div className="modal__container modal__container_preview">
        <button
          type="button"
          className="modal__close-btn modal__close_preview"
          onClick={closeActiveModal}
        ></button>
        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          <button
            type="button"
            className="modal__delete-btn"
            onClick={deleteCardHandler}
          >
            Delete Item
          </button>
        </div>
      </div>
    </section>
  );
}

export default ItemModal;
