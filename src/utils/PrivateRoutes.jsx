// Hooks
import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";
const PrivateRoutes = ({ account }) => {
  const user = useSelector((state) => state.auth);

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
