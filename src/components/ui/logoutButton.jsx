import Button from "./button.jsx";
import { logoutUser } from "../../store/authSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function LogoutButton() {
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  const handleLogout = async () => {
    const result = await dispatch(logoutUser());
    if (logoutUser.fulfilled.match(result)) {
      navigate("/login");
    }
  };

  return (
    <Button onClick={handleLogout} disabled={loading} isLoading={loading}>
      Logout
    </Button>
  );
}

export default LogoutButton