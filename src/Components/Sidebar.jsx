// Library imports
import { Button, Container } from "@mui/material";
import { Link } from "react-router-dom";

// Local imports
import "../assets/css/sidebar.css";
import brand from "../assets/imgs/logo.png";
import mbrand from "../assets/imgs/telegramlogo.png";

// Icons
import AddHomeOutlinedIcon from "@mui/icons-material/AddHomeOutlined";
import ArrowDropDownCircleOutlinedIcon from "@mui/icons-material/ArrowDropDownCircleOutlined";
import MovingIcon from "@mui/icons-material/Moving";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import EngineeringIcon from "@mui/icons-material/Engineering";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import SupervisedUserCircleIcon from "@mui/icons-material/SupervisedUserCircle";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";

const Sidebar = () => {
  const handleLogOut = (event) => {
    console.log("Logged out");
  };

  const handleMenu = () => {
    setOpenMenu(!openMenu);
  };

  const [openMenu, setOpenMenu] = useState(false);

  return (
    <div>
      <div className="desktop-navbar">
        <Container>
          <div className="brand">
            <img src={brand} alt="Grand Prof Samplast" />
          </div>

          <div className="menu-list">
            <div className="menu-list-item">
              <Link to="/">
                <AddHomeOutlinedIcon />
                <span>Bosh sahifa</span>
              </Link>
            </div>

            <div className="menu-list-item">
              <Link to="/debts">
                <ArrowDropDownCircleOutlinedIcon />
                <span>Kirimlar</span>
              </Link>
            </div>

            <div className="menu-list-item">
              <Link to="/credits">
                <MovingIcon />
                <span>Chiqimlar</span>
              </Link>
            </div>

            <div className="menu-list-item">
              <Link to="/sales">
                <WorkOutlineIcon />
                <span>Savdo</span>
              </Link>
            </div>

            <div className="menu-list-item">
              <Link to="/loans">
                <CreditCardIcon />
                <span>Qarzlar</span>
              </Link>
            </div>
            <div className="menu-list-item">
              <Link to="/clients">
                <SupervisedUserCircleIcon />
                <span>Mijozlar</span>
              </Link>
            </div>
            <div className="menu-list-item">
              <Link to="/workers">
                <EngineeringIcon />
                <span>Ishchilar</span>
              </Link>
            </div>

            <div className="menu-list-item">
              <Link to="/settings">
                <SettingsOutlinedIcon />
                <span>Sozlamalar</span>
              </Link>
            </div>
          </div>
        </Container>
      </div>
      <div className="mobile-navbar">
        <div className="mobile-brand">
          <img src={mbrand} alt="Grand Prof Samplast" />
          <h2>EDU Mediazone</h2>
        </div>
        <Button onClick={handleMenu}>
          {!openMenu ? <MenuIcon color="#fff" /> : <CloseIcon />}
        </Button>
      </div>
      {openMenu && (
        <div className="mobile-container">
          <div className="menu-list">
            <div className="menu-list-item">
              <Link to="/">
                <AddHomeOutlinedIcon />
                <span>Bosh sahifa</span>
              </Link>
            </div>

            <div className="menu-list-item">
              <Link to="/debts">
                <ArrowDropDownCircleOutlinedIcon />
                <span>Kirimlar</span>
              </Link>
            </div>

            <div className="menu-list-item">
              <Link to="/credits">
                <MovingIcon />
                <span>Chiqimlar</span>
              </Link>
            </div>

            <div className="menu-list-item">
              <Link to="/sales">
                <WorkOutlineIcon />
                <span>Savdo</span>
              </Link>
            </div>

            <div className="menu-list-item">
              <Link to="/loans">
                <CreditCardIcon />
                <span>Qarzlar</span>
              </Link>
            </div>

            <div className="menu-list-item">
              <Link to="/clients">
                <SupervisedUserCircleIcon />
                <span>Mijozlar</span>
              </Link>
            </div>

            <div className="menu-list-item">
              <Link to="/workers">
                <EngineeringIcon />
                <span>Ishchilar</span>
              </Link>
            </div>

            <div className="menu-list-item">
              <Link to="/settings">
                <SettingsOutlinedIcon />
                <span>Sozlamalar</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
