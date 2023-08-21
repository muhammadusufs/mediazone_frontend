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
} from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import { Link, useParams } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import GroupService from "../services/GroupService";
import { useDispatch, useSelector } from "react-redux";
import { checkGroup, groupStart } from "../states/GroupSlice";

const GroupDetails = () => {
  const { group_id } = useParams();
  const dispatch = useDispatch();

  const { loading, group } = useSelector((state) => state.groups);

  const [progress, setProgress] = useState(0);
  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");
  const [status, setStatus] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const handleMessage = (ttype, msg) => {
    setAlertType(ttype);
    setAlertMessage(msg);
    setOpen(true);
  };

  const getGroup = async () => {
    setProgress(25);
    dispatch(groupStart());
    try {
      setProgress(35);
      const response = await GroupService.check_group(group_id);
      dispatch(checkGroup(response.data));
      setStatus(JSON.parse(response.data.status));
      setProgress(80);
    } catch (error) {
      setProgress(35);
      handleMessage("error", "Xatolik, qaytadan urining");
      setProgress(80);
    }
    setProgress(100);
  };

  useEffect(() => {
    getGroup();
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
            to="/casher/"
          >
            <AddHomeOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Bosh sahifa
          </Link>

          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to="/casher/data/"
          >
            <FeedOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Guruhlar
          </Link>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            {group && group.name}
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
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>O'quvchi</TableCell>
                <TableCell>Telefon</TableCell>
                <TableCell align="right">Holat</TableCell>
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
                  {group &&
                    group.students.map((student, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {student.name} - {student.student_id}
                        </TableCell>
                        <TableCell>{student.phone}</TableCell>
                        <TableCell align="right">
                          {status && status[`${student.id}`] === true ? (
                            <Chip label="To'langan" color="success" />
                          ) : (
                            <Chip label="To'lanmagan" color="error" />
                          )}
                        </TableCell>

                        <TableCell align="right">
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/general/students/${student.student_id}/edit/`}
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
                          <Link
                            style={{ textDecoration: "none" }}
                            to={`/general/students/${student.student_id}/delete/`}
                          >
                            <Button
                              startIcon={<DeleteOutlineOutlinedIcon />}
                              variant={"contained"}
                              size="small"
                              color="error"
                            >
                              O'chirish
                            </Button>
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                </>
              )}
            </TableBody>
          </Table>
        </TableContainer>
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

export default GroupDetails;
