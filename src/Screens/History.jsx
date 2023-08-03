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
  MenuItem,
  Divider,
} from "@mui/material";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import { Link } from "react-router-dom";
import WorkHistoryOutlinedIcon from "@mui/icons-material/WorkHistoryOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { AddCard } from "@mui/icons-material";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";

const History = () => {
  const [sid, setSid] = useState("");
  const handle = (value) => {
    setSid(value);
  };

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

        <div>
          <TextField label="Qidirish" size="small" sx={{ mr: 1 }} />
        </div>
      </div>

      <Paper elevation={3} sx={{ p: 3, mt: 5 }}>
        <div style={{ marginTop: 15 }}>
          <TextField
            id="outlined-select-currency"
            type="date"
            size="small"
            sx={{ mr: 1 }}
            helperText="Sana bo'yicha harajatlarni filterlash"
          />
          <Button startIcon={<SearchIcon />} variant="contained">
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
                <TableCell align="right">
                  O'zgartirish uchun so'rov yuborish
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>JS Rustev</TableCell>
                <TableCell align="right">IT MASTERS </TableCell>
                <TableCell align="right">500 000 so'm </TableCell>
                <TableCell align="right">
                  5-aprel, Seshanba, 2023-yil{" "}
                </TableCell>
                <TableCell align="right">
                  <Button startIcon={<SendOutlinedIcon />} variant="contained">
                    So'rov yuborish
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
        <Typography
          variant="subtitle2"
          color={"dark.main"}
          sx={{ mt: 3 }}
          display="block"
        >
          JAMI <b>2 500 000 so'm</b>
        </Typography>
      </Paper>
    </Layout>
  );
};

export default History;
