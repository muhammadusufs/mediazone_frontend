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
  IconButton,
  MenuItem,
  Divider,
  Snackbar,
  Alert,
  Skeleton,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { Link } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { AddCard } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { expenseStart, expenseSuccess } from "../states/ExpenseSlice";
import ExpenseService from "../services/ExpenseService";

const Expenses = () => {
  const [sid, setSid] = useState("");
  const [progress, setProgress] = useState("");
  const [month, setMonth] = useState(getDate());
  const [btn, setBtn] = useState(false);

  const { expenses, loading } = useSelector((state) => state.expenses);

  const dispatch = useDispatch();
  const handle = (value) => {
    setSid(value);
  };

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

  function getDate() {
    const today = new Date();
    if (String(today.getMonth()).length === 1) {
      return `0${today.getMonth() + 1}`;
    } else {
      return today.getMonth() + 1;
    }
  }

  const getExpenses = async () => {
    setProgress(25);
    dispatch(expenseStart());
    try {
      setProgress(40);
      const response = await ExpenseService.get_expenses();
      dispatch(expenseSuccess(response.data));
    } catch (error) {
      handleMessage("error", "Xatolik, qaytadan urining");
    }
  };

  const getExpensesByMonth = async () => {
    setProgress(25);
    setBtn(true);
    dispatch(expenseStart());
    try {
      setProgress(40);
      const response = await ExpenseService.get_expenses(month);
      dispatch(expenseSuccess(response.data));
    } catch (error) {
      handleMessage("error", "Xatolik, qaytadan urining");
    }
    setBtn(false);
  };

  useEffect(() => {
    getExpenses();
  }, []);

  const months = [
    {
      value: "01",
      label: "Yanvar",
    },
    {
      value: "02",
      label: "Fevral",
    },
    {
      value: "03",
      label: "Mart",
    },
    {
      value: "04",
      label: "Aprel",
    },
    {
      value: "05",
      label: "May",
    },
    {
      value: "06",
      label: "Iyun",
    },
    {
      value: "07",
      label: "Iyul",
    },
    {
      value: "08",
      label: "Avgust",
    },
    {
      value: "09",
      label: "Sentyabr",
    },
    {
      value: "10",
      label: "Oktyabr",
    },

    {
      value: "11",
      label: "Noyabr",
    },

    {
      value: "12",
      label: "Dekabr",
    },
  ];

  return (
    <Layout url="expenses">
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
            <AddCard sx={{ mr: 0.5 }} fontSize="inherit" />
            Harajatlar
          </Typography>
        </Breadcrumbs>

        <div>
          <Link
            style={{ textDecoration: "none" }}
            to={"/casher/expenses/add-expense/"}
          >
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineOutlinedIcon />}
            >
              Yangi harajat
            </Button>
          </Link>
        </div>
      </div>

      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <div style={{ marginTop: 15 }}>
          <TextField
            id="outlined-select-currency"
            select
            label="Oy"
            size="small"
            sx={{ mr: 1 }}
            defaultValue={month}
            onChange={(e) => setMonth(e.target.value)}
            helperText="Oy bo'yicha harajatlarni filterlash"
          >
            {months.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            disabled={btn}
            onClick={getExpensesByMonth}
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
                <TableCell colSpan={2}>Harajat</TableCell>
                <TableCell>Miqdori</TableCell>
                <TableCell>Sana</TableCell>
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
                  {expenses.length > 0 ? (
                    expenses.map((expense, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>{expense.comment}</TableCell>
                        <TableCell>
                          {parseFloat(expense.amount).toLocaleString()} so'm
                        </TableCell>
                        <TableCell>
                          {moment(expense.date).format("LLLL")}
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={4} style={{ textAlign: "center" }}>
                        Ushbu oyda harajatlar mavjud emas
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

export default Expenses;
