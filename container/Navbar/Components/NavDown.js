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
import Cookies from "js-cookie";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import {
  getProduct,
  getProductSearchWithHint,
  getProductSearch,
} from "../../../slice/productSlice";
import { getCategory } from "../../../slice/categorySlice";
import { getCampaigns } from "../../../slice/campaignsSlice";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { AppBar, Grid, Stack, Typography } from "@mui/material";
import SignInModal from "../../Login/SignIn";
import Badge from "@mui/material/Badge";
import Popover from "@mui/material/Popover";
import ShoppingCart from "../../../pages/cart/index";
import Image from "next/image";
import NavSelect from "../Components/NavSelect";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import TopNav from "../Components/TopNav";
import { ListItemIcon, useTheme } from "@mui/material";
import { Container } from "@mui/system";
import { getTotalCartQuantity } from "../../../slice/basketSlice";
// import { ListItemText } from "@mui/material";
const drawerWidth = 10;
import Paper from "@mui/material/Paper";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";
import Menu from "@mui/material/Menu";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import Categories from "../Components/Categories";
import { makeStyles } from "@mui/styles";
import localStorage from "localStorage";
import Link from "@mui/material/Link";
import styles from "../../../styles/navbar.module.css";

// const useStyles = makeStyles({
//   root: {
//     background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
//     border: 0,
//     borderRadius: 3,
//     boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
//     color: "white",
//     height: 48,
//     padding: "0 30px",
//   },
// });

