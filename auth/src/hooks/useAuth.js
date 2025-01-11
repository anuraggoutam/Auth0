import { useSelector } from "react-redux";
import { selectCurrentToken } from "../features/auth/authSlice";
import { jwtDecode } from "jwt-decode";
const useAuth = () => {
  const token = useSelector(selectCurrentToken);

  let isAdmin = false;
  let isUser = false;
  let isEditor = false;

  let status = "Employee";

  if (token) {
    const decoded = jwtDecode(token);
    const { username, roles } = decoded.UserInfo;
    console.log("decoded", decoded);
    isUser = roles.includes("User");
    isAdmin = roles.includes("Admin");
    isEditor = roles.includes("Editor");

    if (isUser) status = "User";
    if (isAdmin) status = "Admin";
    if (isEditor) status = "Editor";

    return { username, roles, status, isUser, isAdmin, isEditor };
  }

  return { username: "", roles: [], isUser, isAdmin, isEditor, status };
};

export default useAuth;
