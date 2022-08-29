import React, { useState, useMemo, useRef, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ActionAreaCard from "../../container/Card";
import {
  getProductWithCategoryId,
  getCategoryBrand,
  getCategory,
} from "../../slice/categorySlice";
import { useRouter, withRouter } from "next/router";
import { addToBasket, addToCart } from "../../slice/basketSlice";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { Divider, List } from "@mui/material";
import {
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  getProductSearchWithHint,
  getProductSearch,
} from "../../slice/productSlice";
import FormGroup from "@mui/material/FormGroup";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import makeStyles from "@mui/styles/makeStyles";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { styled, useTheme, alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import SortFilter from "../../container/Filter/SortFilter";
import ListFilter from "../../container/Filter/ListFilter";
import PageFilter from "../../container/Filter/PageFilter";
import ViewFilter from "../../container/Filter/ViewFilter";
import Button from "@mui/material/Button";
import PriceFilter from "../../container/Filter/PriceFilter";
import Cookies from "js-cookie";
import SnackBarTool from "../../container/SnackBar/SnackBar";
import ModalLoginData from "../../container/Login/ModalData";
import SideBarFilter from "../../container/Filter/SideBarFilter";

const useStyles = makeStyles({
  flexGrow: {
    flex: "1",
  },
  button: {
    backgroundColor: "#3c52b2",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#fff",
      color: "#3c52b2",
    },
  },
});

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

function SubCategory() {
  const { productDataWithCategoryId } = useSelector((state) => state.category);
  const router = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState([true, false]);
  const [styled, setStyled] = React.useState({});
  const [filterData, setFilterData] = useState();

  const classes = useStyles();
  const MaxInput = useRef(null);
  const MinInput = useRef(null);
  const [filterPrice, setFilterPrice] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [flag, setFlag] = useState(false);
  const [brands, setBrands] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  let [status, setStatus] = useState();
  const [open, setOpen] = React.useState(false);
  const [openBar, setOpenBar] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categoryProductFilter, setCategoryProductFilter] = useState(false);
  let [searchData, setSearchData] = useState();
  let [newProductData, setNewProductData] = useState({});

  useEffect(async () => {
    let result = await dispatch(getProductSearch(router?.query?.data));

    console.log(result);
    let newProduct = result.payload?.filter(
      (results) => results.categoryName == router?.query?.data
    )[0];

    let resultCategory = await dispatch(getCategory());
    console.log(resultCategory);
    console.log(newProduct);
    let resultsCat = resultCategory?.payload.filter(
      (result) => result.category_id == newProduct.categoryId
    );
    console.log(resultsCat);
    resultsCat?.map((category) => {
      setParentCategories(category.category_name);
      setSubCategories(category.child);
    });

    setSearchData(result.payload);
  }, []);
  useEffect(() => {}, [searchData]);
  const viewProduct = (item) => {
    router.push({
      pathname: "/product_detail",
      query: { productId: item.productId },
    });
  };
  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  //   const viewCategory = (item) => {
  //     router.push({
  //       pathname: "/sub_category",
  //       query: { sub_category: item },
  //     });
  //   };
  const getData = (id) => {
    dispatch(getProductWithCategoryId(id));
  };

  useEffect(async () => {
    let result = await dispatch(getCategoryBrand());
    let results = result?.payload.filter(
      (result) => result.category_id == router?.query?.sub_category
    );
    console.log(results);
    results.map((category) => {
      setBrands(category.brands);
    });
  }, []);

  useEffect(() => {}, [subCategories]);

  function categoryProduct(name) {
    console.log(name);
    let result = productDataWithCategoryId.filter(
      (category) => category.categoryName == name
    );
    console.log(result);
    setFilterProduct(result);
  }
  console.log(productDataWithCategoryId);

  const children = (subCategories) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
        {subCategories.map((result, index) => (
          <List
            onClick={() => categoryProduct(result.category_name)}
            key={index}
          >
            <ListItem>{result.category_name}</ListItem>
          </List>
        ))}
        {/* {
          subCategories?.map(result => {
            <List>
              <ListItem>
                {"Hello"}
              </ListItem>
            </List>
          })

        } */}
      </Box>
    );
  };
  useMemo(() => {
    let id = router?.query?.sub_category;
    getData(id);
  }, []);

  const addToCartHandler = async (product) => {
    let result = await dispatch(addToCart(product));
    console.log(result);
    if (result?.payload?.resultCode == 4000) {
      //setOpenBar(true);
      setStatus(result?.payload);
      setOpen(true);
      Cookies.set("item", JSON.stringify(product));
    } else {
      dispatch(getCartItems());
      dispatch(getTotalCartQuantity());
      setTimeout(() => {
        router.push("/cart");
      }, 1000);
    }
  };

  const handleView = (view) => {
    let style;
    let styleCard;
    if (view == "grid") {
      style = { display: "flex", flexDirection: "row" };

      setStyled(style);
    } else {
      style = {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      };
      setStyled(style);
    }
  };
  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBar(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const priceFilter = () => {
    let max = MaxInput.current.value;
    let min = MinInput.current.value;
    console.log(typeof max);
    console.log(typeof min);
    console.log(searchData);
    let result = searchData.filter(
      (result) =>
        parseInt(result.productCost) >= parseInt(min) &&
        parseInt(result.productCost) <= parseInt(max)
    );
    console.log(result);
    setFilterProduct(result);
    setFlag(true);
  };

  console.log(searchData);

  return (
    <>
      {open == true ? (
        <ModalLoginData
          isLoggedIn={isLoggedIn}
          handleClose={handleClose}
          open={open}
          setIsLoggedIn={setIsLoggedIn}
        ></ModalLoginData>
      ) : (
        <></>
      )}
      <Grid
        container
        // xs={12}
        sx={{ background: "white" }}
        // spacing={2}
      >
        <SideBarFilter
          categoryProduct={categoryProduct}
          parentCategories={parentCategories}
          childrenCategory={children}
          subCategories={subCategories}
          brands={brands}
        ></SideBarFilter>

        {/* ---------------------------------------------------- */}
        <Grid item xs={8} md={10}>
          <Box
            role="presentation"
            sx={{ display: "flex", p: 1, bgcolor: "#fafafa" }}
            direction="row"
          >
            <Breadcrumbs aria-label="breadcrumb">
              <Link
                underline="hover"
                color="inherit"
                // onClick={() => router.push("/")}
              >
                Category
              </Link>
              <Link
                underline="hover"
                color="inherit"
                // onClick={() =>
                //   router.push(`/product_detail?productId=${productIdRoute}`)
                // }
              >
                {parentCategories}
              </Link>
            </Breadcrumbs>
          </Box>
          <Grid
            container
            sx={{
              display: "flex",
              flexWrap: "wrap",
              bgcolor: "#fafafa",
              p: 1,
              // overflow: "hidden",
            }}
          >
            <PriceFilter
              MinInput={MinInput}
              MaxInput={MaxInput}
              priceFilter={priceFilter}
            ></PriceFilter>
            <Box flexGrow={0.5} />
            <PageFilter></PageFilter>
          </Grid>
          <Grid
            container
            sx={{
              display: "flex",
              bgcolor: "#fafafa",
              px: 1,
            }}
          >
            <ListFilter />
            <Box flexGrow={1} />

            <SortFilter data={searchData} setFilterData={setFilterData} />
            <Box flexGrow={0.1} />
            <ViewFilter handleView={handleView} />
          </Grid>
          <Grid item xs={12} sx={{ styled }}>
            {console.log(filterProduct?.length)}

            {filterData && flag == false ? (
              filterData?.map((item) => (
                <ActionAreaCard
                  key={item}
                  product={item}
                  viewProduct={viewProduct}
                  addToCartHandler={addToCartHandler}
                  // viewCategory={viewCategory}
                  styledCard={styled}
                ></ActionAreaCard>
              ))
            ) : searchData && filterProduct?.length < 1 && flag == false ? (
              searchData?.map((item) => (
                <ActionAreaCard
                  key={item}
                  product={item}
                  viewProduct={viewProduct}
                  addToCartHandler={addToCartHandler}
                  // viewCategory={viewCategory}
                  styledCard={styled}
                ></ActionAreaCard>
              ))
            ) : filterProduct.length > 0 ? (
              filterProduct?.map((item) => (
                <ActionAreaCard
                  key={item}
                  product={item}
                  viewProduct={viewProduct}
                  addToCartHandler={addToCartHandler}
                  // viewCategory={viewCategory}
                  styledCard={styled}
                ></ActionAreaCard>
              ))
            ) : (
              <></>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default SubCategory;
