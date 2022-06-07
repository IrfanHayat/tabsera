import  React,{useState} from "react";
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
import Menu from "@mui/material/Menu";

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
// import AccountBoxIcon from "@mui/icons-material/AccountBox";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import { addToBasket } from "../slice/basketSlice";
import { getProduct } from "../slice/productSlice";
import NewCarousel from "./Carousel/NewCarousel";
import CarouselApp from "./Carousel/Carousel";
// import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
// import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
// import ReceiptIcon from "@mui/icons-material/Receipt";
// import AdUnitsIcon from "@mui/icons-material/AdUnits";
// import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
// import { addToBasket } from "../slice/basketSlice";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
// import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";

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
  width: "50%",
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
  console.log("product")
  let [groupProduct,setGroupedProduct]=useState()
  console.log(product);
  console.log("------------")
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let { t } = useTranslation();
  let router = useRouter();
  let dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  // const isMdUp = useMediaQuery(theme.breakpoints.up("md"));
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

  // const handleDrawerOpen = () => {
  //   setOpen(true);
  // };

  // const handleDrawerClose = () => {
  //   setOpen(false);
  // };

  const viewProduct = (item) => {
    router.push({
      pathname: "/product_detail",
      query: { productId: item.productId },
    });
  };

  const addToCartHandler = (product) => {
    dispatch(addToBasket(product));
    router.push("/cart");
  };

  //groupBy
  function groupArrayOfObjects(list, key) {
    return list.reduce(function(rv, x) {
      (rv[x[key].split(' ').join('')] = rv[x[key].split(' ').join('')] || []).push(x);
     // console.log(rv[x[key]])
      return rv;
    }, {});
  };

  React.useEffect(async ()=>{
       dispatch(getProduct()) 
       console.log("product")
  console.log(product);
  console.log("------------")
       var groupedCategory=groupArrayOfObjects(product,"categoryName");
       console.log('groupedCategory')
       console.log(groupedCategory)
       setGroupedProduct(groupedCategory)

  },[])
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
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

  const menuId = "primary-search-account-menu";
  // ----------------------------------------------------------------------------------

  const drawer = (
    <div>
      {/* <Toolbar /> */}
      {/* <Typography variant="h5" alignContent="center">
        My Account
      </Typography> */}
      <Toolbar>
        <Typography variant="h5" alignContent="center">
          My Account
        </Typography>
      </Toolbar>
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
      <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
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
        <InputLabel id="demo-simple-select-label">
          {" "}
          {t("common:Language")}
        </InputLabel>
        <Select>
          {router.locales.map((locale) => (
            <Link href={router.asPath} key={locale} locale={locale}>
              <MenuItem>{locale}</MenuItem>
            </Link>
          ))}
        </Select>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <ShoppingCartOutlinedIcon />
        </IconButton>
        <p>My Cart</p>
      </MenuItem>

      <MenuItem>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  React.useEffect(async () => {
    await dispatch(getProduct());
  }, []);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{ mr: 0, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Tijari
          </Typography>

          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              // mr: 1,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Tijari
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

          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", md: "flex" } }}>
            <InputLabel id="demo-simple-select-label">Language</InputLabel>
            <Select>
              {router.locales.map((locale) => (
                <Link href={router.asPath} key={locale} locale={locale}>
                  <MenuItem>{locale}</MenuItem>
                </Link>
              ))}
            </Select>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <ShoppingCartOutlinedIcon />
            </IconButton>

            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
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
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          // container={container}
          variant="temporary"
          open={open}
          onClose={toggleDrawer}
          // open={mobileOpen}
          // onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {/* <DrawerHeader> */}
          {/* <Typography variant="h5" alignContent="center">
              {" "}
              My Account
            </Typography> */}
          {/* </DrawerHeader> */}
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {/* <DrawerHeader> */}
          {/* <Typography variant="h5" alignContent="center">
              {" "}
              My Account
            </Typography> */}
          {/* </DrawerHeader> */}
          {drawer}
        </Drawer>
        {/* <Drawer
          variant={isMdUp ? "permanent" : "temporary"}
          anchor="left"
          open={open}
          onClose={toggleDrawer}
          // width={drawerWidth}
        >
          <DrawerHeader>
            <Typography variant="h5" alignContent="center">
              {" "}
              My Account
            </Typography>
          </DrawerHeader>
          <div />
          <Divider />
        </Drawer> */}
      </Box>
      <Box
        // open={open}
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <DrawerHeader />
        <Grid item xs={12} md={12}>
          <NewCarousel
            product={
              product
                ? product.slice([0], [3]).map((item, i) => {
                    return item;
                  })
                : []
            }
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Item>
            <CarouselApp
              heading="Featured Products"
              product={
                product
                  ? product.slice([0], [10]).map((item, i) => {
                      return item;
                    })
                  : []
              }
              viewProduct={viewProduct}
              addToCartHandler={addToCartHandler}
            />
          </Item>
        </Grid>
        <Grid item xs={12} md={12}>
          <Item>
            <CarouselApp
              heading="All Products"
              product={product}
              viewProduct={viewProduct}
              addToCartHandler={addToCartHandler}
            />
          </Item>
        </Grid>
      </Box>
    </Box>
  );
}
