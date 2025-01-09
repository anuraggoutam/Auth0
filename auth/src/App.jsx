import Register from "./Pages/Register";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Layout from "./Pages/Layout";
import Editor from "./Pages/Editor";
import Admin from "./Pages/Admin";
import Missing from "./Pages/Missing";
import Unauthorized from "./Pages/Unauthorized";
import Lounge from "./Pages/Lounge";
import LinkPage from "./Pages/LinkPage";
import RequireAuth from "./utils/RequireAuth";
import { Routes, Route } from "react-router-dom";
import PersistLogin from "./utils/PersistLogin";
import UsersList from "./features/users/UsersList";
const ROLES = {
  User: 2001,
  Editor: 1984,
  Admin: 5150,
};

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* public routes */}
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="linkpage" element={<LinkPage />} />
        <Route path="unauthorized" element={<Unauthorized />} />

        {/* we want to protect these routes */}
        <Route element={<PersistLogin />}>
          <Route element={<RequireAuth allowedRoles={[ROLES.User]} />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Editor]} />}>
            <Route path="editor" element={<Editor />} />
          </Route>

          <Route element={<RequireAuth allowedRoles={[ROLES.Admin]} />}>
            <Route path="admin" element={<Admin />} />
          </Route>

          <Route
            element={<RequireAuth allowedRoles={[ROLES.Editor, ROLES.Admin]} />}
          >
            <Route path="users" element={<UsersList />} />
            <Route path="lounge" element={<Lounge />} />
          </Route>
        </Route>
        {/* catch all */}
        <Route path="*" element={<Missing />} />
      </Route>
    </Routes>
  );
}

export default App;
