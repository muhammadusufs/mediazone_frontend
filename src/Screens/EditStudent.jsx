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
import { Link, useParams } from "react-router-dom";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import { useDispatch, useSelector } from "react-redux";
import StudentService from "../services/StudentService";
import { checkStudent, studentFail } from "../states/StudentSlice";

const EditStudent = () => {
  const { student_id } = useParams();
  const { student } = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const [progress, setProgress] = useState(0);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(false);

  const [studentStatus, setStudentStatus] = useState(
    student ? (student.student_info.student.status === "1" ? true : false) : ""
  );

  const [studentName, setStudentName] = useState(
    student ? student.student_info.student.name : ""
  );

  const [studentPhone, setStudentPhone] = useState(
    student ? student.student_info.student.phone : ""
  );

  const [studentMessage, setStudentMessage] = useState(
    student ? student.student_info.student.sms_service : false
  );

  const handleMessage = (ttype, msg) => {
    setAlertType(ttype);
    setAlertMessage(msg);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCheckbox = () => {
    setStudentMessage(!studentMessage);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setProgress(10);
    setSubmitBtn(true);

    try {
      if (student) {
        setProgress(80);
        const response = await StudentService.update_student(
          student.student_info.student.id,
          studentName,
          studentPhone,
          studentMessage
        );
        if (response === 200) {
          setAlertMessage("O'quvchi ma'lumotlari yangilandi");
          setAlertType("success");
          setOpen(true);
        }
      } else {
        throw "O'quvchi topilmadi.";
      }
    } catch (error) {
      setProgress(80);
      setAlertType("error");
      setAlertMessage(error);
      setOpen(true);
    }

    setProgress(100);
    setSubmitBtn(false);
  };

  useEffect(() => {
    const getStudent = async (student_id) => {
      setProgress(15);
      try {
        setProgress(75);
        const response = await StudentService.check_student(student_id);
        dispatch(checkStudent(response.data));
        setStudentName(response.data.student_info.student.name);
        setStudentPhone(response.data.student_info.student.phone);
        setStudentStatus(response.data.student_info.student.status);
        setStudentMessage(response.data.student_info.student.sms_service);
        handleMessage("success", `O'quvchi ma'lumotlari olindi`);
        setProgress(100);
      } catch (error) {
        setProgress(80);
        dispatch(studentFail(error.response.data));
        setProgress(100);
        handleMessage("error", `Xatolik, ${error.response.data}`);
      }
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
            to="/casher/informations/"
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
                value={studentName}
                onInput={(e) => setStudentName(e.target.value)}
                helperText={"Foydalanuvchi ismi, familiyasi"}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Telefon raqam"
                value={studentPhone}
                onInput={(e) => setStudentPhone(e.target.value)}
                helperText={"Foydalanuvchi telefon raqami"}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={studentMessage}
                      onChange={handleCheckbox}
                    />
                  }
                  label="SMS xizmati"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Button
            disabled={submitBtn}
            type="submit"
            variant="contained"
            sx={{ my: 1 }}
          >
            Saqlash
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

export default EditStudent;
