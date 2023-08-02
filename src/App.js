import { ThemeProvider, createTheme } from "@mui/material";
import Home from "./Screens/Home";
import Login from "./Screens/Login";
import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./utils/PrivateRoutes";

// Hooks
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

// Local
import { getItem, removeItem } from "./utils/storage";

// Slices
import { getUser, loginSuccess } from "./states/AuthSlices";

// Services
import AuthService from "./services/AuthService";
import jwt_decode from "jwt-decode";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ffcd86",
      light: "#ffdfb3",
      dark: "#ffbc5c",
      extraLight: "#fff1ed",
    },
    secondary: {
      main: "#fff",
      light: "#f1f1f1",
      dark: "#f5f5f5",
    },
    dark: {
      main: "#3d3d3d",
    },
  },
  typography: {
    fontFamily: "Poppins",
  },
});

function App() {
  const dispatch = useDispatch();

  const setUser = async () => {
    try {
      const t = getItem("token");
      const response = await AuthService.getUser(jwt_decode(t).user_id);
      dispatch(loginSuccess(getItem("token")));
      dispatch(getUser(response.data));
    } catch (error) {
      removeItem("token");
      console.log(error);
    }
  };

  useEffect(() => {
    const token = getItem("token");
    if (token) {
      setUser();
    }
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route element={<PrivateRoutes account="casher" />}>
          <Route path="casher/" element={<Home />} />
        </Route>
        <Route element={<Login />} path="/login"></Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
