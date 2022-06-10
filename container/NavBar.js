import React, { useMemo,useEffect, useState } from "react";
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

import { getCategory } from "../slice/categorySlice";


import Chip from "@mui/material/Chip";

const theme = createTheme({
  components: {
    MuiIcon: {
      styleOverrides: {
        root: {
          // Match 24px = 3 * 2 + 1.125 * 16
          // boxSizing: "content-box",
          // padding: 3,
          // fontSize: "1.125rem",
        },
      },
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

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

export default function NavBar() {
  
  const category = useSelector((state) => state.category.categoryData);
  const [open, setOpen] = React.useState(false);
  let { t } = useTranslation();
  let router = useRouter();
  let dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const [categoriesData,setCategoriesData]=useState([])

  
 const categoryData=(categories)=>{
     setCategoriesData(categories)
    
 }

   useMemo(() => categoryData(category), [category]);

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

  const menuId = "primary-search-account-menu";
  // ----------------------------------------------------------------------------------

  const myAccount = (
    <Box>
      <List>
        {categoriesData.map((text, index) => (
          <Link href={`/carousel`}>
            <ListItem key={text} disablePadding>
              <AccountBoxIcon />
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
              <FormatListBulletedIcon />
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["My Coupons"].map((text, index) => (
          <Link href={`/carousel`}>
            <ListItem key={text} disablePadding>
              <FormatListBulletedIcon />
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
              <ReceiptIcon />
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["My Topups"].map((text, index) => (
          <Link href={`/carousel`}>
            <ListItem key={text} disablePadding>
              <AdUnitsIcon />
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["Security"].map((text, index) => (
          <Link href={`/carousel`}>
            <ListItem key={text} disablePadding>
              <GppGoodOutlinedIcon />
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["About"].map((text, index) => (
          <Link href={`/carousel`}>
            <ListItem key={text} disablePadding>
              <InfoOutlinedIcon />
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["Help"].map((text, index) => (
          <Link href={`/carousel`}>
            <ListItem key={text} disablePadding>
              <HelpOutlineOutlinedIcon />
              <ListItemText primary={text} />
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {["Logout"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h5" alignContent="center">
          Shop By Categories
        </Typography>
      </Toolbar>
      {categoriesData.map((text, index) => (
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
    <Box sx={{ flexGrow: 1 }}>
      <CssBaseline />
      <AppBar
        style={{ height: "40px" }}
        sx={{
         // bgcolor: "green",
          // height: "65%",
          justifyContent: "center",
          padding: "5px",
        }}
        position="static"
        // sx={{
        //   // width: { sm: `calc(100% - ${drawerWidth}px)` },
        //   ml: { sm: `${drawerWidth}px` },
        // }}
      >
        <Toolbar>
          <NavLink href="/about_us">About Us</NavLink>
          <NavLink href="/contact_us">Contact Us</NavLink>
          <NavLink href="/">Store Location</NavLink>
          <NavLink href="/">Track Order</NavLink>
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
              ml: 1,
              // display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "black",
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
          <Button>Sign In</Button>
        </Toolbar>
      </AppBar>
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
          <ThemeProvider>
            <Chip
              onClick={toggleDrawer}
              icon={<MenuIcon />}
              label="Shop By Category"
            />
          </ThemeProvider>

          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
            // sx={{ mr: 0, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton> */}

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
            onClick={handleProfileMenuOpen}
            color="inherit"
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