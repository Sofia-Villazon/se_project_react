import { useState, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

import { apiKey } from "../../utils/constants.js";

import Header from "../Header/Header";
import Main from "../Main/Main";
import Footer from "../Footer/Footer";
import ItemModal from "../ItemModal/ItemModal";
import LogoutModal from "../LogoutModal/LogoutModal.jsx";
import { filterWeatherData, getWeather } from "../../utils/weatherApi.js";
import { CurrentTemperatureUnitContext } from "../../hooks/contexts/CurrentTemperatureUnitContext.js";
import Profile from "../Profile/Profile.jsx";
import AddItemModal from "../AddItemModal/AddItemModal.jsx";
import RegisterModal from "../RegisterModal/RegisterModal.jsx";
import LoginModal from "../LoginModal/LoginModal.jsx";
import UpdateUserModal from "../UpdateUserModal/UpdateUserModal.jsx";
import CurrentUserContext from "../../hooks/contexts/CurrentUserContext.js";
import ProtectedRoute from "../../ProtectedRoute/ProtectedRoute.jsx";

import {
  getItems,
  addItems,
  deleteItems,
  getUserInfo,
  removeCardLike,
  addCardLike,
} from "../../utils/api.js";
import { setToken, getToken } from "../../utils/token.js";
import * as auth from "../../utils/auth.js";

import "../../vendor/normalize.css";
import "./App.css";

function App() {
  const [weatherData, setWeatherData] = useState({
    city: "",
    temp: { F: 999, C: 999 },
    type: "",
    condition: "",
    isDay: {},
  });
  const [coordinates, setCoordinates] = useState(null);
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [clothingItems, setClothingItems] = useState([]);
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    avatar: "",
  });
  const [currentUser, setCurrentUser] = useState({
    username: "",
    email: "",
    avatar: "",
  });

  const navigate = useNavigate();

  const handleSignup = ({ name, email, password, avatar }) => {
    auth
      .signup(name, avatar, email, password)
      .then((data) => {
        // signup returns parsed JSON (created user)
        closeActiveModal();
        // auto-signin using the returned email and the provided password
        return auth.signin(email, password);
      })
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setUserData(data.user);
          setIsLoggedIn(true);
          navigate("/");
        }
      })
      .catch((error) => {
        console.error("Registration error:", error);
      });
  };

  const handleSignin = ({ email, password }) => {
    if (!email || !password) {
      return;
    }

    auth
      .signin(email, password)
      .then((data) => {
        if (data.token) {
          setToken(data.token);
          setUserData(data.user);
          setIsLoggedIn(true);
          closeActiveModal();
          navigate("/");
        }
      })
      .catch(console.error);
  };

  const handleUpdateUser = ({ name, avatar }) => {
    auth
      .updateUserInfo(name, avatar)
      .then((data) => {
        setUserData({ name: data.name, avatar: data.avatar });
        closeActiveModal();
        navigate("/profile");
      })
      .catch(console.error);
  };

  useEffect(() => {
    const jwt = getToken();

    if (!jwt) {
      return;
    }

    getUserInfo(jwt)
      .then(({ name, email, avatar }) => {
        setIsLoggedIn(true);
        setUserData({ name, email, avatar });
      })
      .catch(console.error);
    auth
      .checkToken(jwt)
      .then((userData) => {
        setCurrentUser(userData); // This should include _id
        setIsLoggedIn(true);
      })
      .catch((error) => {
        console.log("Token validation failed:", error);
        localStorage.removeItem("jwt");
      });
  }, [currentUser]);

  useEffect(() => {
    getItems().then((data) => {
      setClothingItems(data);
    });
  }, []);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  const handleLoginClick = () => {
    setActiveModal("signin");
  };

  const handleRegisterClick = () => {
    setActiveModal("register");
  };

  const handleToggleRegisterLogin = () => {
    setActiveModal(activeModal === "register" ? "signin" : "register");
  };

  const handleMenuClick = () => {
    setActiveModal("menu");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleLogOut = () => {
    setActiveModal("log-out");
  };

  const handleUpdateModal = () => {
    setActiveModal("update-user");
  };

  const closeActiveModal = () => {
    setActiveModal("");
  };

  const handleCardLike = ({ id, isLiked }) => {
    const token = localStorage.getItem("jwt");
    !isLiked
      ? addCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err))
      : // if not, send a request to remove the user's id from the card's likes array
        removeCardLike(id, token)
          .then((updatedCard) => {
            setClothingItems((cards) =>
              cards.map((item) => (item._id === id ? updatedCard : item))
            );
          })
          .catch((err) => console.log(err));
  };

  const onAddItem = (newCardData) => {
    addItems(newCardData)
      .then((data) => {
        setClothingItems([...clothingItems, data]);
        closeActiveModal();
      })
      .catch(console.error);
  };
  const deleteHandler = (selectedCardId) => {
    const token = localStorage.getItem("jwt");
    deleteItems(selectedCardId, token)
      .then(() => {
        setClothingItems(
          clothingItems.filter((item) => item._id !== selectedCardId)
        );
        closeActiveModal();
      })
      .catch(console.error);
  };

  useEffect(() => {
    if (!activeModal) return;

    const handleEscClose = (evt) => {
      if (evt.key === "Escape") {
        closeActiveModal();
      }
    };

    document.addEventListener("keydown", handleEscClose);

    return () => {
      document.removeEventListener("keydown", handleEscClose);
    };
  }, [activeModal]);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setCoordinates({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Error getting location:", error);
          // Fallback to default location
          setCoordinates({ latitude: 45.551011, longitude: -73.445352 });
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
      setCoordinates({ latitude: 45.551011, longitude: -73.445352 });
    }
  }, []);

  useEffect(() => {
    if (coordinates) {
      getWeather({ coordinates, apiKey })
        .then((data) => {
          const filteredData = filterWeatherData(data);
          setWeatherData(filteredData);
        })
        .catch(console.error);
    }
  }, [coordinates]);

  return (
    <CurrentUserContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        userData,
        currentUser,
        handleLogOut,
        handleUpdateModal,
        handleCardLike,
      }}
    >
      <div className="page">
        <CurrentTemperatureUnitContext.Provider
          value={{
            currentTemperatureUnit,
            handleToggleSwitchChange,
          }}
        >
          <div className="page__content">
            <Header
              isLoggedIn={isLoggedIn}
              handleAddClick={handleAddClick}
              handleLoginClick={handleLoginClick}
              handleRegisterClick={handleRegisterClick}
              handleMenuClick={handleMenuClick}
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
              weatherData={weatherData}
              user={userData}
            />
            <Routes>
              <Route
                path="/"
                element={
                  <Main
                    weatherData={weatherData}
                    handleCardClick={handleCardClick}
                    clothingItems={clothingItems}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile
                      handleCardClick={handleCardClick}
                      clothingItems={clothingItems}
                      handleAddClick={handleAddClick}
                      user={userData}
                      handleLogOut={handleLogOut}
                    />
                  </ProtectedRoute>
                }
              />
            </Routes>

            <Footer />
            <AddItemModal
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "add-garment"}
              onAddItem={onAddItem}
            />
            <ItemModal
              deleteHandler={deleteHandler}
              card={selectedCard}
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
            />

            <LoginModal
              onSignin={handleSignin}
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "signin"}
              toggleModal={handleToggleRegisterLogin}
            />
            <RegisterModal
              onSignUp={handleSignup}
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "register"}
              toggleModal={handleToggleRegisterLogin}
            />
            <UpdateUserModal
              onSubmit={handleUpdateUser}
              closeActiveModal={closeActiveModal}
              isOpen={activeModal === "update-user"}
            />
            <LogoutModal
              isOpen={activeModal === "log-out"}
              activeModal={activeModal}
              closeActiveModal={closeActiveModal}
            />
          </div>
        </CurrentTemperatureUnitContext.Provider>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
