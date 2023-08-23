// Components
import { useEffect, useState } from "react";
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
  Alert,
  Snackbar,
  Skeleton,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { Link } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import { useDispatch, useSelector } from "react-redux";
import { teacherStart, teacherSuccess } from "../states/TeacherSlice";
import TeacherService from "../services/TeacherService";
const Teachers = () => {
  const [sid, setSid] = useState("");

  const dispatch = useDispatch();
  const { teachers, loading } = useSelector((state) => state.teachers);

  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const handleClose = () => {
    setOpen(false);
  };

  const handleMessage = (ttype, msg) => {
    setAlertType(ttype);
    setAlertMessage(msg);
    setOpen(true);
  };

  const getTeachers = async () => {
    setProgress(25);
    dispatch(teacherStart());

    try {
      setProgress(35);
      const response = await TeacherService.get_teachers();
      dispatch(teacherSuccess(response.data));
      setProgress(80);
    } catch (error) {
      setProgress(35);
      handleMessage("error", "Xatolik, qaytadan urining");
      setProgress(80);
    }

    setProgress(100);
  };

  const handle = (value) => {
    setSid(value);
  };

  const handleDelete = async (teacher_id) => {
    setProgress(25);
    try {
      const response = TeacherService.delete_teacher(teacher_id);
      handleMessage("success", "O'qituvchi o'chirildi");
      await getTeachers();
    } catch (error) {
      handleMessage("error", "Xatolik, qaytadan urining");
    }
  };

  useEffect(() => {
    getTeachers();
  }, []);
  return (
    <Layout url="teachers" progress={progress}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
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
            <AccountCircleOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            O'qituvchilar
          </Typography>
        </Breadcrumbs>

        <div>
          <TextField label="Qidirish" size="small" sx={{ mr: 1 }} />
          <Button
            variant="contained"
            startIcon={<AddCircleOutlineOutlinedIcon />}
          >
            Yangi o'qituvchi
          </Button>
        </div>
      </div>

      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>O'qituvchi</TableCell>
                <TableCell>Telefon</TableCell>
                <TableCell align="right">Avanslar</TableCell>
                <TableCell align="right">Jarimalar</TableCell>
                <TableCell align="right">Bonuslar</TableCell>
                <TableCell align="right">Davomat</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <>
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <>
                  {teachers ? (
                    teachers.map((teacher, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{teacher.name}</TableCell>
                        <TableCell>{teacher.phone}</TableCell>

                        <TableCell align="right">
                          {parseFloat(teacher.debt).toLocaleString()} so'm{" "}
                        </TableCell>
                        <TableCell align="right">
                          {parseFloat(teacher.fine).toLocaleString()} so'm{" "}
                        </TableCell>
                        <TableCell align="right">
                          {parseFloat(teacher.bonus).toLocaleString()} so'm{" "}
                        </TableCell>
                        <TableCell align="right">
                          {parseFloat(teacher.attendace).toLocaleString()} kun
                        </TableCell>
                        <TableCell align="right">
                          <Link
                            to={`${teacher.id}/`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              startIcon={<RemoveRedEyeOutlinedIcon />}
                              variant={"contained"}
                              size="small"
                              sx={{ mr: 1 }}
                            >
                              Ko'rish
                            </Button>
                          </Link>

                          <Link
                            to={`${teacher.id}/edit/`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button
                              startIcon={<EditOutlinedIcon />}
                              variant={"contained"}
                              size="small"
                              color="success"
                              sx={{ mr: 1 }}
                            >
                              O'zgartish
                            </Button>
                          </Link>

                          <Button
                            startIcon={<DeleteOutlineOutlinedIcon />}
                            variant={"contained"}
                            size="small"
                            onClick={() => handleDelete(teacher.id)}
                            color="error"
                          >
                            O'chirish
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <>Hozircha o'qituvchilar mavjud emas</>
                  )}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        {/* <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={10}
          rowsPerPage={10}
          page={1}
          onPageChange={}
          onRowsPerPageChange={}
        /> */}
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

export default Teachers;
