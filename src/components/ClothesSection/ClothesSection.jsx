import ItemCard from "../ItemCard/ItemCard";

import "./ClothesSection.css";

function ClothesSection({ clothingItems, handleCardClick, handleAddClick }) {
  const clothingCards = clothingItems.map((item) => {
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
