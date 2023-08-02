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

const Home = () => {
  const [sid, setSid] = useState("");
  const handle = (value) => {
    setSid(value);
  };
  return (
    <Layout>
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
            <div style={{ display: "flex" }}>
              <div style={{ width: "130px", overflow: "hidden" }}>
                <Chip
                  label="IT masters"
                  sx={{ mr: 1 }}
                  size="small"
                  color="secondary"
                />
              </div>

              <Chip
                label="Yanvar"
                sx={{ mr: 1 }}
                size="small"
                color="primary"
              />
              <Chip
                label="Fevral"
                sx={{ mr: 1 }}
                size="small"
                color="primary"
              />
              <Chip label="Mart" sx={{ mr: 1 }} size="small" color="primary" />
              <Chip label="Aprel" sx={{ mr: 1 }} size="small" color="primary" />
              <Chip label="May" sx={{ mr: 1 }} size="small" color="primary" />
              <Chip label="Iyun" sx={{ mr: 1 }} size="small" color="primary" />
              <Chip label="Iyul" sx={{ mr: 1 }} size="small" color="primary" />
              <Chip
                label="Avgust"
                sx={{ mr: 1 }}
                size="small"
                color="primary"
              />
              <Chip
                label={"Sentyabr +"}
                sx={{ mr: 1 }}
                size="small"
                color="primary"
              />
              <Chip
                label="Oktyabr"
                sx={{ mr: 1 }}
                size="small"
                color="primary"
              />
              <Chip
                label="Noyabr"
                sx={{ mr: 1 }}
                size="small"
                color="primary"
              />
              <Chip
                label="Dekabr"
                sx={{ mr: 1 }}
                size="small"
                color="primary"
              />
            </div>
          </li>
          <li style={{ marginBottom: 5 }}>
            <div style={{ display: "flex" }}>
              <div style={{ width: "130px", overflow: "hidden" }}>
                <Chip
                  label="IT masters"
                  sx={{ mr: 1 }}
                  size="small"
                  color="secondary"
                />
              </div>

              <Chip
                label="Yanvar"
                sx={{ mr: 1 }}
                size="small"
                color="primary"
              />
              <Chip
                label="Fevral"
                sx={{ mr: 1 }}
                size="small"
                color="primary"
              />
              <Chip label="Mart" sx={{ mr: 1 }} size="small" color="primary" />
              <Chip label="Aprel" sx={{ mr: 1 }} size="small" color="primary" />
              <Chip label="May" sx={{ mr: 1 }} size="small" color="primary" />
              <Chip label="Iyun" sx={{ mr: 1 }} size="small" color="primary" />
              <Chip label="Iyul" sx={{ mr: 1 }} size="small" color="primary" />
              <Chip
                label="Avgust"
                sx={{ mr: 1 }}
                size="small"
                color="primary"
              />
              <Chip
                label={"Sentyabr +"}
                sx={{ mr: 1 }}
                size="small"
                color="primary"
              />
              <Chip
                label="Oktyabr"
                sx={{ mr: 1 }}
                size="small"
                color="primary"
              />
              <Chip
                label="Noyabr"
                sx={{ mr: 1 }}
                size="small"
                color="primary"
              />
              <Chip
                label="Dekabr"
                sx={{ mr: 1 }}
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
            gap: "15px",
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
      </Paper>
    </Layout>
  );
};

export default Home;
