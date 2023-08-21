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
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";

import { teacherStart, teacherSuccess } from "../states/TeacherSlice";
import TeacherService from "../services/TeacherService";
import GroupService from "../services/GroupService";
import { useDispatch, useSelector } from "react-redux";

const InsertGroup = () => {
  const { teachers } = useSelector((state) => state.teachers);
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
      const res = await GroupService.insert_group(
        groupName,
        groupCost,
        groupTeacher,
        groupSubject,
        user.company
      );
      await getStats();
      setProgress(80);
      handleMessage("success", "Yangi guruh ochildi");
      setGroupName("");
      setGroupCost("");
      setGroupTeacher("");
      setGroupSubject("");

      setTimeout(() => {
        navigate("/casher/data/");
      }, 1500);
    } catch (error) {
      setProgress(80);
      handleMessage("error", "Xatolik, qaytadan urining");
    }
    setProgress(100);
    setSubmitBtn(false);
  };

  const getStats = async () => {
    setProgress(25);
    dispatch(teacherStart());
    try {
      setProgress(35);
      const t = await TeacherService.get_teachers();
      dispatch(teacherSuccess(t.data));
      setProgress(80);
    } catch (error) {
      setProgress(35);
      handleMessage("Xatolik, qaytadan urining");
      setProgress(80);
    }

    setProgress(100);
  };

  useEffect(() => {
    getStats();
  }, []);

  const subjects = [
    {
      value: "1",
      label: "Arab tili",
    },
    {
      value: "2",
      label: "Ingliz tili",
    },
    {
      value: "3",
      label: "Matematika",
    },
    {
      value: "4",
      label: "Biologiya",
    },
    {
      value: "5",
      label: "IT(ayti)",
    },
    {
      value: "6",
      label: "Tarix",
    },
    {
      value: "7",
      label: "Kimyo",
    },
    {
      value: "8",
      label: "Mental Arifmetika",
    },
    {
      value: "9",
      label: "Ona tili",
    },
    {
      value: "10",
      label: "Rus tili",
    },
    {
      value: "11",
      label: "Boshlang'ich ta'lim",
    },
  ];

  return (
    <Layout progress={progress} url="informations">
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
            to="/casher/data"
          >
            <FeedOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Ma'lumotlar
          </Link>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            Guruh ochish
          </Typography>
        </Breadcrumbs>
      </div>

      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12} md={6}>
              <TextField
                label={"Guruh nomi"}
                required
                helperText={"Guruh nomi va hkz."}
                fullWidth
                value={groupName}
                onInput={(e) => setGroupName(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                label={"O'qituvchi"}
                helperText={"Guruh o'qituvchisi"}
                required
                fullWidth
                value={groupTeacher}
                onChange={(e) => setGroupTeacher(e.target.value)}
                sx={{ mb: 2 }}
                select
              >
                {teachers &&
                  teachers.map((teacher) => (
                    <MenuItem key={teacher.id} value={teacher.id}>
                      {teacher.name}
                    </MenuItem>
                  ))}
              </TextField>
            </Grid>
            <Grid item sm={12} xs={12} md={6}>
              <TextField
                label={"Guruh narxi"}
                helperText={"Guruh narxi"}
                required
                fullWidth
                value={groupCost}
                onChange={(e) => setGroupCost(e.target.value)}
                sx={{ mb: 2 }}
                type="number"
              />

              <TextField
                label={"Guruh fani"}
                helperText={"Guruhda o'ganiladigan fan"}
                fullWidth
                value={groupSubject}
                onChange={(e) => setGroupSubject(e.target.value)}
                sx={{ mb: 2 }}
                required
                select
              >
                {subjects.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </TextField>
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

export default InsertGroup;
