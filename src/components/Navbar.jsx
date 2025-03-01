import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { Logout } from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout } = useContext(AuthContext);

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Stickeez Notes
        </Typography>
        <IconButton color="inherit" onClick={logout}>
          <Logout />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
