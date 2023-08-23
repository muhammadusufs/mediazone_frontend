// Components
import { useState, useEffect } from "react";
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
  Snackbar,
  Alert,
} from "@mui/material";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { useDispatch, useSelector } from "react-redux";
import { checkTeacher, setTeacherStats } from "../states/TeacherSlice";
import TeacherService from "../services/TeacherService";

const TeacherAddFine = () => {
  const { teacher_id } = useParams();

  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [amount, setAmount] = useState(0);
  const [comment, setComment] = useState("");
  const [submitBtn, setSubmitBtn] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, teacher, stats } = useSelector((state) => state.teachers);

  const getTeacher = async (teacher_id) => {
    setSubmitBtn(true);
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
      setSubmitBtn(false);
    } catch (error) {
      setProgress(35);
      handleMessage("error", "Xatolik, qaytadan urining");
      setProgress(80);
    }
    setProgress(100);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitBtn(true);
    setProgress(25);
    try {
      setProgress(35);
      const resp = await TeacherService.add_fine(teacher_id, amount, comment);
      if (resp === 201) {
        handleMessage("success", "Jarima qo'shildi");
        setTimeout(() => {
          navigate(`/casher/teachers/${teacher_id}`);
        }, 1000);
      }
    } catch (error) {
      handleMessage("error", "Xatolik, qaytadan urining");
    }
    setSubmitBtn(false);
  };

  useEffect(() => {
    getTeacher(teacher_id);
  }, [teacher_id]);

  const handleMessage = (ttype, msg) => {
    setAlertType(ttype);
    setAlertMessage(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [sid, setSid] = useState("");
  const handle = (value) => {
    setSid(value);
  };

  return (
    <Layout url="teachers" progress={progress}>
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
            <AccountCircleOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            O'qituvchilar
          </Link>

          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to={`/casher/teachers/${teacher_id}`}
          >
            <AccountCircleOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {teacher && teacher.name}
          </Link>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            Jarima qo'shish
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
            Jarima yozish
          </h3>
        </Divider>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                type="number"
                value={amount}
                onInput={(e) => setAmount(e.target.value)}
                label="Jarima miqdori"
                fullWidth
                helperText={"Berilgan jarima miqdori"}
              />
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                value={comment}
                onInput={(e) => setComment(e.target.value)}
                label="Izoh"
                fullWidth
                helperText={"Izoh yozib qoldiring"}
              />
            </Grid>
          </Grid>
          <Button
            disabled={submitBtn}
            type="submit"
            variant="contained"
            sx={{ my: 1 }}
          >
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

export default TeacherAddFine;
