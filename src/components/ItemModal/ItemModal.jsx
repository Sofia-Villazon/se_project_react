import "./ItemModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../hooks/contexts/CurrentUserContext";

function ItemModal({ card, activeModal, closeActiveModal, deleteHandler }) {
  const { currentUser } = useContext(CurrentUserContext);
  const deleteCardHandler = () => {
    deleteHandler(card._id);
  };
  const isOwn = card.owner === currentUser._id;
  const itemDeleteButtonClassName = `modal__delete-btn ${isOwn ? "" : "modal__delete-btn_hidden"}`;
  return (
    <section
      className={`modal ${activeModal === "preview" ? "modal_is-opened" : ""}`}
    >
      <div className=" modal__container_preview">
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
            className={itemDeleteButtonClassName}
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
