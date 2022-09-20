import React, {
  useState,
  useMemo,
  useRef,
  useEffect,
  useCallback,
} from "react";
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
// import PriceFilter from "../../container/Filter/PriceFilter";
import Cookies from "js-cookie";
import SnackBarTool from "../../container/SnackBar/SnackBar";
import ModalLoginData from "../../container/Login/ModalData";
import SideBarFilter from "../../container/Filter/SideBarFilter";
import styles from "../../styles/searchFilter.module.css";
import ViewAllProducts from "../../pages/all_products";
import DealsAndPromotions from "../../pages/deals_and_promotions";
import Discounts from "../../pages/discounts";
import ProductGetByCategory from "../../pages/get_all_products_by_category";
import ProductGetByMerchant from "../../pages/get_all_products_by_merchant";
import FreeShipping from "../../pages/is_free_shipping";
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
  const [productDataWithCategoryId, setProductDataWithCategoryId] = useState(
    []
  );
  const [showProduct, setShowProduct] = useState(false);
  // show all categories
  const [showAllCategoryPro, setShowAllCategoryPro] = useState(false);

  const [value, setValue] = React.useState();
  // show all merchants
  const [showAllMerchantPro, setShowAllMerchantPro] = useState(false);

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
  const [btnKey, setBtnKey] = useState();
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
  let [searchData, setSearchData] = useState();

  useEffect(async () => {
    let result = await dispatch(getProductSearch(router?.query?.data));
    console.log(result);
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

  const showAllProducts = useCallback(() => {
    if (showFreeShipping) {
      setShowProduct(true);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts(false);
      setShowFreeShipping(true);
      //setCatId(null);
    } else if (showDiscounts) {
      setShowProduct(true);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts(true);
      setShowFreeShipping(false);
      //setCatId(null);
    } else if (showDeals) {
      setShowProduct(true);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDeals(true);
      setShowDiscounts(false);
      setShowFreeShipping(false);
      //setCatId(null);
    } else {
      setShowProduct(true);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts(false);
      setShowFreeShipping(false);
      //setCatId(null);
    }
  }, [
    showProduct,
    showAllCategoryPro,
    showAllMerchantPro,
    showDeals,
    showDiscounts,
    showFreeShipping,
  ]);

  const showAllCategoriesProduct = useCallback(() => {
    console.log("ccc");

    if (showFreeShipping == true) {
      setShowAllCategoryPro(true);
      setShowProduct(false);
      setShowFreeShipping(true);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts(false);
      //setCatId(null);
    } else if (showDiscounts) {
      setShowProduct(false);
      setShowAllCategoryPro(true);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts(true);
      setShowFreeShipping(false);
      //setCatId(null);
    } else if (showDeals) {
      setShowProduct(false);
      setShowAllCategoryPro(true);
      setShowAllMerchantPro(false);
      setShowDeals(true);
      setShowDiscounts(false);
      setShowFreeShipping(false);
      //setCatId(null);
    } else {
      setShowAllCategoryPro(true);
      setShowProduct(false);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts(false);
      setShowFreeShipping(false);
      //setCatId(null);
    }
  }, [
    showProduct,
    showAllCategoryPro,
    showAllMerchantPro,
    showDeals,
    showDiscounts,
    showFreeShipping,
  ]);
  const showAllMerchantsProduct = useCallback(() => {
    console.log(showFreeShipping);
    if (showFreeShipping) {
      setShowProduct(false);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(true);
      setShowDeals(false);
      setShowDiscounts(false);
      setShowFreeShipping(true);
      //setCatId(null);
    } else if (showDiscounts) {
      setShowProduct(false);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(true);
      setShowDeals(false);
      setShowDiscounts(true);
      setShowFreeShipping(false);
      //setCatId(null);
    } else if (showDeals) {
      setShowProduct(false);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(true);
      setShowDeals(true);
      setShowDiscounts(false);
      setShowFreeShipping(false);
      //setCatId(null);
    } else {
      setShowAllMerchantPro(true);
      setShowProduct(false);
      setShowAllCategoryPro(false);
      setShowDeals(false);
      setShowDiscounts(false);
      //setCatId(null);
    }
  }, [
    showProduct,
    showAllCategoryPro,
    showAllMerchantPro,
    showDeals,
    showDiscounts,
    showFreeShipping,
  ]);
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

  useEffect(async () => {
    let result = await dispatch(getCategory());
    let results = result?.payload.filter(
      (result) => result.category_id == router?.query?.sub_category
    );
    console.log(results);
    results?.map((category) => {
      setParentCategories(category.category_name);
      setSubCategories(category.child);
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
  const handleFilters = (event) => {
    console.log(event.target.name);
    // if (discountData) {

    //   let result1 = discountData.filter(
    //     (result) =>
    //       result.product ===
    //   );
    //   console.log(result1)
    //   setFilterDiscount(result1);
    //   setFlag(true);

    // }
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
      <Grid className={styles.mainBar}>
        <ListFilter
          btnKey={btnKey}
          setBtnKey={setBtnKey}
          showAllProducts={showAllProducts}
          showAllMerchantsProduct={showAllMerchantsProduct}
          showAllCategoriesProduct={showAllCategoriesProduct}
        ></ListFilter>
        <Box flexGrow={1} />

        <SortFilter data={searchData} setFilterData={setFilterData} />
        <Box flexGrow={0.1} />
        <ViewFilter handleView={handleView} />
      </Grid>

      {/* <PriceFilter
            MinInput={MinInput}
            MaxInput={MaxInput}
            priceFilter={priceFilter}
          ></PriceFilter>
          <Box flexGrow={0.5} />
          <PageFilter></PageFilter> */}

      {/* <Box>
          <SideBarFilter
            categoryProduct={categoryProduct}
            parentCategories={parentCategories}
            childrenCategory={children}
            subCategories={subCategories}
            brands={brands}
          ></SideBarFilter>
        </Box> */}
      {/* </Grid> */}
      {/* ---------------------------------------------------- */}
      <Box className={styles.searchPage}>
        {/* <Grid item md={3}> */}
        <SideBarFilter
          // searchData={searchData}
          // setSearchData={setSearchData}
          filterProduct={filterProduct}
          setFilterProduct={setFilterProduct}
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

        {/* </Grid> */}
        {console.log(searchData)}
        <Box className={styles.itemBox}>
          {showProduct == false &&
          showAllCategoryPro == false &&
          showAllMerchantPro == false &&
          showDeals == false &&
          showDiscounts == false &&
          filterProduct?.length < 1 &&
          flag == false ? (
            //showFreeShipping == false
            <>
              <ViewAllProducts Item={Item} data={searchData}></ViewAllProducts>
            </>
          ) : (
            <>
              {showProduct &&
              showDiscounts == false &&
              showAllCategoryPro == false &&
              showAllMerchantPro == false &&
              showDeals == false &&
              showFreeShipping == false ? (
                <>
                  <ViewAllProducts
                    Item={Item}
                    data={searchData}
                  ></ViewAllProducts>
                </>
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
                      data={searchData}
                    ></ViewAllProducts>
                  ) : (
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
                      showProduct == false &&
                      filterDeal.length < 1 ? (
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
                          {showDeals &&
                          showDiscounts == false &&
                          // showFreeShipping == false &&
                          showProduct == false &&
                          filterDeal.length > 0 ? (
                            <DealsAndPromotions
                              data={
                                filterDeal?.length > 0 ? filterDeal : dealsData
                              }
                              showProduct={showProduct}
                              showAllCategoryPro={showAllCategoryPro}
                              showAllMerchantPro={showAllMerchantPro}
                              filterData={filterData}
                            ></DealsAndPromotions>
                          ) : (
                            <></>
                          )}
                        </>
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
                        showProduct == false &&
                        filterDiscount.length < 1 ? (
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
                          <>
                            {" "}
                            <>
                              {showDiscounts &&
                              //     showFreeShipping == false &&
                              showProduct == false &&
                              filterDiscount.length > 0 ? (
                                <Discounts
                                  data={
                                    filterDiscount?.length > 0
                                      ? filterDiscount
                                      : discountData
                                  }
                                  showProduct={showProduct}
                                  showAllCategoryPro={showAllCategoryPro}
                                  showAllMerchantPro={showAllMerchantPro}
                                  filterData={filterData}
                                ></Discounts>
                              ) : (
                                <></>
                              )}
                            </>
                          </>
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
            searchData?.length > 0 ? (
              <ProductGetByCategory
                data={filterData?.length > 0 ? filterData : searchData}
                Item={Item}
              ></ProductGetByCategory>
            ) : (
              <>
                {showProduct == false &&
                showAllCategoryPro == false &&
                showAllMerchantPro == true &&
                showDiscounts == false &&
                showFreeShipping == false &&
                searchData?.length > 0 ? (
                  <ProductGetByMerchant
                    data={filterData?.length > 0 ? filterData : searchData}
                    Item={Item}
                  ></ProductGetByMerchant>
                ) : (
                  <></>
                )}
              </>
            )}
          </>
        </Box>

        {/* </Box> */}
      </Box>
    </>
  );
}

export default SubCategory;
