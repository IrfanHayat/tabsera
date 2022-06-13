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
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import { useSelector, useDispatch } from "react-redux";
import AccountCircle from "@mui/icons-material/AccountCircle";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import { useRouter } from "next/router";
import Link from "next/link";
import useTranslation from "next-translate/useTranslation";
import MenuItem from "@mui/material/MenuItem";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import { getProduct } from "../slice/productSlice";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Button, FormControl, TextField, AppBar } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Modal from "./Modal/Modal";
import Chip from "@mui/material/Chip";
import SignInModal from "./Login/SignIn";

const drawerWidth = 10;

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: 24,
  borderColor: "black",
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
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
  const [open, setOpen] = React.useState(false);
  let { t } = useTranslation();
  let router = useRouter();
  let dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [categoriesData, setCategoriesData] = useState([]);

  const categoryData = (categories) => {
    setCategoriesData(categories);
  };

  useMemo(() => categoryData(category), [category && category]);

  // const openModal = () => {
  //   setShowLogin(true);
  // };
  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setOpen(!open);
  };

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

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const menuId = "primary-search-account-menu";
  // ----------------------------------------------------------------------------------

  const myAccount = (
    <Box>
      <MenuItem>
        <Link href={`/carousel`}>
          <ListItem key="My Profile" disablePadding>
            <AccountBoxIcon />
            <ListItemText primary="My Profile" />
          </ListItem>
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Link href={`/carousel`}>
          <ListItem key="My Orders" disablePadding>
            <FormatListBulletedIcon />
            <ListItemText primary="My Orders" />
          </ListItem>
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Link href={`/carousel`}>
          <ListItem key="My Coupons" disablePadding>
            <FormatListBulletedIcon />
            <ListItemText primary="My Coupons" />
          </ListItem>
        </Link>
      </MenuItem>
      <Divider />{" "}
      <MenuItem>
        <Link href={`/carousel`}>
          <ListItem key="My Bill Payments" disablePadding>
            <ReceiptIcon />
            <ListItemText primary="My Bill Payments" />
          </ListItem>
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Link href={`/carousel`}>
          <ListItem key="My Topups" disablePadding>
            <AdUnitsIcon />
            <ListItemText primary="My Topups" />
          </ListItem>
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Link href={`/carousel`}>
          <ListItem key="Security" disablePadding>
            <GppGoodOutlinedIcon />
            <ListItemText primary="Security" />
          </ListItem>
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Link href={`/carousel`}>
          <ListItem key="About" disablePadding>
            <InfoOutlinedIcon />
            <ListItemText primary="About" />
          </ListItem>
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <Link href={`/carousel`}>
          <ListItem key="Help" disablePadding>
            <HelpOutlineOutlinedIcon />
            <ListItemText primary="Help" />
          </ListItem>
        </Link>
      </MenuItem>
      <Divider />
      <MenuItem>
        <ListItem key="Logout" disablePadding>
          <ListItemText primary="Logout" />
        </ListItem>
      </MenuItem>
    </Box>
  );

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h5" alignContent="center">
          Shop By Categories
        </Typography>
      </Toolbar>
      {categoriesData?.map((text, index) => (
        <List>
          <Link href={`/carousel`}>
            <ListItem key={text.category_id} disablePadding>
              {/* <AccountBoxIcon /> */}
              <ListItemText primary={text.category_name} />
            </ListItem>
          </Link>
          <Divider />
        </List>
      ))}
    </Box>
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
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">My Account</InputLabel>
          <Select labelId="demo-select-small" id="demo-select-small">
            {myAccount}
          </Select>
        </FormControl>
      </MenuItem>

      <MenuItem>
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-select-small">Currency</InputLabel>
          <Select labelId="demo-select-small" id="demo-select-small">
            <MenuItem value={10}>Rupee</MenuItem>
            <MenuItem value={20}>Dollar</MenuItem>
            <MenuItem value={30}>Ponds</MenuItem>
          </Select>
        </FormControl>
      </MenuItem>

      <MenuItem>
        {/* <InputLabel id="demo-simple-select-label">
          {" "}
          {t("common:Language")}
        </InputLabel> */}

        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="demo-simple-select-label">Language</InputLabel>
          <Select>
            {router.locales.map((locale) => (
              <Link href={router.asPath} key={locale} locale={locale}>
                <MenuItem>{locale}</MenuItem>
              </Link>
            ))}
          </Select>
        </FormControl>
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
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        style={{ height: "40px" }}
        sx={{
          justifyContent: "center",
          padding: "5px",
        }}
        position="static"
      >
        <Toolbar>
          <NavLink href="/about_us">About Us</NavLink>
          <NavLink href="/contact_us">Contact Us</NavLink>
          {/* <NavLink href="/">Store Location</NavLink> */}
          {/* <NavLink href="/">Track Order</NavLink> */}
          <NavLink href="/">Blog</NavLink>

          <Box sx={{ flexGrow: 1 }} />

          <Box
            sx={{
              display: { xs: "none", md: "flex", justifyContent: "center" },
            }}
          >
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">My Account</InputLabel>
              <Select labelId="demo-select-small" id="demo-select-small">
                {myAccount}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small">Currency</InputLabel>
              <Select labelId="demo-select-small" id="demo-select-small">
                <MenuItem value={10}>Rupee</MenuItem>
                <MenuItem value={20}>Dollar</MenuItem>
                <MenuItem value={30}>Ponds</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-simple-select-label">Language</InputLabel>
              <Select>
                {router.locales.map((locale) => (
                  <Link href={router.asPath} key={locale} locale={locale}>
                    <MenuItem>{locale}</MenuItem>
                  </Link>
                ))}
              </Select>
            </FormControl>
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
      <AppBar
        sx={{
          bgcolor: "#bdbdbd",
          // height: "65%",
          justifyContent: "center",
          padding: "5px",
        }}
        position="static"
      >
        <Toolbar>
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
            Tabsera
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
            Tabsera
          </Typography>
          <Box component="div" sx={{ flexGrow: 1 }} />

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

          {/* <Modal
            buttonText="Sign IN"
            heading="Sign In"
            dialogContentText={<SignIn />}
            buttonCancel={
              <Button onClick={handleClose} autoFocus>
                Cancel
              </Button>
            }
          ></Modal> */}

          {/* <Button onClick={() => setShowLogin(true)}>Sign In</Button> */}
          <SignInModal show={showLogin} close={() => setShowLogin(false)} />
        </Toolbar>
      </AppBar>
      <AppBar
        sx={{
          bgcolor: "#fafafa",
          // height: "65%",
          justifyContent: "center",
          padding: "5px",
        }}
        position="static"
      >
        <Toolbar>
          <ThemeProvider>
            <Chip
              onClick={toggleDrawer}
              icon={<MenuIcon />}
              label="Shop By Category"
            />
          </ThemeProvider>

          <Box component="div" sx={{ flexGrow: 1 }} alignItems="center">
            <Search borderColor="Black">
              <SearchIconWrapper>
                <SearchIcon />
              </SearchIconWrapper>
              <StyledInputBase
                placeholder="Search…"
                inputProps={{ "aria-label": "search" }}
              />
            </Search>
          </Box>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            color="primary"
          >
            <ShoppingCartOutlinedIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={open}
          onClose={toggleDrawer}
          ModalProps={{
            keepMounted: true,
            // Better open performance on mobile.
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
