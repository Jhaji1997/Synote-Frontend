import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import LandingPage from "../../pages/landingPage.jsx";

function HomeRoute() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? (
    <Navigate to={"/dashboard"} replace />
  ) : (
    <LandingPage />
  );
}

export default HomeRoute;
