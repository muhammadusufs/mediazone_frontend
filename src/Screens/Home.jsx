// Components
import { useState } from "react";
import Layout from "../Components/Layout";
import {
  TextField,
  Paper,
  Grid,
  Typography,
  Chip,
  Button,
  Skeleton,
  Snackbar,
  Alert,
  CircularProgress,
  IconButton,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import PersonSearchOutlinedIcon from "@mui/icons-material/PersonSearchOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import barcode from "../assets/imgs/barcod.png";
import { useDispatch, useSelector } from "react-redux";
import {
  checkStudent,
  studentFail,
  studentStart,
} from "../states/StudentSlice";
import StudentService from "../services/StudentService";
import { Link } from "react-router-dom";

const Home = () => {
  const dispatch = useDispatch();

  const { loading, student, errors } = useSelector((state) => state.students);
  const { user } = useSelector((state) => state.auth);
  const [progress, setProgress] = useState(0);
  const [sid, setSid] = useState("");
  const [oldSid, setOldSid] = useState("");
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [button, setButton] = useState(false);
  const [inputs, setInputs] = useState([]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMessage = (ttype, msg) => {
    setAlertType(ttype);
    setAlertMessage(msg);
    setOpen(true);
  };

  const handleChange = (value, group_id) => {
    let newInputs = [];
    if (inputs.length > 0) {
      inputs.map((input, index) => {
        if (parseFloat(input.group_id) === parseFloat(group_id)) {
          newInputs.push({ group_id: group_id, value: value });
        } else {
          newInputs.push(input);
        }
      });
    } else {
      newInputs.push({ group_id: group_id, value: value });
    }
    setInputs(newInputs);
  };

  const handleCheckStudent = async (e) => {
    e.preventDefault();
    setOldSid(sid);
    if (sid.length === 0) {
      handleMessage("error", `Xatolik, ID kiritilmagan`);
    } else {
      setSid(e.target.value);
      setProgress(15);
      dispatch(studentStart());

      try {
        setProgress(75);
        const response = await StudentService.check_student(sid);
        dispatch(checkStudent(response.data));
        handleMessage("success", `O'quvchi ma'lumotlari olindi`);
        setSid("");
        setProgress(100);
      } catch (error) {
        setProgress(80);
        dispatch(studentFail(error.response.data));
        setProgress(100);
        handleMessage("error", `Xatolik, ${error.response.data}`);
      }
    }
  };

  const handleOldCheckStudent = async () => {
    setProgress(15);
    dispatch(studentStart());

    try {
      setProgress(35);
      const response = await StudentService.check_student(oldSid);
      dispatch(checkStudent(response.data));
      setProgress(100);
    } catch (error) {
      dispatch(studentFail(error.response.data));
      setProgress(100);
      handleMessage("error", `Xatolik, ${error.response.data}`);
    }
  };

  const handleAddSubscription = async (e, group_id, student_id) => {
    let amount;
    inputs.map((input, index) => {
      if (parseFloat(input.group_id) === parseFloat(group_id)) {
        amount = input.value;
      }
    });
    console.log(amount);
    if (amount !== "") {
      setButton(true);
      try {
        const response = await StudentService.add_subscription(
          group_id,
          student_id,
          amount
        );
        await handleOldCheckStudent();
        let newInputs = [];
        inputs.map((input, index) => {
          if (parseFloat(input.group_id) != parseFloat(group_id)) {
            newInputs.push(input);
          }
        });
        handleMessage("success", "To'lov kiritildi");
        setInputs(newInputs);
      } catch (error) {
        handleMessage("error", `Xatolik, ${error.response.data}`);
      }
      setButton(false);
    } else {
      handleMessage("error", "Xatolik, pul miqdori kiritilmagan");
    }
  };

  return (
    <Layout url="home" progress={progress}>
      <form onSubmit={(e) => handleCheckStudent(e)}>
        <TextField
          fullWidth
          autoFocus
          value={sid}
          onChange={(e) => setSid(e.target.value)}
        />
      </form>

      {loading && sid !== "" && (
        <Skeleton
          variant="rounded"
          animation="wave"
          sx={{ marginTop: 3 }}
          height={220}
        />
      )}

      {!loading && errors === null && student !== null && (
        <>
          <Paper
            elevation={3}
            sx={{
              backgroundColor: student.active ? "#57cc99" : "#f72585",
              color: "white",
              padding: 3,
              marginTop: 3,
            }}
          >
            <Grid container>
              <Grid item xs={12} sm={12} md={9} lg={9}>
                <Typography
                  variant="h4"
                  sx={{ fontWeight: 500 }}
                  component={"h2"}
                >
                  {student.student_info.student.name}
                </Typography>

                <Typography variant="subtitle1" sx={{ mt: 2 }} component={"h2"}>
                  Holati : {student.active ? "Faol" : "Nofaol"}
                </Typography>

                <Typography variant="subtitle1" component={"h2"} mb={1}>
                  Guruhlar
                </Typography>
                {student.student_info.subscriptions &&
                student.student_info.subscriptions.length > 0 ? (
                  <ul style={{ marginLeft: "30px", marginBottom: "30px" }}>
                    {student.student_info.subscriptions.map((group) => (
                      <li style={{ marginBottom: "-5px" }}>
                        <div style={{ display: "flex", flexWrap: "wrap" }}>
                          <div
                            style={{
                              maxWidth: "250px",
                              overflow: "hidden",
                              marginRight: "5px",
                            }}
                          >
                            <Chip
                              label={
                                group.group_name + " - " + group.group_teacher
                              }
                              sx={{ mr: 1, mb: 2, backgroundColor: "#7bdff2" }}
                              size="small"
                              color="secondary"
                            />
                          </div>

                          {group.months.map((month) => (
                            <Link
                              to={`/casher/payment/${student.student_info.student.student_id}/${month.month}/${group.group_id}`}
                            >
                              <Chip
                                label={month.month_name}
                                sx={{
                                  mr: 1,
                                  mb: 2,
                                }}
                                size="small"
                                color={month.status ? "primary" : "light"}
                              />
                            </Link>
                          ))}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  " --- Ushbu o'quvchi hech qanday guruhga a'zo emas. --- "
                )}

                {student.student_info.suspended.map((group) => (
                  <div
                    style={{
                      marginTop: "10px",
                      display: "flex",
                      gap: "10px",
                      alignItems: "center",
                    }}
                  >
                    <TextField
                      label={group.group_name}
                      autoComplete="off"
                      type="number"
                      variant="filled"
                      color="dark"
                      onInput={(e) =>
                        handleChange(e.target.value, group.group_id)
                      }
                      value={inputs.map((input, index) => {
                        if (
                          parseFloat(input.group_id) ===
                          parseFloat(group.group_id)
                        ) {
                          return input.value;
                        } else {
                          return "";
                        }
                      })}
                      size="small"
                      helperText={
                        "Guruh narxi " + parseFloat(group.group_cost) + " so'm"
                      }
                    />
                    <Button
                      variant="contained"
                      sx={{ mb: 3 }}
                      disabled={button}
                      onClick={(e) =>
                        handleAddSubscription(
                          e,
                          group.group_id,
                          student.student_info.student.student_id
                        )
                      }
                      size="large"
                      color="secondary"
                    >
                      {button && (
                        <CircularProgress
                          size={16}
                          color="light"
                          sx={{ marginRight: "15px" }}
                        />
                      )}
                      saqlash
                    </Button>
                  </div>
                ))}
              </Grid>
              <Grid
                item
                alignItems={"center"}
                justifyContent={"center"}
                display={"flex"}
                sx={{ mt: 4 }}
                xs={12}
                sm={12}
                md={3}
                lg={3}
              >
                <Paper
                  elevation={3}
                  sx={{ backgroundColor: "white", padding: 3 }}
                >
                  <img src={barcode} alt="barkod" />
                </Paper>
              </Grid>
            </Grid>
          </Paper>

          <div style={{ marginTop: "15px", marginBottom: "30px" }}>
            <Button
              startIcon={<ModeEditOutlineOutlinedIcon />}
              variant="contained"
              color="success"
            >
              O'zgartirish
            </Button>

            <Button
              sx={{ ml: 1 }}
              startIcon={<DeleteOutlineOutlinedIcon />}
              variant="contained"
              color="error"
            >
              O'chirish
            </Button>

            <Button
              sx={{ ml: 1 }}
              startIcon={<PersonSearchOutlinedIcon />}
              variant="contained"
              color="warning"
            >
              To'lovlar tarixi
            </Button>
          </div>
        </>
      )}

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

export default Home;
