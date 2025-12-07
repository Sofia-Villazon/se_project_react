import "./SideBar.css";
import { user } from "../../utils/constants";

function SideBar() {
  return (
    <aside className="side-bar">
      <div className="side-bar__user-container">
        <img src={user.avatar} alt={user.name} className="side-bar__avatar" />
        <p className="side-bar__user-name">{user.name}</p>
      </div>
    </aside>
  );
}
export default SideBar;
