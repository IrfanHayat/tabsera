import React, { useMemo, useEffect, useState } from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import { AppBar, Typography } from "@mui/material";
import locales from "../../../i18n.json";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import NavSelect from "./NavSelect";
import { ListItemIcon } from "@mui/material";
import { Container } from "@mui/system";
import { logoutUser } from "../../../slice/authSlice";
import Cookies from "js-cookie";
import Image from "next/image";
import SignInModal from "../../Login/SignIn";

const NavLink = styled("a")(() => ({
  wrap: "noWrap",
  component: "a",
  fontFamily: "Raleway, Almarai, sans-serif",
  fontWeight: 300,
  color: "white",
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

export default function TopNav(props) {
  const category = useSelector((state) => state.category.categoryData);
  //const [quantityProduct,setQunatityProduct]=useState()
  const [open, setOpen] = React.useState(false);
  let { t, i18n } = useTranslation();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [categoriesData, setCategoriesData] = useState([]);
  const dispatch = useDispatch();
  const [showLogin, setShowLogin] = useState(false);

  const theme = useTheme();

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
  const menuId = "primary-search-account-menu";
  // ----------------------------------------------------------------------------------

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
      <CssBaseline />
      <AppBar
        style={{ height: "90px" }}
        sx={{
          justifyContent: "center",
          padding: "5px",
          // bgcolor: "#f6f9fc",
          bgcolor: "inderit",
          color: "black",
        }}
        position="static"
      >
        {/* <Container> */}
        <Toolbar>
          <Image src="/logo.png" height={40} width={100}></Image>
          <Box sx={{ flexGrow: 1 }} />

          {/* <Box sx={{ flexGrow: 1 }} /> */}

          <Box
            sx={{
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            <NavLink href="/about">
              <Typography>{t("About Us")}</Typography>
            </NavLink>
            <NavLink href="/contact_us">
              <Typography>Contact Us</Typography>
            </NavLink>
            <NavSelect Title="Account" Data={myAccount} />
            {/* <FormControl sx={{ m: 1, minWidth: 80 }}>
                <TextField
                  select
                  // value={age}
                  // onChange={handleChange}
                  defaultValue={10}
                  variant="standard"
                  InputProps={{
                    disableUnderline: true,
                    "aria-label": "Without label",
                  }}
                >
                  <MenuItem value={10}>Ten</MenuItem>
                  <MenuItem value={20}>Twenty</MenuItem>
                  <MenuItem value={30}>Thirty</MenuItem>
                </TextField>
              </FormControl> */}
            <NavSelect Title="Currency" Data={currencyData} />
            <NavSelect Title="Language" Data={languageData} />
            <SignInModal show={showLogin} close={() => setShowLogin(false)} />
          </Box>
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
        {/* </Container> */}
      </AppBar>
      {renderMobileMenu}
      {renderMenu}{" "}
    </Box>
  );
}
