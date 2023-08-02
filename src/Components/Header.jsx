import "../assets/css/header.css";
import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import { Chip, Badge, IconButton } from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import { useSelector } from "react-redux";

const Header = () => {
  const user = useSelector((state) => state.auth.user);

  return (
    <div className="header">
      <div className="header-username">{user.name}</div>

      <Chip label={user.level_display} color="primary" variant="contained" />
      <IconButton>
        <Badge badgeContent={100} color="error">
          <NotificationsIcon color="primary" />
        </Badge>
      </IconButton>
      <IconButton>
        <LogoutOutlinedIcon color="primary" />
      </IconButton>
    </div>
  );
};

export default Header;
