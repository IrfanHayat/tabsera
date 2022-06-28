import React, { useMemo, useEffect, useState } from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { useSelector, useDispatch } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import Link from "next/link";
import {useTranslation} from "react-i18next";
import MenuItem from "@mui/material/MenuItem";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
// import { getProduct } from "../../slice/productSlice";
// import { getTotalCartQuantity, getTotals } from "../../slice/basketSlice";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
// import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, FormControl, TextField, AppBar, Tooltip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { locales } from '../../../i18n.json'


import Chip from "@mui/material/Chip";
// import SignInModal from "../Login/SignIn";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
// import instance from "../../helper/axios/httpRequest";
// import { url, setHeaders } from "../../helper/axios/config";
// import ShoppingCart from "../../pages/cart/index";
import Image from "next/image";
// import logo from "../../public/logo.png";
import NavSelect from "./NavSelect";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import { ListItemIcon } from "@mui/material";
// import { ListItemText } from "@mui/material";
import ContentCopy from "@mui/icons-material/ContentCopy";
const drawerWidth = 10;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 24,
  backgroundColor: "#fafafa",
  "&:hover": {
    // backgroundColor: alpha(theme.palette.common.black, 0.25),
  },

  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(23),
    width: "60%",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "black",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  // color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "50ch",
    },
  },
}));

const NavLink = styled("a")(() => ({
  wrap: "noWrap",
  component: "a",
  fontFamily: "monospace",
  fontWeight: 300,
  color: "inherit",
  marginLeft: 50,
  textDecoration: "none",
  // necessary for content to be below app bar
}));

export default function TopNav(props) {
  const category = useSelector((state) => state.category.categoryData);
  //const [quantityProduct,setQunatityProduct]=useState()
  const { cartTotalQuantity } = useSelector((state) => state.basket.cart);
  const [open, setOpen] = React.useState(false);
  let { t,i18n } = useTranslation();
  let router = useRouter();
  let dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [categoriesData, setCategoriesData] = useState([]);

  

  const changeLanguageHandler = (lang) =>
  {  
    console.log(lang)
    i18n.changeLanguage(lang)
  }

  // useEffect(() => {
  //   dispatch(getTotalCartQuantity());
  //   // setQunatityProduct(result.payload)
  // }, []);


  const categoryData = (categories) => {
    setCategoriesData(categories);
  };

  useMemo(() => categoryData(category), [category && category]);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  // const handleProfileMenuOpen = (event) => {
  //   setAnchorEl(event.currentTarget);
  // };

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
      {locales.map((locale) => (
       <MenuItem>
            <ListItemText onClick={()=>changeLanguageHandler(locale)}> {locale}</ListItemText>
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
      <MenuItem alignText="center">
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
        <Toolbar>
          <NavLink href="/about_us">{t('About Us')}</NavLink>
          <NavLink href="/contact_us">Contact Us</NavLink>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            <NavSelect Title="Account" Data={myAccount} color="black" />
            <NavSelect Title="Currency" Data={currencyData} color="black" />
            <NavSelect Title="Language" Data={languageData} color="black" />
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
      </AppBar>
      {renderMobileMenu}
      {renderMenu}{" "}
    </Box>
  );
}
