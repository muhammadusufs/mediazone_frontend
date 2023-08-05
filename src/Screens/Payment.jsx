// Components
import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import {
  TextField,
  Paper,
  Typography,
  Button,
  Skeleton,
  Snackbar,
  Alert,
  Breadcrumbs,
} from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";

import PaidOutlinedIcon from "@mui/icons-material/PaidOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  checkStudent,
  studentFail,
  studentStart,
} from "../states/StudentSlice";
import StudentService from "../services/StudentService";
import GroupService from "../services/GroupService";
import { Link, useNavigate, useParams } from "react-router-dom";
import { checkGroup } from "../states/GroupSlice";

const Payment = () => {
  const dispatch = useDispatch();
  const { student_id, month, group_id } = useParams();
  const navigate = useNavigate();

  const { loading, student, errors } = useSelector((state) => state.students);
  const { group } = useSelector((state) => state.groups);
  const { user } = useSelector((state) => state.auth);
  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [button, setButton] = useState(false);
  const [amount, setAmount] = useState([]);
  const [subscribed, setSubscribed] = useState(false);

  const months = [
    "Yanvar",
    "Fevral",
    "Mart",
    "Aprel",
    "May",
    "Iyun",
    "Iyul",
    "Avgust",
    "Sentyabr",
    "Oktyabr",
    "Noyabr",
    "Dekabr",
  ];

  const handleClose = () => {
    setOpen(false);
  };

  const handleMessage = (ttype, msg) => {
    setAlertType(ttype);
    setAlertMessage(msg);
    setOpen(true);
  };

  const handleCheckStudent = async () => {
    if (!student_id) {
      handleMessage("error", `Xatolik, ID kiritilmagan`);
      navigate("/casher/");
    } else {
      setProgress(15);
      dispatch(studentStart());

      try {
        setProgress(75);
        const response = await StudentService.check_student(student_id);
        const g = await GroupService.check_group(group_id);
        const is_subscribed = await GroupService.is_subscribed(
          group_id,
          month,
          student_id
        );

        if (is_subscribed.data) {
          setSubscribed(is_subscribed.data);
        }

        dispatch(checkStudent(response.data));
        dispatch(checkGroup(g.data));
        handleMessage("success", `O'quvchi ma'lumotlari olindi`);
        setProgress(100);
      } catch (error) {
        setProgress(80);
        dispatch(studentFail(error.response.data));
        setProgress(100);
        handleMessage("error", `Xatolik, ${error.response.data}`);
      }
    }
  };

  const handleAddSubscription = async () => {
    console.log("Salom");
    if (amount !== "") {
      setButton(true);
      try {
        const response = await StudentService.add_subscription(
          group_id,
          student_id,
          amount,
          month
        );
        if (response.data) {
          handleMessage(
            "success",
            `${month[parseFloat(month) - 1]} oyi uchun to'lov kiritildi`
          );
        }

        await handleCheckStudent();
      } catch (error) {
        handleMessage("error", `Xatolik, ${error.response.data}`);
        console.log(group_id, student_id, amount, month);
      }
      setButton(false);
    } else {
      handleMessage("error", "Xatolik, pul miqdori kiritilmagan");
    }
  };

  useEffect(() => {
    handleCheckStudent(student_id);
  }, [student_id]);

  return (
    <Layout url="home" progress={progress}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link style={{ display: "flex", alignItems: "center" }} to="/casher/">
            <AddHomeOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Bosh sahifa
          </Link>

          <Link
            style={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to="/casher/"
          >
            <AccountCircleOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            {student && student.student_info.student.name}
          </Link>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            <PaidOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            To'lov
          </Typography>
        </Breadcrumbs>
      </div>
      {loading && errors === null && student === null && (
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ marginTop: 3 }}
          height={220}
        />
      )}

      {!loading && errors !== null && (
        <>
          <Typography variant="h4" color={"error"}>
            Xatolik, o'quvchi topilmadi
          </Typography>
        </>
      )}

      {!loading && errors === null && student !== null && (
        <>
          <Paper
            elevation={3}
            sx={{
              color: "#3d3d3d",
              padding: 3,
              marginTop: 3,
            }}
          >
            <Typography component={"h2"} variant="h3">
              {student && student.student_info.student.name}
            </Typography>
            <div style={{ marginTop: "10px", marginBottom: "10px" }}>
              <Typography variant="subtitle2">
                <b>Oy</b> {months[parseFloat(month) - 1]} <br />
                <b>Guruh</b> {group && group.name} <br />
                <b>O'qituvchi</b> {group && group.teacher_name} <br />
                <b>Narx</b> {group && parseFloat(group.cost).toLocaleString()}{" "}
                so'm
              </Typography>

              {subscribed ? (
                <Typography variant="h6" color={"#06d6a0"} mt={2}>
                  To'lov amalga oshirilgan
                </Typography>
              ) : (
                <>
                  <TextField
                    type="number"
                    sx={{ mt: 3, mb: 1 }}
                    autoComplete="off"
                    label="Guruh uchun to'lov miqdori"
                    value={amount}
                    onInput={(e) => setAmount(e.target.value)}
                    helperText={`Guruh narxi ${parseFloat(
                      group && group.cost
                    ).toLocaleString()} so'm`}
                  />
                  <div>
                    <Button
                      variant="contained"
                      onClick={handleAddSubscription}
                      disabled={button}
                    >
                      Saqlash
                    </Button>
                  </div>
                </>
              )}
            </div>
          </Paper>
        </>
      )}

      <Link to={"/casher/"} style={{ textDecoration: "none" }}>
        <Button sx={{ mt: 2 }} variant="contained" color="secondary">
          Ortga qaytish
        </Button>
      </Link>

      <Snackbar open={open} autoHideDuration={3000} onClick={handleClose}>
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

export default Payment;
