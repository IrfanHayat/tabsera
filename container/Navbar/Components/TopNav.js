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
import { AppBar } from "@mui/material";
import * as locales from "../../../i18n.json";

import NavSelect from "./NavSelect";
import { ListItemIcon } from "@mui/material";
import { Container } from "@mui/system";
import {logoutUser} from '../../../slice/authSlice';
import Cookies from 'js-cookie';


const NavLink = styled("a")(() => ({
  wrap: "noWrap",
  component: "a",
  fontFamily: "monospace",
  fontWeight: 300,
  color: "inherit",
  marginLeft: 50,
  ":hover": {
    // textDecoration: "underline",
    color: "blue",

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
  const router=useRouter()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [categoriesData, setCategoriesData] = useState([]);
  const dispatch =useDispatch()

  const theme = useTheme();

  const changeLanguageHandler = (lang) => {
    console.log(lang);
    i18n.changeLanguage(lang);
    document.body.dir = i18n.dir();
    theme.direction = i18n.dir();
  };

  const categoryData = (categories) => {
    setCategoriesData(categories);
  };

  useMemo(() => categoryData(category), [category && category]);

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
   const logOut=()=>{
         dispatch(logoutUser())
         Cookies.remove('connect.sid');
         router.push('/login')

   } 
  // const open1 = Boolean(anchorEl);

  const menuId = "primary-search-account-menu";
  // ----------------------------------------------------------------------------------
  const open1 = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

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
      {locales?.locales.map((locale) => (
        <MenuItem>
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
      <MenuItem onClick={()=>logOut()} alignText="center">
        <ListItemText >Logout</ListItemText>
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

  // React.useEffect(async () => {
  //   await dispatch(getProduct());
  // }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        style={{ height: "40px" }}
        sx={{
          justifyContent: "center",
          padding: "5px",
          // bgcolor: "#f6f9fc",
          bgcolor: "white",
          color: "black",
        }}
        position="static"
      >
        <Container>
          <Toolbar>
            <NavLink href="/about_us">{t("About Us")}</NavLink>
            <NavLink href="/contact_us">Contact Us</NavLink>

            <Box sx={{ flexGrow: 1 }} />

            <Box
              sx={{
                display: { xs: "none", md: "flex", justifyContent: "center" },
              }}
            >
              <NavSelect Title="Account" Data={myAccount} />
              <NavSelect Title="Currency" Data={currencyData} />
              <NavSelect Title="Language" Data={languageData} />
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
        </Container>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}{" "}
    </Box>
  );
}
