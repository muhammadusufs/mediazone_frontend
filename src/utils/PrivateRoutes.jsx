// Hooks
import { useSelector } from "react-redux";

import { Navigate, Outlet, useNavigate } from "react-router-dom";
import { getItem } from "./storage";
import { useEffect } from "react";
const PrivateRoutes = ({ account }) => {
  const user = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    const token = getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {user.loading ? (
        <h1>Loading ...</h1>
      ) : !user.loading && user.authenticated && user.user.level === account ? (
        <Outlet />
      ) : (
        <Navigate to="/login" />
      )}
    </>
  );
};

export default PrivateRoutes;
