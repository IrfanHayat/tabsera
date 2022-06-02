import React, { useContext, useEffect, useState } from 'react';
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/Icon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/Inbox";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import MailIcon from "@mui/icons-material/Mail";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import ActionAreaCard from "../component/Card";
import Typography from "@mui/material/Typography";
import { useSelector, useDispatch } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import MenuItem from "@mui/material/MenuItem";
import { Button } from "@mui/material";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import { addToBasket } from "../slice/basketSlice";
import { getProduct } from "../slice/productSlice";
import NewCarousel from "./Carousel/NewCarousel";
import CarouselApp from "./Carousel/Carousel";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
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
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "30ch",
    },
  },
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));
const menuId = "primary-search-account-menu";
const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const product = useSelector((state) => state.product.productData);
  console.log(product);
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let { t } = useTranslation();
  let router = useRouter();
  let dispatch = useDispatch();

  
   useEffect(() => {
    console.log('I am, hwerer')
  
    dispatch(getProduct()) 

  }, []);


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const viewProduct = (item) => {
    router.push({
      pathname: "/product_detail",
      query: { id: item.id },
    });
  };

  const addToCartHandler = (product) => {
    dispatch(addToBasket(product));
    router.push("/cart");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Amazon
          </Typography>

          {/* 
            <InputLabel variant="standard">Language</InputLabel>
            <NativeSelect defaultValue={30}>
              {router.locales.map((locale) => (
                <Link href={router.asPath} key={locale} locale={locale}>
                  <option value={10}>{locale}</option>
                </Link>
              ))}
            </NativeSelect>
          </FormControl> */}

          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search…"
              inputProps={{ "aria-label": "search" }}
            />
          </Search>

          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select>
            {router.locales.map((locale) => (
              <Link href={router.asPath} key={locale} locale={locale}>
                <MenuItem>{locale}</MenuItem>
              </Link>
            ))}
          </Select>

          <InputLabel id="demo-simple-select-autowidth-label">
            {t("common:Language")}
          </InputLabel>

          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            //   onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <ShoppingCartIcon />
          </IconButton>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            //   onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {["Profile"].map((text, index) => (
            <Link href={`/carousel`}>
              <ListItem key={text} disablePadding>
                {/* <ListItemIcon> */}
                <AccountBoxIcon />
                {/* </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["My Orders"].map((text, index) => (
            <Link href={`/carousel`}>
              <ListItem key={text} disablePadding>
                {/* <ListItemIcon> */}
                <FormatListBulletedIcon />
                {/* </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />{" "}
        <List>
          {["My Coupons"].map((text, index) => (
            <Link href={`/carousel`}>
              <ListItem key={text} disablePadding>
                {/* <ListItemIcon> */}
                <FormatListBulletedIcon />
                {/* </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />{" "}
        <List>
          {["My Bill Payments"].map((text, index) => (
            <Link href={`/carousel`}>
              <ListItem key={text} disablePadding>
                {/* <ListItemIcon> */}
                <ReceiptIcon />
                {/* </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />{" "}
        <List>
          {["My Topups"].map((text, index) => (
            <Link href={`/carousel`}>
              <ListItem key={text} disablePadding>
                {/* <ListItemIcon> */}
                <AdUnitsIcon />
                {/* </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />{" "}
        <List>
          {["Security"].map((text, index) => (
            <Link href={`/carousel`}>
              <ListItem key={text} disablePadding>
                {/* <ListItemIcon> */}
                <GppGoodOutlinedIcon />
                {/* </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />{" "}
        <List>
          {["About"].map((text, index) => (
            <Link href={`/carousel`}>
              <ListItem key={text} disablePadding>
                {/* <ListItemIcon> */}
                <InfoOutlinedIcon />
                {/* </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />{" "}
        <List>
          {["Help"].map((text, index) => (
            <Link href={`/carousel`}>
              <ListItem key={text} disablePadding>
                {/* <ListItemIcon> */}
                <HelpOutlineOutlinedIcon />
                {/* </ListItemIcon> */}
                <ListItemText primary={text} />
              </ListItem>
            </Link>
          ))}
        </List>
        <Divider />
        <List>
          {["Logout"].map((text, index) => (
            <ListItem key={text} disablePadding>
              {/* <ListItemIcon> */}
              {/* <MailIcon /> */}
              {/* </ListItemIcon> */}
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <Grid item xs={12} md={12}>
          <NewCarousel />
        </Grid>
        <Grid item xs={12} md={12}>
          <Item>
             <CarouselApp
              heading="Featured Products"
              product={product}
              viewProduct={viewProduct}
              addToCartHandler={addToCartHandler}
            />
          </Item>
        </Grid>
      </Main>
    </Box>
  );
}
