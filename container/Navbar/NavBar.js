import React, { useMemo, useEffect, useState } from "react";

// import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import WidgetsIcon from "@mui/icons-material/Widgets";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector, useDispatch } from "react-redux";
import { CssBaseline, InputAdornment } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import {
  getProduct,
  getProductSearchWithHint,
  getProductSearch,
} from "../../slice/productSlice";
import { getCategory } from "../../slice/categorySlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { AppBar, Grid, Stack, Typography } from "@mui/material";
import SignInModal from "../Login/SignIn";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import ShoppingCart from "../../pages/cart/index";
import Image from "next/image";
import NavSelect from "./Components/NavSelect";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TopNav from "./Components/TopNav";
import { ListItemIcon, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import { getTotalCartQuantity } from "../../slice/basketSlice";
// import { ListItemText } from "@mui/material";
const drawerWidth = 10;
import Paper from "@mui/material/Paper";
// import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import Categories from "./Components/Categories";
import NavDown from "./Components/NavDown";
import { header, footer } from "../../helper/config/config";
import { useRouter, withRouter } from "next/router";
import { loginUser } from "../../slice/authSlice";

export default function NavBar() {
  const category = useSelector((state) => state.category.categoryData);

  let router = useRouter();
  let { asPath } = useRouter();
  let dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [categoriesData, setCategoriesData] = useState([]);
  const theme = useTheme();
  const [openCategories, setOpenCategories] = React.useState(null);
  const openCat = Boolean(openCategories);
  // const [isTopNavActive, setIsTopNavActive] = useState(false);
  const [currentHost, setCurrentHost] = useState();

  const routers = useRouter();
  let isTopNavActive;
  // let href= "https://www.tabsera.com";

  useEffect(() => {
    //dispatch(getTotalCartQuantity());
    dispatch(getCategory());
    // setQunatityProduct(result.payload) 
    if (typeof window !== "undefined" &&  window.location !== window.parent.location) {
      const hostname = window.location.hostname;
      setCurrentHost(hostname);
      console.log(hostname)
   }
   if(routers.query?.userName!='' && routers.query?.pwd){
    console.log(routers.query?.userName)
    console.log(routers.query?.pwd)
      dispatch(loginUser(routers.query))
   }
  }, []);

  const categoryData = (categories) => {
    setCategoriesData(categories);
  };

  useEffect(() => {
    dispatch(getTotalCartQuantity());
  }, []);

  console.log();

  useMemo(() => categoryData(category), [category && category]);

  React.useEffect(async () => {
    await dispatch(getProduct());
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* {router.pathname === "/" ? */}
      {console.log(currentHost)}
      {console.log(asPath)}
      {console.log(header)}
      <CssBaseline />
      {currentHost != "137.74.4.23" && header != true ? (
        <>
          <TopNav />

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
            <Toolbar>
              <Image src="/logo.png" height={40} width={100}></Image>
              <Box component="div" sx={{ flexGrow: 1 }} />
              <SignInModal show={showLogin} close={() => setShowLogin(false)} />
            </Toolbar>
          </AppBar>
        </>
      ) : (
        ""
      )}
      <NavDown />
    </Box>
  );
}
