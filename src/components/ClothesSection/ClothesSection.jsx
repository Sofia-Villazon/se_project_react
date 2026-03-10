import ItemCard from "../ItemCard/ItemCard";
import { useContext } from "react";
import CurrentUserContext from "../../hooks/contexts/CurrentUserContext";

import "./ClothesSection.css";

function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
  const { currentUser } = useContext(CurrentUserContext);
  // const isOwn = card.owner === userData._id;
  const clothingCards = clothingItems
    .filter((item) => item.owner === currentUser._id)
    .map((item) => {
      return (
        <ItemCard key={item._id} item={item} onCardClick={handleCardClick} />
      );
    });

  return (
    <div className="clothing-selection">
      <h2 className="clothes-selection__title">Your items</h2>
      <button
        onClick={handleAddClick}
        className="clothing-selection__button"
        type="button"
      >
        + Add new
      </button>
      <ul className="clothing-selection__list">{clothingCards}</ul>
    </div>
  );
}
export default ClothesSection;
