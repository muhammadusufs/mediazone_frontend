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
  Divider,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { Link } from "react-router-dom";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import SearchIcon from "@mui/icons-material/Search";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import HistoryService from "../services/HistoryService";
import { historyStart, historySuccess } from "../states/HistorySlices";
import { useDispatch, useSelector } from "react-redux";

const History = () => {
  const [sid, setSid] = useState("");
  const [date, setDate] = useState();
  const [progress, setProgress] = useState(0);
  const [btn, setBtn] = useState(false);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const { histories, loading } = useSelector((state) => state.histories);

  const handleClose = () => {
    setOpen(false);
  };

  function getDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(today.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  const handleMessage = (ttype, msg) => {
    setAlertType(ttype);
    setAlertMessage(msg);
    setOpen(true);
  };

  const handle = (value) => {
    setSid(value);
  };

  const getHistory = async () => {
    setProgress(25);
    dispatch(historyStart());
    try {
      setProgress(40);
      const response = await HistoryService.get_histories();
      dispatch(historySuccess(response.data));
    } catch (error) {
      handleMessage("error", "Xatolik, qaytadan urining");
    }
  };

  useEffect(() => {
    console.log(getDate());
    getHistory();
  }, []);

  const getHistoryByDate = async () => {
    console.log(date);
    setProgress(25);
    setBtn(true);
    dispatch(historyStart());
    try {
      setProgress(40);
      const response = await HistoryService.get_histories(date);
      dispatch(historySuccess(response.data));
    } catch (error) {
      handleMessage("error", "Xatolik, qaytadan urining");
    }
    setBtn(false);
  };

  return (
    <Layout url="sale">
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
            <WorkHistoryOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Tarix
          </Typography>
        </Breadcrumbs>
      </div>

      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <div style={{ marginTop: 15 }}>
          <TextField
            id="outlined-select-currency"
            type="date"
            size="small"
            sx={{ mr: 1 }}
            value={date}
            onChange={(e) => setDate(e.target.value)}
            helperText="Sana bo'yicha harajatlarni filterlash"
          />
          <Button
            disabled={btn}
            onClick={getHistoryByDate}
            startIcon={<SearchIcon />}
            variant="contained"
          >
            Aniqlash
          </Button>
        </div>
        <Divider sx={{ my: 3 }} />
        <TableContainer>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>O'quvchi</TableCell>
                <TableCell align="right">Guruh</TableCell>
                <TableCell align="right">To'lov miqdori</TableCell>
                <TableCell align="right">Sana</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <>
                  <TableRow>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell align="right">
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                    <TableCell>
                      <Skeleton variant="rounded" animation="wave" />
                    </TableCell>
                  </TableRow>
                </>
              ) : (
                <>
                  {histories.length > 0 ? (
                    histories.map((history, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{history.student_name}</TableCell>
                        <TableCell align="right">
                          {history.group_name}
                        </TableCell>

                        <TableCell align="right">
                          {parseFloat(history.cost).toLocaleString()} so'm
                        </TableCell>
                        <TableCell align="right">
                          {moment(history.created_at).format("LLLL")}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={5} style={{ textAlign: "center" }}>
                        Bu sanada harajatlar mavjud emas
                      </TableCell>
                    </TableRow>
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

export default History;
