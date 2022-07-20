import React, { useMemo, useEffect, useState } from "react";
// import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
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

import MenuItem from "@mui/material/MenuItem";
import { getProduct } from "../../slice/productSlice";
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
import {getTotalCartQuantity} from '../../slice/basketSlice'
// import { ListItemText } from "@mui/material";
const drawerWidth = 10;
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
export default function NavBar() {
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
  const [openCategories, setOpenCategories] = React.useState(null);
  const openCat = Boolean(openCategories);
  const handleClickCategories = (event) => {
    setOpenCategories(event.currentTarget);
  };
  const handleCloseCategories = () => {
    setOpenCategories(null);
  };

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const viewCategory1 = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    //dispatch(getTotalCartQuantity());
    dispatch(getCategory());
    // setQunatityProduct(result.payload)
  }, []);

  const categoryData = (categories) => {
    setCategoriesData(categories);
  };

  useEffect(()=>{
    dispatch(getTotalCartQuantity());
  },[])

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

  const viewCategory = (item) => {
    router.push({
      pathname: "/sub_category",
      query: { sub_category: item },
    });
  };

  // useEffect(() => {
  //   viewCategory();
  // }, []);
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
            <ListItemText
              primary={text.category_name}
              onClick={(e) => viewCategory(text.category_id)}
              // onClick={viewCategory(text.category_id)}
            />
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
        {/* <Grid */}
        <Container>
          <Grid Container>
            <Grid item md={12}>
              <Toolbar>
                <Image src="/logo.png" height={40} width={100}></Image>

                <Box component="div" sx={{ flexGrow: 1 }} />
                <SignInModal
                  show={showLogin}
                  close={() => setShowLogin(false)}
                />
              </Toolbar>
            </Grid>
          </Grid>
          <Toolbar>
            {/* <ThemeProvider>
            <Chip
              sx={{ color: "white" }}
              onClick={toggleDrawer}
              icon={<MenuIcon />}
              label="Shop By Category"
            />
          </ThemeProvider> */}
            {/* <Grid Container> */}
            {/* <Grid item md={1} sm={1}> */}
            <Box>
              {/* <Button
                id="basic-button"
                aria-controls={openCat ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openCat ? "true" : undefined}
                onClick={handleClickCategories}
                // color="white"
                sx={{ color: "white" }}
              >
                Categories
              </Button>
              <Menu
                id="basic-menu"
                openCategories={openCategories}
                open={openCat}
                onClose={handleCloseCategories}
                MenuListProps={{
                  "aria-labelledby": "basic-button",
                }}
              >
                <MenuItem onClick={handleCloseCategories}>{drawer}</MenuItem>
              </Menu> */}
              <MenuItem>
                <ListItemIcon>
                  <MenuIcon />
                </ListItemIcon>
                <ListItemText>
                  <NavSelect Title="Categories" Data={drawer} />
                </ListItemText>
              </MenuItem>
            </Box>

            <Box sx={{ flexGrow: 0.5 }} />

            {/* <Paper
              // dir="rtl"
              component="form"
              sx={
                {
                  // p: "2px 4px",
                  // display: "flex",
                  // alignItems: "center",
                  // width: "60%",
                  // height: "40px",
                  // border: "0.5px solid black",
                  // borderRadius: 24,
                }
              }
            > */}
            <Stack
              spacing={2}
              sx={{
                px: "10px",
                width: "60%",
                bgcolor: "white",
                height: "40px",
                justifyContent: "center",
                borderRadius: 24,
                border: "none",
              }}
            >
              <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                // disableClearable
                // popupIcon={<SearchIcon />}
                options={[
                  { title: "The Shawshank Redemption", year: 1994 },
                  { title: "The Godfather", year: 1972 },
                  { title: "The Godfather: Part II", year: 1974 },
                  { title: "The Dark Knight", year: 2008 },
                  { title: "12 Angry Men", year: 1957 },
                  { title: "Schindler's List", year: 1993 },
                  { title: "Pulp Fiction", year: 1994 },
                ].map((option) => option.title)}
                renderInput={(params) => (
                  <TextField
                    // InputProps={{ disableUnderline: true }}
                    {...params}
                    placeholder="Search...."
                    variant="standard"
                    // color="primary"
                    color="primary"
                    // focused
                    // InputProps={{
                    //   disableUnderline: true,
                    // }}
                  />
                )}
              />
            </Stack>
            <Box sx={{ flexGrow: 1 }} />

            <div>
              <IconButton
                aria-describedby={id}
                variant="contained"
                onClick={handleClick}
                color="inherit"
                
                // onMouseEnter={handleClick}
                // onMouseLeave={handleClick}
              >
                <Badge color="error"  badgeContent={cartTotalQuantity} max={99}>
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
             // keepMounted={true}
              // hideBackdrop={true}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                //keepMounted={true}
                // anchorOrigin={{
                //   vertical: "bottom",
                //   horizontal: "left"62
                // }}
              >
                {/* {cartTotalQuantity > 0 ? ( */}
                <div>
                <ShoppingCart />
                </div>
                {/* ) : ( */}
                {/* <Box
                    sx={{
                      height: 50,
                      width: 200,
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography variant="body" color="error">
                      There are no items in this cart
                    </Typography>
                  </Box> */}
                {/* )} */}
                {/* <ShoppingCart /> */}
              </Popover>
            </div>
            {/* </Grid> */}
            {/* </Grid> */}
          </Toolbar>
        </Container>
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
