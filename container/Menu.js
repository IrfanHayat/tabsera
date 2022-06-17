import React, { useMemo, useEffect, useState } from "react";
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
import { getProduct, getFeatureProduct } from "../slice/productSlice";
import { getCategory } from "../slice/categorySlice";
import NewCarousel from "./Carousel/NewCarousel";
import CarouselApp from "./Carousel/Carousel";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import MoreIcon from "@mui/icons-material/MoreVert";
import NavBar from "./NavBar";
import { useGetAllProductsQuery } from "../RTK/productApi";

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
  const { data, isLoading, isFetching, isError } = useGetAllProductsQuery();
  console.log(data);
  const product = useSelector((state) => state.product.productData);

  const featureProduct = useSelector(
    (state) => state.product.featureProductData
  );
  const category = useSelector((state) => state.category.categoryData);

  let [groupProduct, setGroupedProduct] = useState();
  let [productsValue, setProductsValue] = useState();

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  let { t } = useTranslation();
  let router = useRouter();
  let dispatch = useDispatch();

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
    console.log(data);
    dispatch(getFeatureProduct());

    dispatch(getCategory());
    if (data) {
      var groupedCategory = groupArrayOfObjects(data.response, "categoryName");
      setGroupedProduct(groupedCategory);
    }
  }, [product, data]);

  const categoryData = (category) => {
    let result1 =
      category &&
      category.map((result) => {
        if (result.child.length > 0) {
          return result.child;
        }
      });
    let result3 =
      category &&
      category.map((result) => {
        if (result.child.length > 0) {
          return result.category_name;
        }
      });

    let result2 = result1 && result1.filter((result) => result != undefined);
    let result4 = result3 && result3.filter((result) => result != undefined);

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
    }
  };

  useMemo(() => categoryData(category), [category && category && groupProduct]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  // ----------------------------------------------------------------------------------

  React.useEffect(async () => {
    await dispatch(getProduct());
  }, []);

  return (
    <Box>
      {/* <NavBar /> */}
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
              product={featureProduct}
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
              <Item key={key}>
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