export default function NavDown(props) {
  const category = useSelector((state) => state.category.categoryData);
  //const [quantityProduct,setQunatityProduct]=useState()
  const { cartTotalQuantity } = useSelector((state) => state.basket.cart);
  const { campaignsData } = useSelector((state) => state.campaigns);
  const { searchHintData, searchDetail } = useSelector(
    (state) => state.product
  );

  const [open, setOpen] = React.useState(false);

  let router = useRouter();
  let dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [categoriesData, setCategoriesData] = useState([]);
  const [camapaigns, setCamapaigns] = React.useState(false);
  const [key, setKey] = useState(1);
  console.log("campaignsData,", campaignsData);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const logOut = async () => {
    let result = await dispatch(logOutCustomer());
    setIsLoggedIn(false);
    localStorage.setItem("login", "false");
    Cookies.remove("item");
    // Cookies.remove("connect.sid");
    router.push("/");
    console.log(result);
  };
  useEffect(() => {
    //dispatch(getTotalCartQuantity());
    dispatch(getCategory());
    dispatch(getCampaigns());

    // router.push({
    //   pathname: "/",
    //   query: { key: 1 },
    // });
    // setQunatityProduct(result.payload)
  }, []);

  useEffect(() => {
    console.log(cartTotalQuantity);
  }, cartTotalQuantity);

  const categoryData = (categories) => {
    setCategoriesData(categories);
  };

  useEffect(() => {
    dispatch(getTotalCartQuantity());
  }, []);

  useMemo(() => categoryData(category), [category && category]);

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

  function handleChangeCategoryAndCampaigns(key) {
    if (key == 1) {
      router.push({
        pathname: "/",
        query: { key: 1 },
      });
    }
    if (key == 2) {
      router.push({
        pathname: "/",
        query: { key: 2 },
      });
    }
  }

  async function handleInputClick(e) {
    // let result = await dispatch(getProductSearch(e.target.value));
    // console.log(result);
    if (event.key === "Enter") {
      // Prevent's default 'Enter' behavior.
      event.defaultMuiPrevented = true;
      router.push({
        pathname: "/search",
        query: { data: e.target.value },
      });
      // your handler code
    }
  }

  // ----------------------------------------------------------------------------------
  const open1 = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  console.log(categoriesData, "categoriesData");
  const categories = (
    <List>
      {categoriesData &&
        categoriesData?.map((text, index) => (
          <>
            <MenuItem key={text.category_id} disablePadding sx={{ m: 1 }}>
              <ListItemIcon>
                <Image
                  src={text.category_image}
                  alt={text.category_name}
                  width={20}
                  height={20}
                ></Image>
                {/ {text.category_image} /}
              </ListItemIcon>
              <ListItemText
                primary={text.category_name}
                onClick={(e) => viewCategory(text.category_id)}
              />
            </MenuItem>
            <Divider />
          </>
        ))}
    </List>
  );

  const campaigns = (
    <List>
      {campaignsData &&
        campaignsData?.map((text, index) => (
          <>
            <MenuItem key={text.campaignId} disablePadding sx={{ m: 1 }}>
              <ListItemIcon>
                <Image
                  src={text.imageURL}
                  alt={text.campaignName}
                  width={20}
                  height={20}
                ></Image>
                {/ {text.category_image} /}
              </ListItemIcon>
              <ListItemText
                primary={text.campaignName}
                onClick={(e) => viewCampaing(text.campaignId)}
              />
            </MenuItem>
            <Divider />
          </>
        ))}
    </List>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar className={styles.navDown} position="sticky">
        <Toolbar>
          <Link
            sx={{
              ":hover": {
                // boxShadow: 20, // theme.shadows[20]
                // transform: "scale(1.1)",
                // color: "yellow",
                // transformOrigin: "bottomleft",
                // opacity: 0.5,
                cursor: "pointer",
              },
            }}
          >
            <Image
              src="/bigLogo.png"
              alt="/bigLogo.png"
              height="100px"
              width="220px"
              objectFit="contain"
              // onMouseOver={cu}

              onClick={() => router.push("/")}
            ></Image>
          </Link>
          {/* <FormControl sx={{ m: 1, minWidth: 80 }}>
            <TextField
              select
              // value={age}
              // onChange={handleChange}
              // startIcon={<WidgetsIcon />}
              defaultValue={10}
              variant="standard"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <WidgetsIcon />
                  </InputAdornment>
                ),
                disableUnderline: true,
                "aria-label": "Without label",
              }}
            >
              <MenuItem
                value={10}
                onClick={() => handleChangeCategoryAndCampaigns(2)}
              >
                Campaigns
              </MenuItem>
              <Divider />
              <MenuItem
                value={20}
                onClick={() => handleChangeCategoryAndCampaigns(1)}
              >
                Categories
              </MenuItem>
            </TextField>
          </FormControl> */}
          <Box
            sx={{
              display: "flex",
              // my: 2,
              overflow: "hidden",

              flexDirection: { xs: "column", md: "row" },
            }}
          ></Box>
          <Box sx={{ flexGrow: 1 }} />

          <Stack spacing={2} className={styles.searchBar}>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              // disableClearable
              // popupIcon={<SearchIcon />}
              options={searchHintData ? searchHintData : []}
              onInputChange={handleInputChange}
              onKeyDown={handleInputClick}
              renderInput={(params) => (
                <TextField
                  // InputProps={{ disableUnderline: true }}

                  {...params}
                  placeholder="Search Product and Brand ...."
                  variant="standard"
                  sx={{ borderColor: "primary.main" }}
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

          <SignInModal
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            show={showLogin}
            logOut={logOut}
            close={() => setShowLogin(false)}
          />
          <div>
            <IconButton
              aria-describedby={id}
              variant="contained"
              onClick={handleClick}
              color="primary"

              // onMouseEnter={handleClick}
              // onMouseLeave={handleClick}
            >
              {console.log(localStorage.getItem("login"))}
              {console.log(cartTotalQuantity)}
              {localStorage.getItem("login") == "true" ? (
                <Badge
                  color="error"
                  badgeContent={
                    cartTotalQuantity != undefined ||
                    cartTotalQuantity != 0 ||
                    cartTotalQuantity
                      ? cartTotalQuantity
                      : 1
                  }
                  max={99}
                  className={styles.cartbadge}
                >
                  <ShoppingCartOutlinedIcon className={styles.cartIcon} />
                </Badge>
              ) : (
                <ShoppingCartOutlinedIcon />
              )}
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
            </Popover>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
