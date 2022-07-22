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
import { InputAdornment } from "@mui/material";
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
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import Categories from "./Components/Categories";

export default function NavBar() {
  const category = useSelector((state) => state.category.categoryData);
  //const [quantityProduct,setQunatityProduct]=useState()
  const { cartTotalQuantity } = useSelector((state) => state.basket.cart);
  const { searchHintData, searchDetail } = useSelector(
    (state) => state.product
  );

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

  useEffect(() => {
    dispatch(getTotalCartQuantity());
  }, []);

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

  function handleInputChange(event, value) {
   
    dispatch(getProductSearchWithHint(value));
  }

  async function handleInputClick(e) {
   
   let result=await dispatch(getProductSearch(e.target.value));
     
  }

  // useEffect(() => {
  //   viewCategory();
  // }, []);
  // ----------------------------------------------------------------------------------
  const open1 = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const categories = (
    <List>
      {categoriesData &&
        categoriesData?.map((text, index) => (
          <MenuItem
            key={text.category_id}
            disablePadding
            sx={{ marginLeft: 3 }}
          >
            <ListItemText
              primary={text.category_name}
              onClick={(e) => viewCategory(text.category_id)}
            />
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
            <Box>
              <Categories
                startIcon={<WidgetsIcon />}
                Title="Categories"
                Data={categories}
              />
            </Box>

            <Box sx={{ flexGrow: 0.5 }} />

            <Stack
              spacing={2}
              sx={{
                px: "10px",
                // pl: "20px",
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

                options={searchHintData?searchHintData:''}
                onInputChange={handleInputChange}
                onKeyUp={handleInputClick}
                renderInput={(params) => (
                  <TextField
                    // InputProps={{ disableUnderline: true }}

                    {...params}
                    placeholder="Search Product and Brand ...."
                    variant="standard"
                    // color="primary"
                    color="primary"
                    focused
                    InputProps={{
                      ...params.InputProps,
                      endAdornment: (
                        <InputAdornment position="end">
                          {" "}
                          <SearchIcon />
                        </InputAdornment>
                      ),
                      disableUnderline: true,
                    }}
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
                  horizontal: "center",
                }}
                //  keepMounted={true}
                // hideBackdrop={true}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                //keepMounted={true}
                // anchorOrigin={{
                //   vertical: "bottom",
                //   horizontal: "left"62
                // }}
              >
                {cartTotalQuantity > 0 ? (
                  // <div>
                  <ShoppingCart />
                ) : (
                  // </div>
                  <Box
                    sx={{
                      height: 50,
                      p: 1,
                      // m: 1,
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
                  </Box>
                )}
                {/* <ShoppingCart /> */}
              </Popover>
            </div>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
}
