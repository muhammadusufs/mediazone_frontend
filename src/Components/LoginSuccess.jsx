// Library imports
import { useSelector } from "react-redux";

// MUI components
import { Alert } from "@mui/material";

const LoginSuccess = () => {
  return (
    <div>
      <Alert variant="outlined" severity="success">
        Muvaffaqiyatli, yo'naltirilmoqda ...
      </Alert>
    </div>
  );
};

export default LoginSuccess;
