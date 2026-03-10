import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";

import CurrentUserContex from "../hooks/contexts/CurrentUserContext";

function ProtectedRoute({ children, anonymous = false }) {
  const location = useLocation();
  const from = location.state?.from || "/profile";

  const { isLoggedIn } = useContext(CurrentUserContex);
  // If you can visit without authorization, but you are already authorized
  if (anonymous && isLoggedIn) {
    // ...then go back the the path you came from
    return <Navigate to={from} />;
  }

  // If you need to be authorize to visit this path but you aren't logged in yet
  if (!anonymous && !isLoggedIn) {
    // ...then go to login page
    return <Navigate to="/" state={{ from: location }} />;
  }

  // if ok show the content
  return children;
}

export default ProtectedRoute;
