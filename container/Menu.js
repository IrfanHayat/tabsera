import React, { useMemo, useEffect, useState } from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
// import { getFreeShipping } from "../slice/freeShippingSlice";
// import { getDeals } from "../slice/dealsPromotionsSlice";
import { useRouter } from "next/router";
import {
  addToBasket,
  addToCart,
  getCartItems,
  getTotalCartQuantity,
} from "../slice/basketSlice";
import { getProduct, getFeatureProduct } from "../slice/productSlice";
import { getCategory } from "../slice/categorySlice";
import { getCampaigns } from "../slice/campaignsSlice";
import NewCarousel from "./Carousel/NewCarousel";
import CarouselApp from "./Carousel/Carousel";
import { useGetAllProductsQuery } from "../RTK/productApi";
import MenuCard from "./DealsAndPromotions/MenuCards";
import RadioGroup from "@mui/material/RadioGroup";

import {
  CircularProgress,
  ListItem,
  ListItemIcon,
  Typography,
  TextField,
  InputAdornment,
} from "@mui/material";
import WidgetsIcon from "@mui/icons-material/Widgets";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
// import { getDiscounts } from "../slice/discountsSlice";
import Button from "@mui/material/Button";
import NavSelect from "./Navbar/Components/NavSelect";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ViewAllProducts from "../pages/all_products";
import ProductGetByCategory from "../pages/get_all_products_by_category";
import ProductGetByMerchant from "../pages/get_all_products_by_merchant";
import _, { result } from "lodash";
import Divider from "@mui/material/Divider";
import Radio from "@mui/material/Radio";
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import { List, Stack } from "@mui/material";
import SortFilter from "./Filter/SortFilter";
import { motion } from "framer-motion";
import DealsAndPromotions from "../pages/deals_and_promotions";
import Discounts from "../pages/discounts";
import FreeShipping from "../pages/is_free_shipping";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Carousel from "react-material-ui-carousel";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import CardMedia from "@mui/material/CardMedia";
import Rating from "@mui/material/Rating";
const Item = styled("div")(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));
import ListItemButton from "@mui/material/ListItemButton";
import ListFilter from "./Filter/ListFilter";
import PageFilter from "./Filter/PageFilter";
import ActionAreaCard from "./Card";
import ShopProductSort from "./Filter/ProductSort";
import SubCategory from "../pages/sub_category";
export default function PersistentDrawerLeft() {
  const { data, isLoading, isFetching, isError } = useGetAllProductsQuery();
  const { categoryData } = useSelector((state) => state.category);
  const { campaignsData } = useSelector((state) => state.campaigns);

  // console.log("cat DAta", categoryData);
  //
  // show all products
  const [showProduct, setShowProduct] = useState(false);
  // show all categories
  const [showAllCategoryPro, setShowAllCategoryPro] = useState(false);
  const [filterData, setFilterData] = useState();

  // show all merchants
  const [showAllMerchantPro, setShowAllMerchantPro] = useState(false);

  // const product = useSelector((state) => state.product.productData);
  // const { productData, loading } = useSelector((state) => state.product);
  let product = data?.response;

  const [compaigns, setCompaigns] = useState();
  console.log("camp DAta", compaigns);

  const [category, setCategory] = useState();
  const [value, setValue] = React.useState();
  // checkbox
  const [state, setState] = React.useState({
    deals: false,
    discounts: false,
    freeShipping: false,
  });

  //deals and promotions
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


  //sub Category with Id
  let [catId, setCatId] = useState(null)

  const [key, setKey] = useState(1);
  const [featureProductCarousel, setfeatureProductCarousel] = useState(true);
  const [btnKey, setBtnKey] = useState();

  console.log(showProduct, showFreeShipping);

  useEffect(() => { }, [showFreeShipping]);
  let router = useRouter();
  let dispatch = useDispatch();


  /////////
  const viewCategory = async (item) => {
    console.log(item)
    await setCatId(null)

    await setCatId(item)

    // router.push({
    //   pathname: "/sub_category",
    //   query: { sub_category: item },
    // });
  };


  const featureProduct = useSelector(
    (state) => state.product.featureProductData
  );

  const viewProduct = (item) => {
    router.push({
      pathname: "/product_detail",
      query: { productId: item },
    });
  };

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

  useEffect(() => {
    if (key == 1) {
      // let categoryResult = await dispatch(getCategory());
      setCategory(categoryData);
      // setShowList(false);
    } else {
      setCompaigns(campaignsData);
    }
  }, [key, categoryData, campaignsData]);

  useEffect(() => {
    dispatch(getFeatureProduct());
    // dispatch(getDiscounts());
    // dispatch(getFreeShipping());
    // dispatch(getDeals());
  }, []);

  useEffect(() => { }, [featureProduct]);

  const showAllProducts = () => {
    if (showFreeShipping) {
      setShowProduct(true);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts(false);
      setShowFreeShipping(true);
    } else if (showDiscounts) {
      setShowProduct(true);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts(true);
      setShowFreeShipping(false);
    } else if (showDeals) {
      setShowProduct(true);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDeals(true);
      setShowDiscounts(false);
      setShowFreeShipping(false);
    } else {
      setShowProduct(true);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts(false);
      setShowFreeShipping(false);
    }
  };

  const showAllCategoriesProduct = () => {
    console.log("ccc");

    if (showFreeShipping == true) {
      setShowAllCategoryPro(true);
      setShowProduct(false);
      setShowFreeShipping(true);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts(false);
    } else if (showDiscounts) {
      setShowProduct(false);
      setShowAllCategoryPro(true);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts(true);
      setShowFreeShipping(false);
    } else if (showDeals) {
      setShowProduct(false);
      setShowAllCategoryPro(true);
      setShowAllMerchantPro(false);
      setShowDeals(true);
      setShowDiscounts(false);
      setShowFreeShipping(false);
    } else {
      setShowAllCategoryPro(true);
      setShowProduct(false);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts(false);
      setShowFreeShipping(false);
    }
  };
  const showAllMerchantsProduct = () => {
    console.log(showFreeShipping);
    if (showFreeShipping) {
      setShowProduct(false);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(true);
      setShowDeals(false);
      setShowDiscounts(false);
      setShowFreeShipping(true);
    } else if (showDiscounts) {
      setShowProduct(false);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(true);
      setShowDeals(false);
      setShowDiscounts(true);
      setShowFreeShipping(false);
    } else if (showDeals) {
      setShowProduct(false);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(true);
      setShowDeals(true);
      setShowDiscounts(false);
      setShowFreeShipping(false);
    } else {
      setShowAllMerchantPro(true);
      setShowProduct(false);
      setShowAllCategoryPro(false);
      setShowDeals(false);
      setShowDiscounts(false);
    }
  };
  // ----------------------------------------------------------------------------------

  console.log(discountData);

  return (
    <>
      {isLoading ? (
        <Grid
          sx={{
            display: "flex",
            minHeight: 500,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <CircularProgress size={140} />
        </Grid>
      ) : (
        <>
          <Grid
            maxWidth="xl"
            // container
            sx={{
              display: "flex",
              justifyContent: "space-between",
              // p: 1,
              // m: 1,
              // bgcolor: "background.paper",
              // borderRadius: 1,
            }}
          // data-aos="fade-up"
          >
            <Item
              sx={{
                // m: 0.5,
                width: {
                  md: "15%",
                  sm: "30%",
                  xs: "40%",
                  // display: "flex",
                  // direction: "column",
                  // fontWeight: "bold",
                  // alignItems: "center",
                  // justifyContent: "center",
                },
              }}
            >
              <FormControl sx={{ m: 1, minWidth: 80 }}>
                <TextField
                  select
                  // value={age}
                  // onChange={handleChange}
                  // startIcon={<WidgetsIcon />}
                  // color="primary"
                  defaultValue={20}
                  variant="standard"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <WidgetsIcon color="primary" />
                      </InputAdornment>
                    ),
                    disableUnderline: true,
                    "aria-label": "Without label",
                    // color: "primary",
                  }}
                >
                  <MenuItem
                    value={10}
                    onClick={() => {
                      setfeatureProductCarousel(false), setKey(2);
                    }}
                  >
                    Campaigns
                  </MenuItem>
                  <Divider />
                  <MenuItem value={20} onClick={() => setKey(1)}>
                    Categories
                  </MenuItem>
                </TextField>
              </FormControl>
              <List dense>
                {key == 1 && category?.length > 0 ? (
                  <>
                    {category?.map((result) => (
                      <ListItem
                        // spacing={2}
                        // sx={{ p: 1 }}
                        // alignItems="flex-start"
                        sx={{
                          ":hover": {
                            // border: 1,
                            lineHeight: "40px",
                            fontSize: "12px",
                            // boxShadow: 1, // theme.shadows[20]
                            transform: "scale(1.05)",
                            // opacity: 0.5,
                            color: "primary.main",
                            cursor: "pointer",
                          },
                        }}
                        secondaryAction={
                          <ArrowForwardIosIcon
                            sx={{ fontSize: 12 }}
                          // fontSize="small"
                          />
                        }
                      >
                        {/* <ListItemIcon>
                          <Image
                            src={result.category_image}
                            width={50}
                            height={30}
                          ></Image>
                        </ListItemIcon> */}
                        <ListItemText
                          onClick={(e) => viewCategory(result.category_id)}
                        >
                          {result.category_name}
                        </ListItemText>
                      </ListItem>
                    ))}
                  </>
                ) : key == 2 && compaigns?.length > 0 ? (
                  <>
                    {compaigns?.map((result) => (
                      <ListItem
                        // spacing={2}
                        // sx={{ p: 1 }}
                        // alignItems="flex-start"
                        sx={{
                          ":hover": {
                            // border: 1,
                            // boxShadow: 1, // theme.shadows[20]
                            transform: "scale(1.05)",
                            // opacity: 0.5,
                            color: "primary.main",
                            cursor: "pointer",
                          },
                        }}
                        secondaryAction={
                          <ArrowForwardIosIcon
                            sx={{ fontSize: 12 }}
                          // fontSize="small"
                          />
                        }
                      >
                        {/* <ListItemButton> */}
                        {/* <ListItemIcon>
                          <Image
                            src={result.imageURL}
                            width={50}
                            height={30}
                          ></Image>
                        </ListItemIcon> */}
                        <ListItemText>{result.campaignName}</ListItemText>
                        {/* </ListItemButton> */}
                        {/* <Divider /> */}
                      </ListItem>
                    ))}
                  </>
                ) : (
                  ""
                )}
              </List>
            </Item>
            {console.log(featureProduct)}

            <Item
              sx={{
                // m: 0.5,

                width: {
                  md: "85%",
                  sm: "70%",
                  xs: "60%",
                },
              }}
            >

              <Box>


                {featureProduct != "" ? (
                  <Carousel
                    animation="slide"
                    swipe
                    interval={1000}
                    NextIcon={<ArrowRightIcon />}
                    PrevIcon={<ArrowLeftIcon />}
                    height={300}
                    navButtonsAlwaysVisible={true}
                  >
                    {featureProduct?.map((result) => (
                      <>
                        <CardMedia
                          // component="img"
                          component="img"
                          // height="194"
                          onClick={(e) => viewProduct(result.productId)}
                          image={result?.productImage}
                          alt="featured Product"
                          sx={{
                            top: 0,
                            width: "100%",
                            height: 290,
                            objectFit: "cover",
                          }}
                        ></CardMedia>

                        <Box
                          // square
                          // elevation={0}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            height: 50,
                            // pl: 2,
                            justifyContent: "space-between",
                            p: 1,
                            // bgcolor: "background.default",
                          }}
                        >
                          <Typography
                            fontSize="0.9rem"
                            variant="h5"
                            fontWeight={600}
                            // display="inline"
                            noWrap
                          >
                            {result?.productName}
                          </Typography>

                          <Rating
                            name="size-small"
                            defaultValue={result?.averageRating}
                            size="small"
                            // fontSize={24}
                            readOnly
                          />
                          <Typography
                            fontSize="0.9rem"
                            variant="h5"
                            fontWeight={600}
                            sx={{ color: "warning.dark", p: 1 }}
                          >
                            Rs. {result?.productCost}
                          </Typography>
                          {result.productName ? (
                            <IconButton
                              key={result.id}
                              onClick={() => addToCartHandler(result)}
                              color="primary"
                              aria-label="add to shopping cart"
                            >
                              <AddShoppingCartOutlinedIcon fontSize="small" />
                            </IconButton>
                          ) : (
                            ""
                          )}
                        </Box>
                      </>
                    ))}
                  </Carousel>
                ) : (

                  ""
                )}


              </Box>
            </Item>
          </Grid>

          <Grid
            container
            // maxWidth="xl"
            sx={
              {
                // display: "flex",
                // justifyContent: "space-between",
                // p: 1,
                // m: 1,
                // bgcolor: "background.paper",
                // borderRadius: 1,
              }
            }
          // data-aos="fade-up"
          >

            <Grid
              item
              xs={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                bgcolor: "background.paper",
                my: 0.5,
                p: 1,
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              {/* <Box sx={{ flexGrow: 1 }} /> */}
              <Box>
                <ListFilter
                  btnKey={btnKey}
                  setBtnKey={setBtnKey}
                  showAllProducts={showAllProducts}
                  showAllMerchantsProduct={showAllMerchantsProduct}
                  showAllCategoriesProduct={showAllCategoriesProduct}
                ></ListFilter>
              </Box>
              <Box>
                <PageFilter
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
                  setFilterData={setFilterData}
                ></PageFilter>
              </Box>
              <Box>
                {/* <SortFilter
                  data={data?.response}
                  setFilterData={setFilterData}
                    ></SortFilter> */}

                {console.log(
                  discountData,
                  showFreeShipping,
                  showDiscounts,
                  showProduct,
                  showAllCategoryPro,
                  showAllMerchantPro
                )}
                {showFreeShipping ? (
                  (showFreeShipping && showProduct == false) ||
                    showAllCategoryPro == false ||
                    showAllMerchantPro == false ? (
                    <ShopProductSort
                      data={freeShippingData}
                      setShowFilterData={setShowFilterData}
                      setFilterData={setFilterData}
                    ></ShopProductSort>
                  ) : (freeShippingData?.length > 0 &&
                    showDiscounts == false &&
                    showProduct) ||
                    showAllCategoryPro ||
                    showAllMerchantPro ? (
                    <ShopProductSort
                      data={freeShippingData}
                      setShowFilterData={setShowFilterData}
                      setFilterData={setFilterData}
                    ></ShopProductSort>
                  ) : (
                    <ShopProductSort
                      data={data?.response}
                      setShowFilterData={setShowFilterData}
                      setFilterData={setFilterData}
                    ></ShopProductSort>
                  )
                ) : (
                  <></>
                )}
                {showDiscounts ? (
                  (showDiscounts && showProduct == false) ||
                    showAllCategoryPro == false ||
                    showAllMerchantPro == false ? (
                    <ShopProductSort
                      data={discountData}
                      setShowFilterData={setShowFilterData}
                      setFilterData={setFilterData}
                    ></ShopProductSort>
                  ) : (discountData?.length > 0 &&
                    showFreeShipping == false &&
                    showProduct) ||
                    showAllCategoryPro ||
                    showAllMerchantPro ? (
                    <ShopProductSort
                      data={discountData}
                      setShowFilterData={setShowFilterData}
                      setFilterData={setFilterData}
                    ></ShopProductSort>
                  ) : (
                    <ShopProductSort
                      data={data?.response}
                      setShowFilterData={setShowFilterData}
                      setFilterData={setFilterData}
                    ></ShopProductSort>
                  )
                ) : (
                  <></>
                )}
                {showDeals ? (
                  (showDeals && showProduct == false) ||
                    showAllCategoryPro == false ||
                    showAllMerchantPro == false ? (
                    <ShopProductSort
                      data={dealsData}
                      setShowFilterData={setShowFilterData}
                      setFilterData={setFilterData}
                    ></ShopProductSort>
                  ) : (dealsData?.length > 0 &&
                    showFreeShipping == false &&
                    showProduct) ||
                    showAllCategoryPro ||
                    showAllMerchantPro ? (
                    <ShopProductSort
                      data={dealsData}
                      setShowFilterData={setShowFilterData}
                      setFilterData={setFilterData}
                    ></ShopProductSort>
                  ) : (
                    <ShopProductSort
                      data={data?.response}
                      setShowFilterData={setShowFilterData}
                      setFilterData={setFilterData}
                    ></ShopProductSort>
                  )
                ) : (
                  <></>
                )}

                {showFreeShipping == false &&
                  showDeals == false &&
                  showDiscounts == false ? (
                  <ShopProductSort
                    data={data?.response}
                    setShowFilterData={setShowFilterData}
                    setFilterData={setFilterData}
                  ></ShopProductSort>
                ) : (
                  <></>
                )}
              </Box>
            </Grid>
          </Grid>

          <Grid>

            {console.log(catId)}
            {
              catId ? <SubCategory catId={catId}></SubCategory> : <>
                {showProduct == false &&
                  showAllCategoryPro == false &&
                  showAllMerchantPro == false &&
                  showDeals == false &&
                  showDiscounts == false &&
                  showFreeShipping == false
                  ? (
                    <ViewAllProducts
                      Item={Item}
                      data={filterData ? filterData : data?.response}
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
                          data={filterData ? filterData : data?.response}
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
                              data={filterData ? filterData : data?.response}
                            ></ViewAllProducts>
                          ) : (
                            <></>
                          )}
                        </>
                      )}
                      <>
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
                                  <>
                                    {showDeals &&
                                      showDiscounts == false &&
                                      showFreeShipping == false &&
                                      showProduct == false ? (
                                      <DealsAndPromotions
                                        data={
                                          filterData?.length > 0 ? filterData : dealsData
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
                              </>
                            )}
                          </>
                        )}
                      </>
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
                              showFreeShipping == false &&
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
                                  showFreeShipping == false &&
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
                                      showFreeShipping == false &&
                                      showProduct == false ? (
                                      <Discounts
                                        data={
                                          filterData?.length > 0
                                            ? filterData
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
                                      filterData?.length > 0
                                        ? filterData
                                        : freeShippingData
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
                      </>
                      {/* <Grid sx={{ display: "flex", flexDirection: "column" }}> */}
                      {showAllCategoryPro &&
                        showDiscounts == false &&
                        showAllMerchantPro == false &&
                        showDeals == false &&
                        showFreeShipping == false
                        ? (
                          <ProductGetByCategory
                            data={filterData?.length > 0 ? filterData : data?.response}
                            Item={Item}
                          ></ProductGetByCategory>
                        ) : (
                          <></>
                        )}

                      {/* {console.log(filterData)} */}

                      {showAllMerchantPro &&
                        showDiscounts == false &&
                        showAllCategoryPro == false &&
                        showDeals == false &&
                        showFreeShipping == false ? (
                        <>
                          <ProductGetByMerchant
                            data={filterData?.length > 0 ? filterData : data?.response}
                            Item={Item}
                          ></ProductGetByMerchant>
                        </>
                      ) : (
                        <></>
                      )}

                    </>

                  )}

              </>
            }



            {console.log(dealsData)}

          </Grid>
        </>
      )}
    </>
  );
}
