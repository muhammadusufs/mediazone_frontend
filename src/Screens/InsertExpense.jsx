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
  Snackbar,
  Alert,
} from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AddCard } from "@mui/icons-material";
import ExpenseService from "../services/ExpenseService";

const InsertExpense = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const [expenseComment, setExpenseComment] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [progress, setProgress] = useState(0);

  const [open, setOpen] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const [alertMessage, setAlertMessage] = useState("");

  const [submitBtn, setSubmitBtn] = useState(false);

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
    setProgress(25);
    setSubmitBtn(true);
    try {
      const response = await ExpenseService.add_expense(
        expenseComment,
        expenseAmount,
        user.company
      );
      if (response === 201) {
        handleMessage("success", "Harajat kiritildi");
        setTimeout(() => {
          navigate("/casher/expenses/");
        }, 1000);
      }
    } catch (error) {
      handleMessage("error", "Xatolik, qaytadan urining");
    }
  };

  return (
    <Layout progress={progress} url="expenses">
      <div style={{ marginTop: "8px" }}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to="/"
          >
            <AddHomeOutlinedIcon sx={{ mr: 0.5 }} fontSize="inherit" />
            Bosh sahifa
          </Link>

          <Link
            underline="hover"
            sx={{ display: "flex", alignItems: "center" }}
            color="inherit"
            to="/casher/expenses/"
          >
            <AddCard sx={{ mr: 0.5 }} fontSize="inherit" />
            Harajatlar
          </Link>

          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
          >
            <AddCard sx={{ mr: 0.5 }} fontSize="inherit" />
            Harajat kiritish
          </Typography>
        </Breadcrumbs>
      </div>

      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <Grid container spacing={3}>
            <Grid item sm={12} xs={12} md={12}>
              <TextField
                label={"Izoh"}
                required
                helperText={"Harajat uchun izoh"}
                fullWidth
                value={expenseComment}
                onInput={(e) => setExpenseComment(e.target.value)}
                sx={{ mb: 2 }}
              />

              <TextField
                label={"Miqdor"}
                helperText={"Harajat miqdori"}
                required
                type="number"
                fullWidth
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
                sx={{ mb: 2 }}
              />
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

export default InsertExpense;
