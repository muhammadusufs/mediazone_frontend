// Library imports
import moment from "moment";
import "moment/locale/uz-latn";

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
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import { Link } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import GroupService from "../services/GroupService";
import { useDispatch, useSelector } from "react-redux";
import { groupStart, groupSuccess } from "../states/GroupSlice";
import TeacherService from "../services/TeacherService";
import { teacherSuccess } from "../states/TeacherSlice";

const Informations = () => {
  function getDate() {
    const today = new Date();
    return today;
  }

  const dispatch = useDispatch();
  const { loading, stats } = useSelector((state) => state.groups);

  const [currentDate, setCurrentDate] = useState(getDate());
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

  const getStats = async () => {
    setProgress(25);
    dispatch(groupStart());
    try {
      setProgress(35);
      const response = await GroupService.get_groups_data();
      const t = await TeacherService.get_teachers();
      dispatch(teacherSuccess(t.data));
      dispatch(groupSuccess(response.data));
      setProgress(80);
    } catch (error) {
      setProgress(35);
      handleMessage("error", "Xatolik, qaytadan urining");
      setProgress(80);
    }

    setProgress(100);
  };

  const deleteGroup = async (group_id) => {
    setProgress(25);
    try {
      const d = await GroupService.delete_group(group_id);
      if (d === 204) {
        setProgress(55);
        await getStats();
        handleMessage("success", "Guruh o'chirildi");
      }
    } catch (error) {
      handleMessage("error", "Xatolik, qaytadan urining");
    }
  };

  useEffect(() => {
    getStats();
    setCurrentDate(getDate());
  }, []);

  return (
    <Layout progress={progress} url="informations">
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
            <FeedOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Ma'lumotlar
          </Typography>
        </Breadcrumbs>

        <div>
          <Link style={{ textDecoration: "none" }} to={"create-group/"}>
            <Button variant="contained">Guruh ochish</Button>
          </Link>
        </div>
      </div>

      <Grid container spacing={5}>
        <Grid item sm={12} xs={12} md={4} lg={4}>
          <Paper elevation={3} sx={{ padding: 5 }}>
            <Typography color={"dark.main"} variant="h6">
              <b>Sana</b>
            </Typography>
            <Typography variant="h4" color={"dark.main"}>
              {moment(currentDate).format("LL")}
              -yil
            </Typography>
          </Paper>
        </Grid>

        <Grid item sm={12} xs={12} md={4} lg={4}>
          <Paper elevation={3} sx={{ padding: 5 }}>
            <Typography color={"dark.main"} variant="h6">
              <b>To'lov qilmagan o'quvchilar</b>
            </Typography>
            <Typography variant="h4" color={"dark.main"}>
              {parseFloat(stats ? stats.unpayment : 0).toLocaleString()}
            </Typography>
          </Paper>
        </Grid>

        <Grid item sm={12} xs={12} md={4} lg={4}>
          <Paper elevation={3} sx={{ padding: 5 }}>
            <Typography color={"dark.main"} variant="h6">
              <b>Guruhlar</b>
            </Typography>
            <Typography variant="h4" color={"dark.main"}>
              {parseFloat(stats ? stats.groups_count : 0).toLocaleString()}
            </Typography>
          </Paper>
        </Grid>
      </Grid>

      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>Guruh</TableCell>
                <TableCell>O'qituvchi</TableCell>
                <TableCell align="right">O'quvchilar</TableCell>
                <TableCell align="left">To'lov qilinmagan</TableCell>
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
                  {stats &&
                    stats.groups.map((group, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{group.name}</TableCell>
                        <TableCell>{group.teacher_name}</TableCell>
                        <TableCell align="right">
                          {group.students_count}
                        </TableCell>
                        <TableCell align="left">
                          {group.unpayments_count}
                        </TableCell>
                        <TableCell align="right">
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`view-group/${group.id}`}
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
                            style={{ textDecoration: "none" }}
                            to={`edit-group/${group.id}`}
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
                            color="error"
                            onClick={() => deleteGroup(group.id)}
                          >
                            O'chirish
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
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

export default Informations;
