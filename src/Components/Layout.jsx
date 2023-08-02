// Material imports
import { Grid } from "@mui/material";

// Local imports
import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  return (
    <Grid container>
      <Grid item sm={12} xs={12} md={2}>
        <Sidebar />
      </Grid>
      <Grid item sm={12} xs={12} md={10}>
        <Header />
        <div className="layout">{children}</div>
      </Grid>
    </Grid>
  );
};

export default Layout;
