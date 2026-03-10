import { NavLink } from "react-router-dom";

import "./Header.css";
import logo from "../../assets/logo.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";

function Header({
  isLoggedIn,
  handleLoginClick,
  handleRegisterClick,
  handleAddClick,
  handleMenuClick,
  activeModal,
  closeActiveModal,
  weatherData,
  user,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  return (
    <header className="header">
      <button
        className="header__menu-btn"
        type="button"
        onClick={handleMenuClick}
      ></button>

      <NavLink className="header__nav-link" to="/">
        <img src={logo} alt="wtwr logo" className="header__logo" />
      </NavLink>

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
        <ToggleSwitch />
        {isLoggedIn ? (
          <div className="header__user-info">
            <button
              onClick={handleAddClick}
              className="header__button"
              type="button"
            >
              + Add clothes
            </button>
            <NavLink className="header__nav-link" to="/profile">
              <div className="header__user-container">
                <p className="header__user-name">{user.name}</p>
                <img
                  src={user.avatar}
                  alt={user.name}
                  className="header__avatar"
                />
              </div>
            </NavLink>
          </div>
        ) : (
          <div className="header__register-login-btns">
            <button
              className="header__register-login-btn"
              onClick={handleRegisterClick}
            >
              Sign Up
            </button>
            <button
              className="header__register-login-btn"
              onClick={handleLoginClick}
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
export default Header;
