import React, { useMemo,useEffect, useState } from "react";
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
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Grid from "@mui/material/Grid";
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
import { addToBasket } from "../slice/basketSlice";
import { getProduct } from "../slice/productSlice";
import { getCategory } from "../slice/categorySlice";
import NewCarousel from "./Carousel/NewCarousel";
import CarouselApp from "./Carousel/Carousel";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import NavBar from "./NavBar";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

const drawerWidth = 10;

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
  const category = useSelector((state) => state.category.categoryData);

  let [groupProduct, setGroupedProduct] = useState();
  let [productsValue, setProductsValue] = useState();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let { t } = useTranslation();
  let router = useRouter();
  let dispatch = useDispatch();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
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

  const viewProduct = (item) => {
    router.push({
      pathname: "/product_detail",
      query: { productId: item.productId },
    });
  };

  const viewCategory = (item) => {
    router.push({
      pathname: "/sub_category",
      query: { sub_category: item },
    });
  };
  

  const addToCartHandler = (product) => {
    dispatch(addToBasket(product));
    router.push("/cart");
  };



  //groupBy
  function groupArrayOfObjects(list, key, category1) {
    return list.reduce(function (rv, x) {
      rv[x[key].split(" ").join("")] = rv[x[key].split(" ").join("")] || [];
      rv[x[key].split(" ").join("")].push(x);
      //  console.log(x)
      return rv;
    }, {});
  }

  useEffect(() => {
    // dispatch(getProduct());
    //
    dispatch(getCategory());

    var groupedCategory = groupArrayOfObjects(product, "categoryName");
    setGroupedProduct(groupedCategory);
  }, [product && product]);




  const categoryData = (category) => {
    let result1 = category?.map((result) => {
      if (result.child.length > 0) {
        return result.child;
      }
    });
    let result3 = category?.map((result) => {
      if (result.child.length > 0) {
        return result.category_name;
      }
    });

    let result2 = result1.filter((result) => result != undefined);
    let result4 = result3.filter((result) => result != undefined);
   
    if (groupProduct) {
      let result5 = Object.keys(groupProduct).map((pro) => {
        if (pro == result4.toString().split(" ").join("")) {
          let result = groupProduct[pro].concat(result2[0]);
          groupProduct[pro] = result;
          return groupProduct;
        }
      });
      let result6 = result5.filter((result) => result != undefined);
      setGroupedProduct(result6[0]);

  }};

  useMemo(() => categoryData(category), [category && category]);

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
      <Toolbar>
        <Typography variant="h5" alignContent="center">
          My Account
        </Typography>
      </Toolbar>
      <List>
        {["Profile"].map((text, index) => (
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
    // <Box sx={{ display: "flex", marginBottom: "70px" }}>
    //   <CssBaseline />
    //   <AppBar
    //     position="fixed"
    //     sx={{
    //       // width: { sm: `calc(100% - ${drawerWidth}px)` },
    //       ml: { sm: `${drawerWidth}px` },
    //     }}
    //   >
    //     <Toolbar>
    //       <IconButton
    //         edge="start"
    //         color="inherit"
    //         aria-label="open drawer"
    //         onClick={toggleDrawer}
    //         // sx={{ mr: 0, display: { sm: "none" } }}
    //       >
    //         <MenuIcon />
    //       </IconButton>

    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="a"
    //         href="/"
    //         sx={{
    //           mr: 2,
    //           display: { xs: "none", md: "flex" },
    //           fontFamily: "monospace",
    //           fontWeight: 700,
    //           letterSpacing: ".3rem",
    //           color: "inherit",
    //           textDecoration: "none",
    //         }}
    //       >
    //         Tabsera
    //       </Typography>

    //       <Typography
    //         variant="h6"
    //         noWrap
    //         component="a"
    //         href=""
    //         sx={{
    //           // mr: 1,
    //           display: { xs: "flex", md: "none" },
    //           flexGrow: 1,
    //           fontFamily: "monospace",
    //           fontWeight: 700,
    //           letterSpacing: ".1rem",
    //           color: "inherit",
    //           textDecoration: "none",
    //         }}
    //       >
    //         Tabsera
    //       </Typography>

    //       <Box sx={{ flexGrow: 1 }} />
    //       <Box sx={{ display: { xs: "none", md: "flex" } }}>
    //         <InputLabel id="demo-simple-select-label">Language</InputLabel>
    //         <Select>
    //           {router.locales.map((locale) => (
    //             <Link href={router.asPath} key={locale} locale={locale}>
    //               <MenuItem>{locale}</MenuItem>
    //             </Link>
    //           ))}
    //         </Select>

    //         <IconButton
    //           size="large"
    //           edge="end"
    //           aria-label="account of current user"
    //           aria-controls={menuId}
    //           aria-haspopup="true"
    //           onClick={handleProfileMenuOpen}
    //           color="inherit"
    //         >
    //           <ShoppingCartOutlinedIcon />
    //         </IconButton>

    //         <IconButton
    //           size="large"
    //           edge="end"
    //           aria-label="account of current user"
    //           aria-controls={menuId}
    //           aria-haspopup="true"
    //           onClick={handleProfileMenuOpen}
    //           color="inherit"
    //         >
    //           <AccountCircle />
    //         </IconButton>
    //       </Box>
    //       <Box sx={{ display: { xs: "flex", md: "none" } }}>
    //         <IconButton
    //           size="large"
    //           aria-label="show more"
    //           aria-controls={mobileMenuId}
    //           aria-haspopup="true"
    //           onClick={handleMobileMenuOpen}
    //           color="inherit"
    //         >
    //           <MoreIcon />
    //         </IconButton>
    //       </Box>
    //     </Toolbar>

    //     <Box bgcolor="text.disabled">
    //       <Search>
    //         <SearchIconWrapper>
    //           <SearchIcon />
    //         </SearchIconWrapper>
    //         <StyledInputBase
    //           placeholder="Search…"
    //           inputProps={{ "aria-label": "search" }}
    //         />
    //       </Search>
    //     </Box>
    //   </AppBar>
    //   {renderMobileMenu}
    //   {renderMenu}{" "}
    //   <Box
    //     component="nav"
    //     sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    //     aria-label="mailbox folders"
    //   >
    //     <Drawer
    //       variant="temporary"
    //       open={open}
    //       onClose={toggleDrawer}
    //       ModalProps={{
    //         keepMounted: true,
    //         // Better open performance on mobile.
    //       }}
    //     >
    //       {drawer}
    //     </Drawer>
    //   </Box>

    <Box>
      <NavBar />
      <Box
        // open={open}
        component="main"
        sx={{
          flexGrow: 1,
          // p: 3,
          // width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        {/* <DrawerHeader /> */}
        <Grid xs={12} md={12}>
          <NewCarousel
            product={
              product &&
              product.slice([5], [9]).map((item, i) => {
                return item;
              })
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

        {/* <Grid item xs={12} md={12}>
          <Item>
            <CarouselApp
              heading="All Products"
              product={product}
              viewProduct={viewProduct}
              addToCartHandler={addToCartHandler}
            />
          </Item>
        </Grid> */}
        {console.log(groupProduct)}
        {/* <Grid item xs={12} md={12}>
          <Item>
            <CarouselApp
              heading="All Products"
              product={productsValue}
              viewProduct={viewProduct}
              addToCartHandler={addToCartHandler}
            />
          </Item>
        </Grid> */}
        {groupProduct &&
          Object.keys(groupProduct).map((key) => (
            <Grid item xs={12} md={12}>
              <Item>
                <CarouselApp
                  heading={key}
                  product={groupProduct[key]}
                  viewProduct={viewProduct}
                  addToCartHandler={addToCartHandler}
                  viewCategory={viewCategory}
                />
              </Item>
            </Grid>
          ))}
      </Box>
    </Box>
  );
}
