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
  Divider,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Snackbar,
  Alert,
} from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import { useDispatch, useSelector } from "react-redux";
import TeacherService from "../services/TeacherService";
import { checkTeacher, setTeacherStats } from "../states/TeacherSlice";

const EditTeacher = () => {
  const { teacher_id } = useParams();
  const { teacher } = useSelector((state) => state.teachers);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [progress, setProgress] = useState(0);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(false);

  const [teacherName, setTeacherName] = useState(teacher ? teacher.name : "");

  const [teacherPhone, setTeacherPhone] = useState(
    teacher ? teacher.phone : ""
  );

  const handleMessage = (ttype, msg) => {
    setAlertType(ttype);
    setAlertMessage(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn(true);

    setProgress(25);
    try {
      setProgress(35);
      const response = await TeacherService.update_teacher(
        teacher_id,
        teacherName,
        teacherPhone
      );
      handleMessage("success", "O'qituvchi ma'lumotlari yangilandi");
      setTimeout(() => {
        navigate(`/casher/teachers/${teacher_id}`);
      }, 1000);
    } catch (error) {
      handleMessage("error", "Xatolik, qaytadan urining");
    }
    setSubmitBtn(false);
  };

  const getTeacher = async (teacher_id) => {
    setProgress(25);
    try {
      setProgress(35);
      const response = await TeacherService.get_teacher(teacher_id);
      dispatch(checkTeacher(response.data));
      if (response.status === 200) {
        const stats = await TeacherService.get_teacher_stats(teacher_id);
        dispatch(setTeacherStats(stats.data));
      }
      setProgress(80);
    } catch (error) {
      setProgress(35);
      handleMessage("error", "Xatolik, qaytadan urining");
      setProgress(80);
    }
    setProgress(100);
  };

  useEffect(() => {
    getTeacher(teacher_id);
  }, [teacher_id]);

  return (
    <Layout url="teachers" progress={progress}>
      <div style={{ marginTop: "8px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link style={{ display: "flex", alignItems: "center" }} to="/casher/">
            <AddHomeOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Bosh sahifa
          </Link>

          <Link
            style={{ display: "flex", alignItems: "center" }}
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
            <SchoolOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {teacher && teacher.name}
          </Typography>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            O'zgartirish
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
            O'quvchi ma'lumotlari
          </h3>
        </Divider>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container columnSpacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Ism, Familiya"
                fullWidth
                value={teacherName}
                onInput={(e) => setTeacherName(e.target.value)}
                helperText={"O'qituvchi ismi, familiyasi"}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Telefon raqam"
                value={teacherPhone}
                onInput={(e) => setTeacherPhone(e.target.value)}
                helperText={"O'qituvchi telefon raqami"}
              />
            </Grid>
          </Grid>
          <Button
            disabled={submitBtn}
            type="submit"
            variant="contained"
            sx={{ my: 1 }}
          >
            O'zgartirish
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

export default EditTeacher;
