import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectAuthState } from "../features/auth/authSlice";

const RequireAuth = ({ allowedRoles }) => {
  const auth = useSelector(selectAuthState);

  // console.log("auth", auth.roles);
  const location = useLocation();

  return auth?.roles?.find((role) => allowedRoles?.includes(role)) ? (
    <Outlet />
  ) : auth?.user ? (
    <Navigate to="/unauthorized" state={{ from: location }} replace />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
