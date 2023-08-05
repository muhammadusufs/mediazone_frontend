// Components
import { useState } from "react";
import Layout from "../Components/Layout";
import {
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  TextField,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  IconButton,
  MenuItem,
  Divider,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { Link } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

const Settings = () => {
  const [sid, setSid] = useState("");
  const handle = (value) => {
    setSid(value);
  };

  return (
    <Layout url="settings">
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
        <Grid container spacing={3}>
          <Grid item xs={12} sm={12} md={6}>
            <TextField
              label="Ism, Familiya"
              fullWidth
              helperText={"Foydalanuvchi ismi, familiyasi"}
            />
          </Grid>

          <Grid item xs={12} sm={12} md={6}>
            <TextField
              fullWidth
              label="Login"
              helperText={"Foydalanuvchi logini"}
            />
          </Grid>
        </Grid>
        <Button variant="contained" sx={{ my: 1 }}>
          Saqlash
        </Button>
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
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
      </Paper>
    </Layout>
  );
};

export default Settings;
