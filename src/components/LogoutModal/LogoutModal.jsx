import ModalWithoutForm from "../ModalWithoutForm/ModalWithoutForm";
import "./LogoutModal.css";
import { useContext } from "react";
import CurrentUserContext from "../../hooks/contexts/CurrentUserContext";
import { useNavigate } from "react-router-dom";

import { removeToken } from "../../utils/token";

function LogoutModal({ closeActiveModal, isOpen }) {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(CurrentUserContext);
  const signOut = () => {
    removeToken();
    setIsLoggedIn(false);
    closeActiveModal();
    navigate("/");
  };

  return (
    <ModalWithoutForm
      modalCaption={"Are you sure you want to log out?"}
      closeActiveModal={closeActiveModal}
      buttonProceed={"Log out"}
      isOpen={isOpen}
      proceedHandler={signOut}
    ></ModalWithoutForm>
  );
}

export default LogoutModal;
