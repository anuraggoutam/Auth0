import { useLocation, Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth.js";

const RequireAuth = ({ allowedRoles }) => {
  const { roles } = useAuth();
  const { username } = useAuth();

  // console.log("auth", auth.roles);
  const location = useLocation();

  return roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : username ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
