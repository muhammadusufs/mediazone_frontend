// Components
import { useState } from "react";
import Layout from "../Components/Layout";
import {
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  TextField,
  Button,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { Link, useNavigate } from "react-router-dom";
import AuthService from "../services/AuthService";
import { useDispatch, useSelector } from "react-redux";

const Settings = () => {
  const { user } = useSelector((state) => state.auth);

  const [sid, setSid] = useState("");
  const [name, setName] = useState(user ? user.name : "");
  const [number, setNumber] = useState(user ? user.phone : "");
  const [progress, setProgress] = useState(0);
  const [btn, setBtn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleMessage = (ttype, msg) => {
    setAlertType(ttype);
    setAlertMessage(msg);
    setOpen(true);
  };

  const handle = (value) => {
    setSid(value);
  };

  const updateUser = async (e) => {
    e.preventDefault();
    setBtn(true);
    setProgress(25);
    try {
      setProgress(40);
      const response = await AuthService.updateUser(name, number);
      if (response.status === 200) {
        handleMessage("success", "Ma'lumotlar yangilandi");
        AuthService.logOut();
        setTimeout(() => {
          navigate("/login");
        });
      }
    } catch (error) {
      handleMessage("error", "Ushbu raqam orqali ro'yxatdan o'tilgan");
    }
    setBtn(false);
  };

  return (
    <Layout url="settings" progress={progress}>
      <div style={{ marginTop: "8px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            href="/"
          >
            <AddHomeOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Bosh sahifa
          </Link>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            <SettingsOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Sozlamalar
          </Typography>
        </Breadcrumbs>
      </div>

      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Divider>
          <h3
            style={{
              color: "#3d3d3d",
              marginTop: "5px",
              marginBottom: "20px",
            }}
          >
            Foydalanuvchi ma'lumotlari
          </h3>
        </Divider>
        <form onSubmit={updateUser}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Ism, Familiya"
                fullWidth
                helperText={"Foydalanuvchi ismi, familiyasi"}
                value={name}
                onInput={(e) => setName(e.target.value)}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Telefon raqam, login"
                helperText={"Foydalanuvchi logini"}
                value={number}
                onInput={(e) => setNumber(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            disabled={btn}
            variant="contained"
            sx={{ my: 1 }}
          >
            Saqlash
          </Button>
        </form>
      </Paper>

      {/* <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Divider>
          <h3
            style={{
              color: "#3d3d3d",
              marginTop: "5px",
              marginBottom: "20px",
            }}
          >
            Parolni o'zgartirish
          </h3>
        </Divider>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={4}>
            <TextField
              label="Hozirgi parol"
              fullWidth
              helperText={"Hozirgi parolni kiriting"}
              type="password"
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TextField
              type="password"
              fullWidth
              label="Hozirgi parolni takrorlang"
              helperText={"Hozirgi parolni takror kiriting"}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <TextField
              fullWidth
              label="Yangi parol"
              helperText={"Yangi parolni kiriting"}
            />
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ my: 1 }}>
          O'zgartirish
        </Button>
      </Paper> */}
      <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
    </Layout>
  );
};

export default Settings;
