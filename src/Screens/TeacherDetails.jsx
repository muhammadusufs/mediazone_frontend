// Library imports
import moment from "moment";
import "moment/locale/uz-latn";

// Components
import { useEffect, useState } from "react";
import Layout from "../Components/Layout";
import {
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
  Chip,
  Grid,
  Divider,
  Box,
  Tabs,
  Tab,
  IconButton,
} from "@mui/material";

import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";

import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import AddIcon from "@mui/icons-material/Add";
import { Link, useParams } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import GroupService from "../services/GroupService";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

import { useDispatch, useSelector } from "react-redux";
import { checkGroup, groupStart } from "../states/GroupSlice";
import {
  checkTeacher,
  setTeacherStats,
  teacherStart,
} from "../states/TeacherSlice";
import TeacherService from "../services/TeacherService";

const TeacherDetails = () => {
  const { teacher_id } = useParams();
  const dispatch = useDispatch();

  const { loading, teacher, stats } = useSelector((state) => state.teachers);

  const [value, setValue] = useState("1");

  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [status, setStatus] = useState(null);

  const groups = teacher ? teacher.grs : [];

  // tab change handle
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleMessage = (ttype, msg) => {
    setAlertType(ttype);
    setAlertMessage(msg);
    setOpen(true);
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
    <Layout progress={progress} url="teachers">
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

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            {teacher && teacher.name}
          </Typography>
        </Breadcrumbs>

        <div>
          <Link
            style={{ textDecoration: "none" }}
            to={"/casher/data/create-group/"}
          >
            <Button variant="contained">Guruh ochish</Button>
          </Link>
        </div>
      </div>

      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Grid container spacing={10}>
          <Grid item xs={12} sm={6}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>F.I.Sh</b>
                  </TableCell>
                  <TableCell>{teacher && teacher.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Telefon raqam</b>
                  </TableCell>
                  <TableCell>{teacher && teacher.phone}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Guruhlar soni</b>
                  </TableCell>
                  <TableCell>{teacher && teacher.name}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Barkod</b>
                  </TableCell>
                  <TableCell>{teacher && teacher.barcode}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>

          <Grid item xs={12} sm={6}>
            <Table>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <b>Davomat</b>
                  </TableCell>
                  <TableCell>{teacher && teacher.attendace} kun</TableCell>
                  <TableCell></TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Avanslar</b>
                  </TableCell>
                  <TableCell>
                    {teacher && parseFloat(teacher.debt).toLocaleString()} so'm
                  </TableCell>
                  <TableCell>
                    <Link to={`/casher/teachers/${teacher.id}/add/debt/`}>
                      <IconButton sx={{ m: 0, p: 0 }} color="primary">
                        <AddIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Jarimalar</b>
                  </TableCell>
                  <TableCell>
                    {teacher && parseFloat(teacher.fine).toLocaleString()} so'm
                  </TableCell>
                  <TableCell>
                    <Link to={`/casher/teachers/${teacher.id}/add/fine/`}>
                      <IconButton sx={{ m: 0, p: 0 }} color="primary">
                        <AddIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell>
                    <b>Bonuslar</b>
                  </TableCell>
                  <TableCell>
                    {teacher && parseFloat(teacher.bonus).toLocaleString()} so'm
                  </TableCell>
                  <TableCell>
                    <Link to={`/casher/teachers/${teacher.id}/add/bonus/`}>
                      <IconButton sx={{ m: 0, p: 0 }} color="primary">
                        <AddIcon />
                      </IconButton>
                    </Link>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Grid>
        </Grid>
        <Divider sx={{ mt: 5 }}>
          <h3>Guruhlar</h3>
        </Divider>
        {groups
          ? groups.map((group) => (
              <Chip label={group} sx={{ mr: 2 }} color="primary" />
            ))
          : "Guruhlar mavjud emas"}
      </Paper>

      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <Box sx={{ overflow: "auto" }}>
          <Box sx={{ width: "100%", display: "table", tableLayout: "fixed" }}>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <TabList
                  variant="scrollable"
                  scrollButtons="auto"
                  selectionFollowsFocus
                  onChange={handleChange}
                >
                  <Tab label="Davomat" value="1" />
                  <Tab label="Avanslar" value="2" />
                  <Tab label="Jarimalar" value="3" />
                  <Tab label="Bonuslar" value="4" />
                </TabList>
              </Box>
              <TabPanel value="1">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Sana</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell>
                          <Skeleton variant="rounded" animation="wave" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="rounded" animation="wave" />
                        </TableCell>
                      </TableRow>
                    ) : stats && stats.attendace.length > 0 ? (
                      stats.attendace.map((row, index) => (
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>
                            {moment(row.date).format("LLLL")}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableCell colSpan={2}>
                        <>Mavjud emas</>
                      </TableCell>
                    )}
                  </TableBody>
                </Table>
              </TabPanel>

              <TabPanel value="2">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Izoh</TableCell>
                      <TableCell>Miqdori</TableCell>
                      <TableCell>Sana</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell>
                          <Skeleton variant="rounded" animation="wave" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="rounded" animation="wave" />
                        </TableCell>
                      </TableRow>
                    ) : stats && stats.debts.length > 0 ? (
                      stats.debts.map((row, index) => (
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.comment}</TableCell>
                          <TableCell>
                            {parseFloat(row.amount).toLocaleString()} so'm
                          </TableCell>
                          <TableCell>
                            {moment(row.date).format("LLLL")}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableCell colSpan={4}>
                        <>Mavjud emas</>
                      </TableCell>
                    )}
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel value="3">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Izoh</TableCell>
                      <TableCell>Miqdori</TableCell>
                      <TableCell>Sana</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell>
                          <Skeleton variant="rounded" animation="wave" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="rounded" animation="wave" />
                        </TableCell>
                      </TableRow>
                    ) : stats && stats.fines.length > 0 ? (
                      stats.fines.map((row, index) => (
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.comment}</TableCell>
                          <TableCell>
                            {parseFloat(row.amount).toLocaleString()} so'm
                          </TableCell>
                          <TableCell>
                            {moment(row.date).format("LLLL")}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableCell colSpan={4}>
                        <>Mavjud emas</>
                      </TableCell>
                    )}
                  </TableBody>
                </Table>
              </TabPanel>
              <TabPanel value="4">
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>#</TableCell>
                      <TableCell>Izoh</TableCell>
                      <TableCell>Miqdori</TableCell>
                      <TableCell>Sana</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {loading ? (
                      <TableRow>
                        <TableCell>
                          <Skeleton variant="rounded" animation="wave" />
                        </TableCell>
                        <TableCell align="right">
                          <Skeleton variant="rounded" animation="wave" />
                        </TableCell>
                      </TableRow>
                    ) : stats && stats.bonuses.length > 0 ? (
                      stats.bonuses.map((row, index) => (
                        <TableRow>
                          <TableCell>{index + 1}</TableCell>
                          <TableCell>{row.comment}</TableCell>
                          <TableCell>
                            {parseFloat(row.amount).toLocaleString()} so'm
                          </TableCell>
                          <TableCell>
                            {moment(row.date).format("LLLL")}
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableCell colSpan={4}>
                        <>Mavjud emas</>
                      </TableCell>
                    )}
                  </TableBody>
                </Table>
              </TabPanel>
            </TabContext>
          </Box>
        </Box>
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

export default TeacherDetails;
