import "./ItemCard.css";
import { useContext } from "react";
import CurrentUserContext from "../../hooks/contexts/CurrentUserContext";

function ItemCard({ item, onCardClick }) {
  const { handleCardLike, currentUser } = useContext(CurrentUserContext);
  const isLiked = item.likes.some((id) => id === currentUser._id);
  const handleCardClick = () => {
    onCardClick(item);
  };
  const onCardLike = () => {
    handleCardLike({ id: item._id, isLiked });
  };
  const isOwn = item.owner === currentUser._id;
  const itemLikeButtonClassName = isOwn
    ? isLiked
      ? "item-card__like-btn_active item-card__like-btn"
      : "item-card__like-btn"
    : "modal__like-btn_hidden";
  return (
    <li className="item-card" key={item._id}>
      <div className="item-card__header">
        <h2 className="item-card__name">{item.name}</h2>
        <button
          className={itemLikeButtonClassName}
          onClick={onCardLike}
        ></button>
      </div>

      <div className="item-card__header"></div>
      <img
        src={item.imageUrl}
        alt={item.name}
        className="item-card__image"
        onClick={handleCardClick}
      />
    </li>
  );
}

export default ItemCard;
