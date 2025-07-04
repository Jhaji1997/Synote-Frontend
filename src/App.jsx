import NotFound from "./pages/notFound.jsx";
import SignUpPage from "./pages/signUpPage.jsx";
import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/loginPage.jsx";
import AvatarUpdatePage from "./pages/avatarUpdatePage.jsx";
import ProtectedRoute from "./components/auth/protectedRoute.jsx";
import HomeRoute from "./components/auth/homeRoute.jsx";
import DashboardPage from "./pages/dashboardPage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomeRoute />} />

      <Route path="/register" element={<SignUpPage />} />
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/avatar" element={<AvatarUpdatePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
