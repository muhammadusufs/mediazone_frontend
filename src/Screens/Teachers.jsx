// Components
import { useState } from "react";
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
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { Link } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
const Teachers = () => {
  const [sid, setSid] = useState("");
  const handle = (value) => {
    setSid(value);
  };
  return (
    <Layout url="teachers">
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
                <TableCell align="right">Avanslar</TableCell>
                <TableCell align="right">Jarimalar</TableCell>
                <TableCell align="right">Bonuslar</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>Python Rustev</TableCell>
                <TableCell align="right">500 000 so'm </TableCell>
                <TableCell align="right">500 000 so'm </TableCell>
                <TableCell align="right">500 000 so'm </TableCell>
                <TableCell align="right">
                  <Button
                    startIcon={<RemoveRedEyeOutlinedIcon />}
                    variant={"contained"}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Ko'rish
                  </Button>

                  <Button
                    startIcon={<EditOutlinedIcon />}
                    variant={"contained"}
                    size="small"
                    color="success"
                    sx={{ mr: 1 }}
                  >
                    O'zgartish
                  </Button>

                  <Button
                    startIcon={<DeleteOutlineOutlinedIcon />}
                    variant={"contained"}
                    size="small"
                    color="error"
                  >
                    O'chirish
                  </Button>
                </TableCell>
              </TableRow>
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
    </Layout>
  );
};

export default Teachers;
