import { Route, useLocation, Routes } from "react-router-dom";
import Signup from "./pages/auth/signup/page";
import DashboardPage from "./pages/dashboard/main";
import Login from './pages/auth/login/admin/page';
const PagesRoutes = () => {
  const location = useLocation();

  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/dashboard" element={<DashboardPage />} />
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
};

export default PagesRoutes;
