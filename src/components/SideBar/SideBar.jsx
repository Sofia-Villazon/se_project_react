import "./SideBar.css";
import { useContext } from "react";
import CurrentUserContext from "../../hooks/contexts/CurrentUserContext";

function SideBar({ user }) {
  const { handleLogOut, handleUpdateModal } = useContext(CurrentUserContext);

  return (
    <aside className="side-bar">
      <div className="side-bar__user-container">
        <img src={user.avatar} alt={user.name} className="side-bar__avatar" />
        <p className="side-bar__user-name">{user.name}</p>
      </div>
      <div className="sider-bar__user-btns">
        <button className="side-bar__btn" onClick={handleUpdateModal}>
          Change profile data
        </button>
        <button className="side-bar__btn" onClick={handleLogOut}>
          Log out
        </button>
      </div>
    </aside>
  );
}
export default SideBar;
