import LandingPage from "./pages/landingPage.jsx";
import SignUpPage from "./pages/signUpPage.jsx";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage.jsx";
import AvatarUpdatePage from "./pages/avatarUpdatePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/avatar" element={<AvatarUpdatePage />} />
    </Routes>
  );
}

export default App;
