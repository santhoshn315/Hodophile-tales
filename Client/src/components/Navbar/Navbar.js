import React, { useState, useEffect } from "react";
import { AppBar, Typography, Toolbar, Avatar, Button } from "@material-ui/core";
import memories from "../../image/logo.png";
import useStyles from "./style";
import { Link, useNavigate, useLocation } from "react-router-dom";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import { themeDark, themeLight } from "../../actions/theme";
import { useDispatch, useSelector } from "react-redux";
import { LIGHT } from "../../constants/actoinTypes";
import Brightness4Icon from "@material-ui/icons/Brightness4";
import WbSunnyIcon from "@material-ui/icons/WbSunny";

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const location = useLocation();
  const themeState = useSelector((state) => state.theme);
  const navigate = useNavigate();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    navigate("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  const handleThemeChange = (event, newMode) => {
    themeState === LIGHT ? dispatch(themeDark()) : dispatch(themeLight());
  };

  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Hodophile tales
        </Typography>
        <img className={classes.image} src={memories} alt="icon" height="60" />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} variant="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              className={classes.logout}
              color="secondary"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            Sign In
          </Button>
        )}
      </Toolbar>
      <div style={{ marginInlineStart: "1rem" }}>
        <ToggleButtonGroup color="primary" onChange={handleThemeChange}>
          <ToggleButton value={themeState}>
            {themeState === LIGHT ? (
              <Brightness4Icon color="primary" />
            ) : (
              <WbSunnyIcon className={classes.sun} />
            )}
          </ToggleButton>
        </ToggleButtonGroup>
      </div>
    </AppBar>
  );
};

export default Navbar;