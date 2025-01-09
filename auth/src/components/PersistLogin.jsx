import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useRefreshMutation } from "../features/auth/authApiSlice";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../features/auth/authSlice";

const PersistLogin = () => {
  const [refresh] = useRefreshMutation();

  const [isLoading, setIsLoading] = useState(true);
  const auth = useSelector(selectCurrentUser);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      try {
        await refresh().unwrap();
      } catch (err) {
        console.error(err);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.token ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.Token)}`);
  }, [isLoading]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
