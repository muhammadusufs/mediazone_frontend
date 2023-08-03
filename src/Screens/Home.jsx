// Components
import { useState } from "react";
import Layout from "../Components/Layout";
import {
  TextField,
  Paper,
  Grid,
  Typography,
  Chip,
  Button,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import barcode from "../assets/imgs/barcod.png";

const Home = () => {
  const [sid, setSid] = useState("");
  const handle = (value) => {
    setSid(value);
  };
  return (
    <Layout url="home">
      <form>
        <TextField
          fullWidth
          autoFocus
          value={sid}
          onInput={(e) => handle(e.target.value)}
          onPaste={(e) => handle(e.target.value)}
        />
      </form>

      <Paper
        elevation={3}
        sx={{
          backgroundColor: "#57cc99",
          color: "white",
          padding: 3,
          marginTop: 3,
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Typography variant="h4" sx={{ fontWeight: 500 }} component={"h2"}>
              Raximov Og'abek Naimjon o'g'li
            </Typography>

            <Typography variant="subtitle1" sx={{ mt: 2 }} component={"h2"}>
              Holati : AKTIV
            </Typography>

            <Typography variant="subtitle1" component={"h2"}>
              Guruhlar
            </Typography>
            <ul style={{ marginLeft: "30px" }}>
              <li style={{ marginBottom: 5 }}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div style={{ width: "130px", overflow: "hidden" }}>
                    <Chip
                      label="IT masters"
                      sx={{ mr: 1, mb: 2 }}
                      size="small"
                      color="secondary"
                    />
                  </div>

                  <Chip
                    label="Yanvar"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Fevral"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Mart"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Aprel"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="May"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Iyun"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Iyul"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Avgust"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label={"Sentyabr +"}
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Oktyabr"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Noyabr"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Dekabr"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                </div>
              </li>
              <li style={{}}>
                <div style={{ display: "flex", flexWrap: "wrap" }}>
                  <div style={{ width: "130px", overflow: "hidden" }}>
                    <Chip
                      label="IT masters"
                      sx={{ mr: 1, mb: 2 }}
                      size="small"
                      color="secondary"
                    />
                  </div>

                  <Chip
                    label="Yanvar"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Fevral"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Mart"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Aprel"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="May"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Iyun"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Iyul"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Avgust"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label={"Sentyabr +"}
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Oktyabr"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Noyabr"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                  <Chip
                    label="Dekabr"
                    sx={{ mr: 1, mb: 2 }}
                    size="small"
                    color="primary"
                  />
                </div>
              </li>
            </ul>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                gap: "10px",
              }}
            >
              <TextField
                id="standard-basic"
                label="IT masters"
                variant="filled"
                color="dark"
                size="small"
              />
              <Button variant="contained" color="secondary">
                saqlash
              </Button>
            </div>

            <div
              style={{
                marginTop: "30px",
                display: "flex",
                gap: "10px",
              }}
            >
              <TextField
                id="standard-basic"
                label="IT masters"
                variant="filled"
                color="dark"
                size="small"
              />
              <Button variant="contained" color="secondary">
                saqlash
              </Button>
            </div>
          </Grid>
          <Grid
            item
            alignItems={"center"}
            justifyContent={"center"}
            display={"flex"}
            sx={{ mt: 4 }}
            xs={12}
            sm={12}
            md={4}
            lg={4}
          >
            <Paper elevation={3} sx={{ backgroundColor: "white", padding: 3 }}>
              <img src={barcode} alt="barkod" />
            </Paper>
          </Grid>
        </Grid>
      </Paper>
    </Layout>
  );
};

export default Home;
