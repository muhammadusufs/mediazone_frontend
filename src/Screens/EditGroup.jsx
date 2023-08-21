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
import { checkGroup, checkGroupFail } from "../states/GroupSlice";
import GroupService from "../services/GroupService";
import { teacherStart } from "../states/TeacherSlice";

const EditGroup = () => {
  const { group_id } = useParams();
  const { group } = useSelector((state) => state.groups);
  const dispatch = useDispatch();

  const [progress, setProgress] = useState(0);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [open, setOpen] = useState(false);
  const [submitBtn, setSubmitBtn] = useState(false);

  const [groupName, setGroupName] = useState(group ? group.name : "");

  const [groupCost, setGroupCost] = useState(group ? group.cost : "");

  const [groupTeacher, setGroupTeacher] = useState(group ? group.teacher : "");

  const [groupSubject, setGroupSubject] = useState(group ? group.subject : "");

  const [groupStudents, setGroupStudents] = useState(
    group ? group.students : []
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
    //   e.preventDefault();
    //   setProgress(10);
    //   setSubmitBtn(true);
    //   try {
    //     if (student) {
    //       setProgress(80);
    //       const response = await StudentService.update_student(
    //         student.student_info.student.id,
    //         studentName,
    //         studentPhone,
    //         studentMessage
    //       );
    //       if (response === 200) {
    //         getStudent(student_id);
    //         setAlertMessage("O'quvchi ma'lumotlari yangilandi");
    //         setAlertType("success");
    //         setOpen(true);
    //       }
    //     } else {
    //       throw "O'quvchi topilmadi.";
    //     }
    //   } catch (error) {
    //     setProgress(80);
    //     setAlertType("error");
    //     setAlertMessage(error);
    //     setOpen(true);
    //   }
    //   setProgress(100);
    //   setSubmitBtn(false);
    // };
  };

   const getTeachers = async () => {
     setProgress(25);
     dispatch(teacherStart());
     try {
       setProgress(35);
       const response = await GroupService.get_groups_data();
       const t = await TeacherService.get_teachers();
       dispatch(teacherSuccess(t.data));
       dispatch(groupSuccess(response.data));
       setProgress(80);
     } catch (error) {
       setProgress(35);
       handleMessage("Xatolik, qaytadan urining");
       setProgress(80);
     }

     setProgress(100);
   };
  const getGroup = async (group_id) => {
    setProgress(15);
    try {
      setProgress(75);
      const response = await GroupService.check_group(group_id);
      dispatch(checkGroup(response.data));
      console.log(response.data);
      setGroupName(response.data.name);
      setGroupCost(response.data.cost);
      setGroupStudents(response.data.students);
      setGroupSubject(response.data.subject);
      setGroupTeacher(response.data.teacher);
      handleMessage("success", `Guruh ma'lumotlari olindi`);
      setProgress(100);
    } catch (error) {
      setProgress(80);
      dispatch(checkGroupFail(error.response.data));
      setProgress(100);
      handleMessage("error", `Xatolik, qaytadan urining`);
    }
  };

  useEffect(() => {
    getGroup(group_id);
  }, [group_id, dispatch]);

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
            {group && group.name}
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
            Guruh ma'lumotlari
          </h3>
        </Divider>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container columnSpacing={3}>
            <Grid item xs={12} sm={12} md={6}>
              <TextField
                label="Guruh nomi"
                fullWidth
                value={groupName}
                onInput={(e) => setGroupName(e.target.value)}
                helperText={"Guruh nomi, misol uchun: Guruh 1"}
              />

              <TextField
                label="Guruh nomi"
                fullWidth
                value={group}
                onInput={(e) => setGroupName(e.target.value)}
                helperText={"Guruh nomi, misol uchun: Guruh 1"}
              />
            </Grid>

            <Grid item xs={12} sm={12} md={6}>
              <TextField
                fullWidth
                label="Guruh narxi"
                value={groupCost}
                onInput={(e) => setGroupCost(e.target.value)}
                helperText={"Guruh uchun belgilangan narx (so'm)"}
              />
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

export default EditGroup;
