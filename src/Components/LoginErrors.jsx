// Library imports
import { useSelector } from "react-redux";

// MUI components
import { Alert } from "@mui/material";

const LoginErrors = () => {
  const errors = useSelector((state) => state.auth.errors);

  return (
    <div>
      {errors ? (
        <Alert variant="outlined" severity="error">
          Login yoki parol xato
        </Alert>
      ) : (
        ""
      )}
    </div>
  );
};

export default LoginErrors;
