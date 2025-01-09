import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectAuthState } from "../features/auth/authSlice";
import { useRefreshMutation } from "../features/auth/authApiSlice";

const PersistLogin = () => {
  const auth = useSelector(selectAuthState);
  const [isLoading, setIsLoading] = useState(true);
  const refresh = useRefreshMutation();

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh().unwrap();
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    // persist added here AFTER tutorial video
    // Avoids unwanted call to verifyRefreshToken
    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);
  }, []);

  useEffect(() => {
    console.log(`isLoading: ${isLoading}`);
    console.log(`aT: ${JSON.stringify(auth?.accessToken)}`);
  }, [isLoading]);

  return <>{isLoading ? <p>Loading...</p> : <Outlet />}</>;
};

export default PersistLogin;
