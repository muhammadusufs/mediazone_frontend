// Hooks
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import jwt_decode from "jwt-decode";

// Slices
import {
  loginStart,
  loginSuccess,
  loginFail,
  getUser,
} from "../states/AuthSlices";

// Services
import AuthService from "../services/AuthService";
import LoginErrors from "../Components/LoginErrors";
import LoginSuccess from "../Components/LoginSuccess";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";
import brand from "../assets/imgs/logo.png";

const Login = () => {
  // hook variables
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // states
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [authLoading, setAuthLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // redux states
  const authenticated = useSelector((state) => state.auth.authenticated);

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch(loginStart());
    setAuthLoading(true);

    try {
      const response = await AuthService.login(username, password);
      dispatch(loginSuccess(response.data.access));
      const user = await AuthService.getUser(
        jwt_decode(response.data.access).user_id
      );
      setSuccess(true);
      dispatch(getUser(user.data));
      if (user.data) {
        if (user.data.level === "casher") {
          navigate("/casher/");
        }
      }
    } catch (error) {
      dispatch(loginFail(error.response.data));
    }

    setAuthLoading(false);
  };

  return (
    <Container component="main" maxWidth="lg">
      <Box
        sx={{
          marginTop: 8,
        }}
      >
        <Grid container>
          <CssBaseline />
          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: (t) =>
                t.palette.mode === "light"
                  ? t.palette.grey[50]
                  : t.palette.grey[900],
            }}
          >
            <img style={{ width: "100%" }} src={brand} alt="mediazone" />
          </Grid>
          <Grid
            item
            xs={12}
            sm={8}
            md={5}
            component={Paper}
            elevation={6}
            square
          >
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography component="h1" variant="h5">
                Kabinetga kirish
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 1 }}
              >
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Login"
                  name="username"
                  value={username}
                  onInput={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  value={password}
                  onInput={(e) => setPassword(e.target.value)}
                  name="password"
                  label="Parol"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />

                <Button
                  type="submit"
                  disabled={authLoading}
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Kirish
                </Button>

                {success && <LoginSuccess />}
                <LoginErrors />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Login;
