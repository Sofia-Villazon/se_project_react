import ClothesSection from "../ClothesSection/ClothesSection";
import SideBar from "../SideBar/SideBar";

import "./Profile.css";

function Profile({
  clothingItems,
  handleCardClick,
  handleAddClick,
  user,
  handleLogOut,
}) {
  return (
    <section className="profile">
      <SideBar user={user} handleLogOut={handleLogOut} />
      <ClothesSection
        clothingItems={clothingItems}
        handleCardClick={handleCardClick}
        handleAddClick={handleAddClick}
      />
    </section>
  );
}
export default Profile;
