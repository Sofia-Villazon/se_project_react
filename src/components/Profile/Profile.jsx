import ClothesSelection from "../ClothesSection/ClothesSelection";
import SideBar from "../SideBar/SideBar";

import "./Profile.css";

function Profile({ clothingItems, handleCardClick, handleAddClick }) {
  return (
    <section className="profile">
      <SideBar />
      <ClothesSelection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
export default Profile;
