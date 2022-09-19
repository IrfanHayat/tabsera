import React, { useState, useMemo, useRef, useEffect } from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import ActionAreaCard from "../../container/Card";
import ViewAllProducts from "../../pages/all_products";
import DealsAndPromotions from "../../pages/deals_and_promotions";
import ProductGetByCategory from "../../pages/get_all_products_by_category";
import ProductGetByMerchant from "../../pages/get_all_products_by_merchant";
import Discounts from "../../pages/discounts";
import FreeShipping from "../../pages/is_free_shipping";

import {
  getProductWithCategoryId,
  getCategoryBrand,
  getCategory,
} from "../../slice/categorySlice";
import ShopProductSort from "../../container/Filter/ProductSort";
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

function SubCategory({
  catId,
  value,
  setShowProduct,
  showAllCategoryPro,
  showAllMerchantPro,
  setShowAllCategoryPro,
  setShowAllMerchantPro,
  showProduct,



  setFilterData1,
  filterData1,
}) {
  //const { productDataWithCategoryId } = useSelector((state) => state.category);
  const [productDataWithCategoryId, setProductDataWithCategoryId] = useState(
    []
  );

  let [dealsData, setDealsData] = useState();
  let [showDeals, setShowDeals] = useState(false);

  //discounts
  let [discountData, setDiscountData] = useState();
  let [showDiscounts, setShowDiscounts] = useState(false);

  //freeShipping
  let [freeShippingData, setFreeShippingData] = useState();
  let [showFreeShipping, setShowFreeShipping] = useState(false);

  //filter
  let [showFilter, setShowFilterData] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState([true, false]);
  const [styled, setStyled] = React.useState({
    display: "flex",
    flexDirection: "column",
    p: 1,
  });
  const [filterData, setFilterData] = useState();

  const classes = useStyles();
  const MaxInput = useRef(null);
  const MinInput = useRef(null);
  const [filterPrice, setFilterPrice] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [filterDeal, setFilterDeal] = useState([]);
  const [filterDiscount, setFilterDiscount] = useState([]);
  const [flag, setFlag] = useState(false);
  const [brands, setBrands] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);
  let [status, setStatus] = useState();
  const [open, setOpen] = React.useState(false);
  const [openBar, setOpenBar] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [categoryProductFilter, setCategoryProductFilter] = useState(false);
  const [Filters, setFiltersBrand] = useState({
    brands: [],
    //   price: []
  });

  //parent and child products Combine
  const [parentProducts, setParentProducts] = useState();
  const [childProducts, setChildProducts] = useState();

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
  const getParentData = async (id) => {
    let result = await dispatch(getProductWithCategoryId(id));
    setProductDataWithCategoryId(result.payload);
  };

  useEffect(async () => {
    let result = await dispatch(getCategoryBrand());
    let results = result?.payload.filter(
      (result) => result.category_id == catId
    );
    console.log(results);
    results.map((category) => {
      console.log(category);
      setBrands(category.brands);
    });
  }, []);

  useEffect(async () => {
    let result = await dispatch(getCategory());
    let results = result?.payload.filter(
      (result) => result.category_id == catId
    );

    results?.map((category) => {
      setParentCategories(category.category_name);

      setSubCategories(category.child);
    });
  }, []);

  useEffect(() => { }, [subCategories]);
  useEffect(() => { }, [catId]);

  function categoryProduct(name) {
    console.log(name);
    let result = productDataWithCategoryId.filter(
      (category) => category.categoryName == name
    );
    console.log(result);
    setFilterProduct(result);
    if (productDataWithCategoryId) {
      let result = productDataWithCategoryId.filter(
        (category) => category.categoryName == name
      );
      setFilterProduct(result);
      setFlag(true);
    }
    // if (dealsData) {
    //   let result1 = dealsData.filter(
    //     (category) => category.categoryName == name
    //   );

    //   setFilterDeal(result1);
    //   setFlag(true);

    // }
    if (discountData) {

      let result1 = discountData.filter(
        (category) => category.categoryName == name
      );
      console.log(result1)
      setFilterDiscount(result1);
      setFlag(true);

    }
  }
  console.log(productDataWithCategoryId);

  const children = (subCategories) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
        <Grid>
          {subCategories.map((result, index) => (
            <List
              onClick={() => categoryProduct(result.category_name)}
              key={index}
            >
              {result.category_name}
            </List>
          ))}
        </Grid>
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
  useEffect(() => {
    let id = catId;
    getParentData(id);
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
      style = { display: "flex", flexDirection: "column" };

      setStyled(style);
    } else {
      style = {
        display: "flex",
        flexDirection: "row",
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


  const handleFilters = (event) => {
    console.log(event.target.name)
    // if (discountData) {

    //   let result1 = discountData.filter(
    //     (result) =>
    //       result.product ===
    //   );
    //   console.log(result1)
    //   setFilterDiscount(result1);
    //   setFlag(true);

    // }

  }
  const priceFilter = () => {
    let max = MaxInput.current.value;
    let min = MinInput.current.value;
    console.log(max);
    console.log(min);
    if (productDataWithCategoryId) {
      let result = productDataWithCategoryId.filter(
        (result) =>
          parseInt(result.productCost) >= parseInt(min) &&
          parseInt(result.productCost) <= parseInt(max)
      );
      setFilterProduct(result);
      setFlag(true);
    }
    if (dealsData) {

      let result1 = dealsData.filter(
        (result) =>
          parseInt(result.bundleCost) >= parseInt(min) &&
          parseInt(result.bundleCost) <= parseInt(max)
      );
      console.log(result1)
      setFilterDeal(result1);
      setFlag(true);

    }
    if (discountData) {

      let result1 = discountData.filter(
        (result) =>
          parseInt(result.productCost) >= parseInt(min) &&
          parseInt(result.productCost) <= parseInt(max)
      );
      console.log(result1)
      setFilterDiscount(result1);
      setFlag(true);

    }

  };

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
      <Box display="flex">
        {/* <Grid item md={3}> */}
        <SideBarFilter
          value={value}
          setDealsData={setDealsData}
          setShowDeals={setShowDeals}
          setDiscountData={setDiscountData}
          showDiscounts={showDiscounts}
          setShowDiscounts={setShowDiscounts}
          setFreeShippingData={setFreeShippingData}
          setShowFreeShipping={setShowFreeShipping}
          setShowProduct={setShowProduct}
          setShowAllCategoryPro={setShowAllCategoryPro}
          setShowAllMerchantPro={setShowAllCategoryPro}
          setFilterData1={setFilterData}
          MinInput={MinInput}
          MaxInput={MaxInput}
          priceFilter={priceFilter}
          handleFilters={handleFilters}
          categoryProduct={categoryProduct}
          parentCategories={parentCategories}
          childrenCategory={children}
          subCategories={subCategories}
          brands={brands}
        ></SideBarFilter>
        {/* </Grid> */}
        {/* ---------------------------------------------------- */}

        {/* <Box
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
           
            <ShopProductSort data={productDataWithCategoryId}
              setFilterData={setFilterData}></ShopProductSort>
            <Box flexGrow={0.1} />
            <ViewFilter handleView={handleView} />
          </Grid> */}

        {console.log(filterProduct?.length)}
        {/* <Grid item md={8} sx={{ bgcolor: "red" }}> */}
        {/* {productDataWithCategoryId.length > 0 &&
            filterProduct?.length < 1 &&
            flag == false
            ?
            //  productDataWithCategoryId?.map((item) => (
            // <ActionAreaCard
            //   key={item}
            //   product={item}
            //   viewProduct={viewProduct}
            //   addToCartHandler={addToCartHandler}
            //   // viewCategory={viewCategory}
            //   styledCard={styled}
            // ></ActionAreaCard>
            <ViewAllProducts
              Item={Item}
              data={productDataWithCategoryId}
            ></ViewAllProducts>
            // ))
            : filterProduct.length > 0
              ? filterProduct?.map((item) => (
                <ActionAreaCard
                  key={item}
                  product={item}
                  viewProduct={viewProduct}
                  addToCartHandler={addToCartHandler}
                  // viewCategory={viewCategory}
                  styledCard={styled}
                ></ActionAreaCard>
              ))
              : "Product Not Found"} */}
        <Box sx={{ width: "100%", pl: 1 }}>
          {showProduct == false &&
            showAllCategoryPro == false &&
            showAllMerchantPro == false &&
            showDeals == false &&
            showDiscounts == false && filterProduct?.length < 1 &&
            flag == false ? (
            //showFreeShipping == false
            <ViewAllProducts
              Item={Item}
              data={productDataWithCategoryId}
            ></ViewAllProducts>
          ) : (
            <>
              {showProduct &&
                showDiscounts == false &&
                showAllCategoryPro == false &&
                showAllMerchantPro == false &&
                showDeals == false &&
                showFreeShipping == false ? (
                <ViewAllProducts
                  Item={Item}
                  data={productDataWithCategoryId}
                ></ViewAllProducts>
              ) : (
                <>
                  {showProduct &&
                    showDiscounts == false &&
                    showAllCategoryPro == false &&
                    showAllMerchantPro == false &&
                    showDeals == false &&
                    showFreeShipping == false &&
                    sortFilter == true ? (
                    <ViewAllProducts
                      Item={Item}
                      data={productDataWithCategoryId}
                    ></ViewAllProducts>
                  ) : (
                    showProduct == false &&
                      showAllCategoryPro == false &&
                      showAllMerchantPro == false &&
                      showDeals == false &&
                      showDiscounts == false && filterProduct?.length > 0 ?
                      <>
                        <ViewAllProducts
                          Item={Item}
                          data={filterProduct}
                        ></ViewAllProducts>
                      </> :
                      <></>

                  )}
                </>
              )}
            </>
          )}

          {showProduct &&
            showAllCategoryPro == false &&
            showAllMerchantPro == false &&
            showDiscounts == false &&
            showFreeShipping == false &&
            dealsData?.length > 0 ? (
            <DealsAndPromotions
              data={filterData?.length > 0 ? filterData : dealsData}
              showProduct={showProduct}
              showAllCategoryPro={showAllCategoryPro}
              showAllMerchantPro={showAllMerchantPro}
              filterData={filterData}
            ></DealsAndPromotions>
          ) : (
            <>
              {" "}
              {showProduct == false &&
                showAllCategoryPro == true &&
                showAllMerchantPro == false &&
                showDiscounts == false &&
                showFreeShipping == false &&
                dealsData?.length > 0 ? (
                <ProductGetByCategory
                  data={filterData?.length > 0 ? filterData : dealsData}
                  Item={Item}
                ></ProductGetByCategory>
              ) : (
                <>
                  {showProduct == false &&
                    showAllCategoryPro == false &&
                    showAllMerchantPro == true &&
                    showDiscounts == false &&
                    showFreeShipping == false &&
                    dealsData?.length > 0 ? (
                    <ProductGetByMerchant
                      data={filterData?.length > 0 ? filterData : dealsData}
                      Item={Item}
                    ></ProductGetByMerchant>
                  ) : (
                    <Grid>
                      {showDeals &&
                        showDiscounts == false &&
                        // showFreeShipping == false &&
                        showProduct == false && filterDeal.length < 1 ? (
                        <DealsAndPromotions
                          data={filterData?.length > 0 ? filterData : dealsData}
                          showProduct={showProduct}
                          showAllCategoryPro={showAllCategoryPro}
                          showAllMerchantPro={showAllMerchantPro}
                          filterData={filterData}
                        ></DealsAndPromotions>
                      ) : (
                        <> {showDeals &&
                          showDiscounts == false &&
                          // showFreeShipping == false &&
                          showProduct == false && filterDeal.length > 0 ? (
                          <DealsAndPromotions
                            data={filterDeal?.length > 0 ? filterDeal : dealsData}
                            showProduct={showProduct}
                            showAllCategoryPro={showAllCategoryPro}
                            showAllMerchantPro={showAllMerchantPro}
                            filterData={filterData}
                          ></DealsAndPromotions>
                        ) : (
                          <></>
                        )}</>
                      )}
                    </Grid>
                  )}
                </>
              )}
            </>
          )}

          <>
            {showProduct &&
              showAllCategoryPro == false &&
              showAllMerchantPro == false &&
              showDeals == false &&
              showFreeShipping == false &&
              discountData?.length > 0 ? (
              <ViewAllProducts
                Item={Item}
                data={filterData?.length > 0 ? filterData : discountData}
              ></ViewAllProducts>
            ) : (
              <>
                {" "}
                {showProduct == false &&
                  showAllCategoryPro == true &&
                  showAllMerchantPro == false &&
                  showDeals == false &&
                  //  showFreeShipping == false &&
                  discountData?.length > 0 ? (
                  <ProductGetByCategory
                    data={filterData?.length > 0 ? filterData : discountData}
                    Item={Item}
                  ></ProductGetByCategory>
                ) : (
                  <>
                    {showProduct == false &&
                      showAllCategoryPro == false &&
                      showAllMerchantPro == true &&
                      showDeals == false &&
                      //       showFreeShipping == false &&
                      discountData?.length > 0 ? (
                      <ProductGetByMerchant
                        data={
                          filterData?.length > 0 ? filterData : discountData
                        }
                        Item={Item}
                      ></ProductGetByMerchant>
                    ) : (
                      <>
                        {showDiscounts &&
                          //     showFreeShipping == false &&
                          showProduct == false && filterDiscount.length < 1 ? (
                          <Discounts
                            data={
                              filterData?.length > 0 ? filterData : discountData
                            }
                            showProduct={showProduct}
                            showAllCategoryPro={showAllCategoryPro}
                            showAllMerchantPro={showAllMerchantPro}
                            filterData={filterData}
                          ></Discounts>
                        ) : (
                          <>  <>
                            {showDiscounts &&
                              //     showFreeShipping == false &&
                              showProduct == false && filterDiscount.length > 0 ? (
                              <Discounts
                                data={
                                  filterDiscount?.length > 0 ? filterDiscount : discountData
                                }
                                showProduct={showProduct}
                                showAllCategoryPro={showAllCategoryPro}
                                showAllMerchantPro={showAllMerchantPro}
                                filterData={filterData}
                              ></Discounts>
                            ) : (
                              <></>
                            )}
                          </></>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}
          </>
          <>
            {showProduct &&
              showDiscounts == false &&
              showAllCategoryPro == false &&
              showAllMerchantPro == false &&
              showDeals == false &&
              freeShippingData?.length > 0 ? (
              <ViewAllProducts
                Item={Item}
                data={filterData?.length > 0 ? filterData : freeShippingData}
              ></ViewAllProducts>
            ) : (
              <>
                {" "}
                {showProduct == false &&
                  showDiscounts == false &&
                  showAllCategoryPro == true &&
                  showAllMerchantPro == false &&
                  showDeals == false &&
                  freeShippingData?.length > 0 ? (
                  <ProductGetByCategory
                    data={
                      filterData?.length > 0 ? filterData : freeShippingData
                    }
                    Item={Item}
                  ></ProductGetByCategory>
                ) : (
                  <>
                    {showProduct == false &&
                      showDiscounts == false &&
                      showAllCategoryPro == false &&
                      showAllMerchantPro == true &&
                      showDeals == false &&
                      freeShippingData?.length > 0 ? (
                      <ProductGetByMerchant
                        data={
                          filterData?.length > 0 ? filterData : freeShippingData
                        }
                        Item={Item}
                      ></ProductGetByMerchant>
                    ) : (
                      <>
                        {showFreeShipping &&
                          showDiscounts == false &&
                          showProduct == false ? (
                          <FreeShipping
                            data={
                              filterData?.length > 0
                                ? filterData
                                : freeShippingData
                            }
                            showProduct={showProduct}
                            showAllCategoryPro={showAllCategoryPro}
                            showAllMerchantPro={showAllMerchantPro}
                            filterData={filterData}
                          ></FreeShipping>
                        ) : (
                          <></>
                        )}
                      </>
                    )}
                  </>
                )}
              </>
            )}

            {showProduct == false &&
              showAllCategoryPro == true &&
              showAllMerchantPro == false &&
              showDiscounts == false &&
              showFreeShipping == false &&
              productDataWithCategoryId?.length > 0 ? (
              <ProductGetByCategory
                data={
                  filterData?.length > 0 ? filterData : productDataWithCategoryId
                }
                Item={Item}
              ></ProductGetByCategory>
            ) : (
              <>
                {showProduct == false &&
                  showAllCategoryPro == false &&
                  showAllMerchantPro == true &&
                  showDiscounts == false &&
                  showFreeShipping == false &&
                  productDataWithCategoryId?.length > 0 ? (
                  <ProductGetByMerchant
                    data={
                      filterData?.length > 0
                        ? filterData
                        : productDataWithCategoryId
                    }
                    Item={Item}
                  ></ProductGetByMerchant>
                ) : (
                  <>

                  </>
                )}
              </>
            )}
          </>
        </Box>
        {/* </Grid> */}
      </Box>
    </>
  );
}

export default SubCategory;
