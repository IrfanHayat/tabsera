import React, { useMemo, useEffect, useState } from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";

// import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import { useSelector, useDispatch } from "react-redux";
import { CssBaseline, InputAdornment } from "@mui/material";

import { AppBar, Grid, Stack, Typography } from "@mui/material";
import SignInModal from "../Login/SignIn";
import Image from "next/image";
import TopNav from "./Components/TopNav";
import { useTranslation } from "react-i18next";
import NavSelect from "./Components/NavSelect";
import locales from "../../i18n.json";
import Divider from "@mui/material/Divider";
import NavDown from "./Components/NavDown";
import { header, footer } from "../../helper/config/config";
import { useRouter, withRouter } from "next/router";
import { loginUser } from "../../slice/authSlice";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import IconButton from "@mui/material/IconButton";
import Link from "@mui/material/Link";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
const NavLink = styled("a")(() => ({
  wrap: "noWrap",
  component: "a",
  fontFamily: "Raleway, Almarai, sans-serif",
  fontWeight: 300,
  color: "white",
  mt: 20,
  marginLeft: 50,
  ":hover": {
    // boxShadow: 20, // theme.shadows[20]
    transform: "scale(1.1)",
    // color: "white",
    transformOrigin: "bottomleft",
    // opacity: 0.5,
    cursor: "pointer",
  },
  textDecoration: "none",
  // necessary for content to be below app bar
}));

export default function NavBar() {
  let dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const [showLogin, setShowLogin] = useState(false);
  const [currentHost, setCurrentHost] = useState();
  let { t, i18n } = useTranslation();
  const theme = useTheme();
  let router = useRouter();
  const routers = useRouter();
  const menuId = "primary-search-account-menu";

  const changeLanguageHandler = (lang) => {
    i18n.changeLanguage(lang);
    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  const logOut = () => {
    dispatch(logoutUser());
    Cookies.remove("connect.sid");
    router.push("/login");
  };
  useEffect(() => {
    changeLanguageHandler();
  }, []);
  useEffect(() => {
    //dispatch(getTotalCartQuantity());
    // setQunatityProduct(result.payload)
    if (
      typeof window !== "undefined" &&
      window.location !== window.parent.location
    ) {
      const hostname = window.location.hostname;
      setCurrentHost(hostname);
      // console.log(hostname);
    }
    if (routers.query?.userName != "" && routers.query?.pwd != "") {
      // console.log(routers.query?.userName);
      // console.log(routers.query?.pwd);
      dispatch(loginUser(routers.query));
    }
  }, []);

  const currencyData = (
    <div>
      <MenuItem>
        <ListItemText>Rupees</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText>Dollar</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText>Ponds</ListItemText>
      </MenuItem>
    </div>
  );

  const languageData = (
    <div>
      {locales?.locales.map((locale, index) => (
        <MenuItem
          sx={{ width: "70px", textTransform: "uppercase" }}
          key={index}
        >
          <ListItemText onClick={() => changeLanguageHandler(locale)}>
            {" "}
            {locale}
          </ListItemText>
        </MenuItem>
      ))}
    </div>
  );
  const myAccount = (
    <div>
      <MenuItem>
        <ListItemIcon>
          <AccountBoxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>My Profile</ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <FormatListBulletedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>My Orders</ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <FormatListBulletedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>My Coupons</ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <ReceiptIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>My Bill Payments</ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <AdUnitsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>My Topups</ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <GppGoodOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Security</ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <InfoOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>About</ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <HelpOutlineOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText>Help</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => logOut()} alignText="center">
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </div>
  );

  // ----------------------------------------------------------------------------------

  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <MenuItem onClick={handleMenuClose}>Logout</MenuItem> */}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  // ----------------------------------------------------------------------------------

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <NavSelect Title="Account" Data={myAccount} color="black" />
      </MenuItem>
      <MenuItem>
        <NavSelect Title="Currency" Data={currencyData} color="black" />
      </MenuItem>
      <MenuItem>
        <NavSelect Title="Language" Data={languageData} color="black" />
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* {router.pathname === "/" ? */}

      <CssBaseline />
      {currentHost != "137.74.4.23" && header != true ? (
        <>
          {/* <TopNav /> */}

          <AppBar
            sx={{
              color: "inherit",
              // bgcolor: "#bdbdbd",
              // height: "95%",
              // bgcolor: "#0277bd",
              justifyContent: "center",
              padding: "5px",
            }}
            position="static"
          >
            <Toolbar sx={{ flexWrap: "wrap" }}>
              <Image src="/logo.png" height={40} width={100}></Image>
              <Box component="div" sx={{ flexGrow: 1 }} />
              <Box
                sx={{
                  display: {
                    xs: "none",
                    md: "block",
                    justifyContent: "center",
                    flexWrap: "wrap",
                  },
                }}
              >
                <NavLink
                  variant="button"
                  color="text.primary"
                  href="/contact_us"
                  sx={{ mx: 1.5, textDecoration: "none", pt: 4 }}
                >
                  Contact Us
                </NavLink>
                <NavLink
                  variant="button"
                  color="text.primary"
                  href="/about"
                  sx={{ mx: 2.5, textDecoration: "none" }}
                >
                  {t("About Us")}
                </NavLink>

                <NavSelect Title="Account" Data={myAccount} />
                <NavSelect Title="Currency" Data={currencyData} />
                <NavSelect Title="Language" Data={languageData} />
              </Box>
              {/* <Button href="#" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
                Login
              </Button> */}
              <SignInModal show={showLogin} close={() => setShowLogin(false)} />
              {/* </Toolbar> */}

              <Box sx={{ display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="show more"
                  aria-controls={mobileMenuId}
                  aria-haspopup="true"
                  onClick={handleMobileMenuOpen}
                  color="inherit"
                >
                  <MoreIcon />
                </IconButton>
              </Box>
            </Toolbar>
          </AppBar>
          {renderMobileMenu}
          {renderMenu}
        </>
      ) : (
        ""
      )}
      <NavDown />
    </Box>
  );
}
