import "./Header.css";
import logo from "../../assets/logo.png";
import { user } from "../../utils/constants";

function Header({
  handleAddClick,
  handleMenuClick,
  activeModal,
  closeActiveModal,
  weatherData,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <header className="header">
        <button
          className="header__menu-btn"
          type="button"
          onClick={handleMenuClick}
        ></button>

        <img src={logo} alt="wtwr logo" className="header__logo" />
        <p className="header__date-location">
          {currentDate}, {weatherData.city}
        </p>

        <div
          className={
            activeModal === "menu" ? "header__menu_mobile" : "header__menu"
          }
        >
          <button
            type="button"
            className={
              activeModal === "menu"
                ? "header__menu_mobile__close-btn"
                : "header__menu_mobile__close-btn_hidden"
            }
            onClick={closeActiveModal}
          ></button>

          <button
            onClick={handleAddClick}
            className="header__button"
            type="button"
          >
            + Add clothes
          </button>
          <div className="header__user-container">
            <p className="header__user-name">{user.name}</p>
            <img src={user.avatar} alt={user.name} className="header__avatar" />
          </div>
        </div>
      </header>
    </>
  );
}
export default Header;
