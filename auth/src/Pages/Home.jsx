import { useNavigate, Link } from "react-router-dom";
import { useSendLogoutMutation } from "../features/auth/authApiSlice";

const Home = () => {
  const [sendLogout] = useSendLogoutMutation();
  const navigate = useNavigate();

  const logout = async () => {
    // if used in more components, this should be in context
    // axios to /logout endpoint
    try {
      await sendLogout().unwrap();

      navigate("/linkpage");
    } catch (error) {
      if (error.originalStatus === 404) {
        console.error("Endpoint not found. Verify the backend route.");
      } else {
        console.error("Error logging out:", error);
      }
    }
  };

  return (
    <section>
      <h1>Home</h1>
      <br />
      <p>You are logged in!</p>
      <br />
      <Link to="/editor">Go to the Editor page</Link>
      <br />
      <Link to="/admin">Go to the Admin page</Link>
      <br />
      <Link to="/lounge">Go to the Lounge</Link>
      <br />
      <br />
      <Link to="/users">Go to the users</Link>
      <br />
      <Link to="/linkpage">Go to the link page</Link>
      <div className="flexGrow">
        <button onClick={logout}>Sign Out</button>
      </div>
    </section>
  );
};

export default Home;
