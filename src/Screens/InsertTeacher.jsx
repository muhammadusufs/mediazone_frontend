// Components
import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import {
  Grid,
  Paper,
  Typography,
  Breadcrumbs,
  TextField,
  Button,
  MenuItem,
  Snackbar,
  Alert,
} from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { Link, useNavigate } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";

import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";

import { teacherStart, teacherSuccess } from "../states/TeacherSlice";
import TeacherService from "../services/TeacherService";
import GroupService from "../services/GroupService";
import { useDispatch, useSelector } from "react-redux";

const InsertTeacher = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [groupName, setGroupName] = useState("");
  const [groupCost, setGroupCost] = useState("");
  const [progress, setProgress] = useState(0);

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [groupTeacher, setGroupTeacher] = useState("");
  const [groupSubject, setGroupSubject] = useState("");

  const [teacherName, setTeacherName] = useState("");
  const [teacherPassword, setTeacherPassword] = useState("");
  const [teacherPhone, setTeacherPhone] = useState("");

  const [submitBtn, setSubmitBtn] = useState(false);

  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleMessage = (ttype, msg) => {
    setAlertType(ttype);
    setAlertMessage(msg);
    setOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn(true);
    setProgress(25);
    try {
      setProgress(40);
      const res = await TeacherService.create_teacher(
        teacherName,
        teacherPhone,
        teacherPassword
      );
      setProgress(80);
      handleMessage("success", "O'qituvchi kiritildi");
      setTeacherName("");
      setTeacherPassword("");
      setTeacherPhone("");

      setTimeout(() => {
        navigate("/casher/teachers/");
      }, 1500);
    } catch (error) {
      setProgress(80);
      if (error.code === "ERR_BAD_RESPONSE") {
        handleMessage("error", "Ushbu raqam bilan oldin ro'yxatdan o'tilgan");
      } else {
        handleMessage("error", "Xatolik, qaytadan urining");
      }
    }
    setProgress(100);
    setSubmitBtn(false);
  };

  return (
    <Layout progress={progress} url="teachers">
      <div style={{ marginTop: "8px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to="/casher/"
          >
            <AddHomeOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Bosh sahifa
          </Link>

          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to="/casher/teachers/"
          >
            <FeedOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            O'qituvchilar
          </Link>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            O'qituvchi kiritish
          </Typography>
        </Breadcrumbs>
      </div>

      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12} md={12}>
              <TextField
                label={"F.I.Sh."}
                required
                helperText={"O'qituvchi ism, familiyasi"}
                fullWidth
                value={teacherName}
                onInput={(e) => setTeacherName(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                label={"Telefon raqam"}
                helperText={"992225599 formatda"}
                required
                fullWidth
                value={teacherPhone}
                onChange={(e) => setTeacherPhone(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                label={"Kabinet paroli"}
                helperText={"O'qituvchi kabineti uchun parol kiriting"}
                required
                fullWidth
                value={teacherPassword}
                onChange={(e) => setTeacherPassword(e.target.value)}
                sx={{ mb: 2 }}
                type="password"
              />
            </Grid>
          </Grid>

          <Button type="submit" disabled={submitBtn} variant="contained">
            Kiritish
          </Button>
        </form>
      </Paper>
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

export default InsertTeacher;
