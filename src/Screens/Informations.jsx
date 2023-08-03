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
} from "@mui/material";
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import FeedOutlinedIcon from "@mui/icons-material/FeedOutlined";
import { Link } from "react-router-dom";
import RemoveRedEyeOutlinedIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";

const Informations = () => {
  const [sid, setSid] = useState("");
  const handle = (value) => {
    setSid(value);
  };
  return (
    <Layout url="informations">
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

        <TextField label="Qidirish" size="small" />
      </div>

      <Grid container spacing={5}>
        <Grid item sm={12} xs={12} md={4} lg={4}>
          <Paper elevation={3} sx={{ padding: 5 }}>
            <Typography color={"dark.main"} variant="h6">
              <b>Sana</b>
            </Typography>
            <Typography variant="h4" color={"dark.main"}>
              3-avgust, 2023
            </Typography>
          </Paper>
        </Grid>

        <Grid item sm={12} xs={12} md={4} lg={4}>
          <Paper elevation={3} sx={{ padding: 5 }}>
            <Typography color={"dark.main"} variant="h6">
              <b>To'lov qilmagan o'quvchilar</b>
            </Typography>
            <Typography variant="h4" color={"dark.main"}>
              500
            </Typography>
          </Paper>
        </Grid>

        <Grid item sm={12} xs={12} md={4} lg={4}>
          <Paper elevation={3} sx={{ padding: 5 }}>
            <Typography color={"dark.main"} variant="h6">
              <b>Guruhlar</b>
            </Typography>
            <Typography variant="h4" color={"dark.main"}>
              24
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
                <TableCell align="right">O'qituvchi</TableCell>
                <TableCell align="right">O'quvchilar</TableCell>
                <TableCell align="left">To'lov qilinmagan</TableCell>
                <TableCell align="right"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>1</TableCell>
                <TableCell>IT masters</TableCell>
                <TableCell align="right">Dasturchi Pythonev</TableCell>
                <TableCell align="right">15</TableCell>
                <TableCell align="left">15</TableCell>
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

export default Informations;
