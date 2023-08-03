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
        <Grid container>
          <Grid item xs={12} sm={12} md={6}>
            <TextField label="Ism, Familiya" helperText={"Ism, Familiya"} />
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default Settings;
