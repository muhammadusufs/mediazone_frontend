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
  Skeleton,
} from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import SchoolOutlinedIcon from "@mui/icons-material/SchoolOutlined";
import { Link, useParams } from "react-router-dom";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import { useDispatch, useSelector } from "react-redux";
import StudentService from "../services/StudentService";
import {
  checkStudent,
  checkStudentFail,
  studentFail,
} from "../states/StudentSlice";

const DeleteStudent = () => {
  const { student_id } = useParams();
  const { student, loading } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const [progress, setProgress] = useState(0);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(false);

  const handleMessage = (ttype, msg) => {
    setAlertType(ttype);
    setAlertMessage(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async (id) => {
    setSubmitBtn(true);
    setProgress(35);
    try {
      const response = await StudentService.delete_student(id);
      setProgress(65);
      if (response === 204) {
        dispatch(checkStudentFail("deleted"));
        setProgress(80);
        handleMessage("success", "O'quvchi dasturdan olib tashlandi");
      }
    } catch (error) {
      handleMessage("error", "Qaytadan urining");
      setProgress(80);
    }
    setSubmitBtn(false);
    setProgress(100);
  };

  useEffect(() => {
    const getStudent = async (student_id) => {
      setSubmitBtn(true);
      setProgress(15);
      try {
        setProgress(75);
        const response = await StudentService.check_student(student_id);
        dispatch(checkStudent(response.data));
        handleMessage("success", `O'quvchi ma'lumotlari olindi`);
        setProgress(100);
      } catch (error) {
        setProgress(80);
        dispatch(studentFail(error.response.data));
        setProgress(100);
        handleMessage("error", `Xatolik, ${error.response.data}`);
      }
      setSubmitBtn(false);
    };
    getStudent(student_id);
  }, [student_id, dispatch]);

  return (
    <Layout url="informations" progress={progress}>
      <div style={{ marginTop: "8px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link style={{ display: "flex", alignItems: "center" }} to="/casher/">
            <AddHomeOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Bosh sahifa
          </Link>

          <Link
            style={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to="/casher/data/"
          >
            <FeedOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Ma'lumotlar
          </Link>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            <SchoolOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {student && student.student_info.student.name}
          </Typography>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            O'chirish
          </Typography>
        </Breadcrumbs>
      </div>

      {loading ? (
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ marginTop: 3 }}
          height={120}
        />
      ) : student ? (
        <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
          <h3 style={{ marginBottom: "10px" }}>
            Dasturdan <b>{student && student.student_info.student.name}ni</b>{" "}
            o'chirmoqchimisiz ? <br />
          </h3>
          <Button
            disabled={submitBtn}
            variant="contained"
            sx={{ mr: 2 }}
            color="error"
            onClick={() =>
              handleDelete(student && student.student_info.student.id)
            }
          >
            O'chirish
          </Button>
          <Link to={"/casher/"}>
            <Button color="dark">Ortga</Button>
          </Link>
        </Paper>
      ) : (
        <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
          <h3 style={{ marginBottom: "10px" }} color="error">
            O'quvchi o'chirilgan
          </h3>
          <Link to={"/casher/"}>
            <Button color="dark">Ortga</Button>
          </Link>
        </Paper>
      )}

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

export default DeleteStudent;
