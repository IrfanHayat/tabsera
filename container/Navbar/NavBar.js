import React, { useMemo, useEffect, useState } from "react";
import { styled, alpha } from "@mui/material/styles";
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
import { locales } from '../../i18n.json'
import Link from "next/link";
// import useTranslation from "next-translate/useTranslation";
import MenuItem from "@mui/material/MenuItem";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import { getProduct } from "../../slice/productSlice";
import { getCategory } from "../../slice/categorySlice";
import { getTotalCartQuantity, getTotals } from "../../slice/basketSlice";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, FormControl, TextField, AppBar, Tooltip } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Chip from "@mui/material/Chip";
import SignInModal from "../Login/SignIn";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import instance from "../../helper/axios/httpRequest";
import { url, setHeaders } from "../../helper/axios/config";
import ShoppingCart from "../../pages/cart/index";
import Image from "next/image";
import logo from "../../public/logo.png";
import NavSelect from "./Components/NavSelect";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import  TopNav from './Components/TopNav'
import { ListItemIcon,useTheme} from "@mui/material";
// import { ListItemText } from "@mui/material";
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

export default function NavBar(props) {
  const category = useSelector((state) => state.category.categoryData);
  //const [quantityProduct,setQunatityProduct]=useState()
  const { cartTotalQuantity } = useSelector((state) => state.basket.cart);
  const [open, setOpen] = React.useState(false);
  
  let router = useRouter();
  let dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [categoriesData, setCategoriesData] = useState([]);
  const theme = useTheme();
   
  

  useEffect( () => {
     dispatch(getTotalCartQuantity());
     dispatch(getCategory())
    // setQunatityProduct(result.payload)
  }, []);

  
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

  // const handleClickOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };
  

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // ----------------------------------------------------------------------------------
  const open1 = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const drawer = (
    <List>
      {/* <ListItemIcon>
        <AccountBoxIcon />
      </ListItemIcon> */}
      {/* <ListItemText>My Profile</ListItemText> */}
      {categoriesData &&
        categoriesData.map((text, index) => (
          <MenuItem
            key={text.category_id}
            disablePadding
            sx={{ marginLeft: 3 }}
          >
            {/* <ListItem
              key={text.category_id}
              disablePadding
              sx={{ marginLeft: 3 }}
            > */}
            <ListItemText primary={text.category_name} />
            {/* </ListItem> */}
            <Divider />
          </MenuItem>
        ))}
    </List>
  );

  React.useEffect(async () => {
    await dispatch(getProduct());
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TopNav />
      <AppBar
        sx={{
          color: "inherit",
          // bgcolor: "#bdbdbd",
          // height: "95%",
          // bgcolor: "#0277bd",
          justifyContent: "center",
          // padding: "5px",
        }}
        position="static"
      >
        <Toolbar>
          <Image src="/logo.png" height={40} width={100}></Image>

          <Box component="div" sx={{ flexGrow: 1 }} />
          <SignInModal show={showLogin} close={() => setShowLogin(false)} />
        </Toolbar>

        <Toolbar>
          {/* <ThemeProvider>
            <Chip
              sx={{ color: "white" }}
              onClick={toggleDrawer}
              icon={<MenuIcon />}
              label="Shop By Category"
            />
          </ThemeProvider> */}

          <MenuItem>
            <ListItemIcon>
              <MenuIcon />
            </ListItemIcon>
            <ListItemText>
              <NavSelect Title="Shop By Category" color="black" Data={drawer} />
            </ListItemText>
          </MenuItem>

          <Box component="div" sx={{ flexGrow: 1 }} alignItems="center">
            <Search sx={{ border: 1, borderColor: "text.primary" }}>
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <div>
            <IconButton
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              color="inherit"
              // onMouseEnter={handleClick}
              // onMouseLeave={handleClick}
            >
              <Badge color="error" badgeContent={cartTotalQuantity} max={99}>
                <ShoppingCartOutlinedIcon />
              </Badge>
              {/* </Tooltip> */}
            </IconButton>
            <Popover
              id={id}
              open={open1}
              anchorEl={anchorEl}
              onClose={handleClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
            >
              {/* <Typography sx={{ p: 1 }}> */} <ShoppingCart />
              {/* </Typography> */}
            </Popover>
          </div>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* <Drawer
          variant="temporary"
          open={open}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true,
          }}
        >
          {drawer}
        </Drawer> */}
      </Box>
    </Box>
  );
}
