import React, { useMemo, useEffect, useState } from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
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
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";

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

import NavSelect from "./Navbar/Components/NavSelect";
import Menu from "@material-ui/core/Menu";
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
import styles from "../styles/menu.module.css";
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
import { useCallback } from "react";
import { use } from "i18next";
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
  let [catId, setCatId] = useState(null);

  const [key, setKey] = useState(1);
  const [featureProductCarousel, setfeatureProductCarousel] = useState(true);
  const [btnKey, setBtnKey] = useState();

  console.log(showProduct, showFreeShipping);

  let { t, i18n } = useTranslation();

  // Handling side dropdown (subcatogories)
  // ---------------------------------------------------------------
  let currentlyHovering = false;
  // const styles = useStyles();

  const [anchorEl, setAnchorEl] = React.useState(null);

  const [sideBarCat, setSideBarCat] = useState([]);

  const handleClick = useCallback(
    (event, categoryId) => {
      console.log(categoryId);
      if (anchorEl !== event.currentTarget) {
        setAnchorEl(event.currentTarget);
      }
      console.log(category);
      let subCategory = category?.filter(
        (result) => result.category_id == categoryId
      )[0];

      setSideBarCat(subCategory);
    },
    [sideBarCat]
  );

  function handleHover() {
    currentlyHovering = true;
  }

  function handleClose() {
    setAnchorEl(null);
  }

  const handleCloseHover = useCallback(() => {
    currentlyHovering = false;
    setTimeout(() => {
      if (!currentlyHovering) {
        handleClose();
      }
    }, 50);
  }, []);

  // ---------------------------------------------------------------

  useEffect(() => {}, [showFreeShipping]);
  let router = useRouter();
  let dispatch = useDispatch();

  /////////
  const viewCategory = useCallback(
    async (item) => {
      console.log(item);
      await setCatId(null);

      await setCatId(item);

      // router.push({
      //   pathname: "/sub_category",
      //   query: { sub_category: item },
      // });
    },
    [catId]
  );

  const featureProduct = useSelector(
    (state) => state.product.featureProductData
  );

  const viewProduct = useCallback((item) => {
    router.push({
      pathname: "/product_detail",
      query: { productId: item },
    });
  }, []);

  const addToCartHandler = useCallback(async (product) => {
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
  }, []);

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

  useEffect(() => {}, [featureProduct]);

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
  // ----------------------------------------------------------------------------------
  const handleCat = useCallback(
    async (subCatId) => {
      await setCatId(null);
      await setCatId(subCatId);
    },
    [catId]
  );
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
            <Box className={styles.categoryBox}>
              <NavSelect
                // className={styles.categories}
                width="100%"
                startIcon={<WidgetsIcon color="primary" />}
                Title={
                  key == 1
                    ? t(`common.DropDown.categories`)
                    : key == 2
                    ? t(`common.DropDown.campaigns`)
                    : ""
                }
                Data={
                  <Box className={styles.dropDown}>
                    {" "}
                    <MenuItem
                      value={10}
                      onClick={() => {
                        setfeatureProductCarousel(false), setKey(2);
                      }}
                    >
                      {t(`common.DropDown.campaigns`)}
                    </MenuItem>
                    <Divider />
                    <MenuItem value={20} onClick={() => setKey(1)}>
                      {t(`common.DropDown.categories`)}
                    </MenuItem>
                  </Box>
                }
              />
              {/* <FormControl sx={{ m: 1, minWidth: 80 }}>
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
              </FormControl> */}
              {console.log(category)}
              <List dense className={styles.categoryList}>
                {key == 1 && category?.length > 0 ? (
                  <>
                    {category?.map((result) => (
                      <>
                        <ListItem
                          aria-owns={anchorEl ? "simple-menu" : undefined}
                          aria-haspopup="true"
                          // onClick={handleClick}

                          // onMouseLeave={handleCloseHover}
                          secondaryAction={
                            <ArrowForwardIosIcon
                              sx={{ fontSize: 12 }}
                              onMouseOver={(e) =>
                                handleClick(e, result.category_id)
                              }
                              // fontSize="small"
                            />
                          }
                        >
                          <ListItemText
                            onClick={(e) => viewCategory(result.category_id)}
                          >
                            {result.category_name}
                          </ListItemText>
                        </ListItem>

                        {
                          <Menu
                            id="simple-menu"
                            anchorEl={anchorEl}
                            open={Boolean(anchorEl)}
                            onClose={handleClose}
                            MenuListProps={{
                              onMouseEnter: handleHover,
                              onMouseLeave: handleCloseHover,
                              style: { pointerEvents: "auto" },
                            }}
                            getContentAnchorEl={null}
                            anchorOrigin={{
                              horizontal: "right",
                              vertical: "top",
                            }}
                            PopoverClasses={{
                              root: styles.popOverRoot,
                            }}
                          >
                            {sideBarCat?.child?.map((subcategory) => (
                              <MenuItem
                                key={subcategory.category_id}
                                onClick={() =>
                                  handleCat(subcategory.category_id)
                                }
                              >
                                {subcategory.category_name}
                              </MenuItem>
                            ))}
                          </Menu>
                        }
                      </>
                    ))}
                  </>
                ) : key == 2 && compaigns?.length > 0 ? (
                  <>
                    {compaigns?.map((result) => (
                      <ListItem
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
            </Box>
            {console.log(featureProduct)}

            <Box className={styles.carouselBox}>
              {featureProduct != "" ? (
                <Carousel
                  // IndicatorIcon={<Arrow}
                  navButtonsProps={{
                    // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                    style: {
                      backgroundColor: "transparent",
                      borderRadius: 0,
                    },
                  }}
                  animation="slide"
                  swipe
                  interval={2000}
                  NextIcon={<ChevronRightIcon sx={{ color: "#0a3446" }} />}
                  PrevIcon={<ChevronLeftIcon sx={{ color: "#0a3446" }} />}
                  // height={"567px"}
                  indicators={false}
                  fullHeightHover={true}
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
                        className={styles.carouselImage}
                      ></CardMedia>

                      <Box className={styles.carouselDesc}>
                        <Typography
                          variant="h5"
                          className={styles.carouselName}
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
                          variant="h5"
                          className={styles.carouselproductCost}
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
            <Grid item xs={12} className={styles.filtersBar}>
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
                {catId == null ? (
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
                ) : (
                  ""
                )}
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
                {showFreeShipping && catId == null ? (
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
                {showDiscounts && catId == null ? (
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
                {showDeals && catId == null ? (
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
                  ) : cartId == null ? (
                    <ShopProductSort
                      data={data?.response}
                      setShowFilterData={setShowFilterData}
                      setFilterData={setFilterData}
                    ></ShopProductSort>
                  ) : (
                    <></>
                  )
                ) : (
                  <></>
                )}

                {showFreeShipping == false &&
                showDeals == false &&
                showDiscounts == false &&
                catId == null ? (
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
            {catId ? (
              <SubCategory
                value={value}
                dealsData={dealsData}
                showDeals={showDeals}
                setDealsData={setDealsData}
                setShowDeals={setShowDeals}
                setDiscountData={setDiscountData}
                showDiscounts={showDiscounts}
                discountData={discountData}
                showFreeShipping={showFreeShipping}
                freeShippingData={freeShippingData}
                setShowDiscounts={setShowDiscounts}
                setFreeShippingData={setFreeShippingData}
                setShowFreeShipping={setShowFreeShipping}
                setShowProduct={setShowProduct}
                setShowAllCategoryPro={setShowAllCategoryPro}
                setShowAllMerchantPro={setShowAllCategoryPro}
                setShowFilterData={setShowFilterData}
                showProduct={showProduct}
                showAllCategoryPro={showAllCategoryPro}
                showAllMerchantPro={showAllMerchantPro}
                setFilterData1={setFilterData}
                catId={catId}
                filterData1={filterData}
              ></SubCategory>
            ) : (
              <>
                {showProduct == false &&
                showAllCategoryPro == false &&
                showAllMerchantPro == false &&
                showDeals == false &&
                showDiscounts == false &&
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
                              data={
                                filterData?.length > 0 ? filterData : dealsData
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
                              dealsData?.length > 0 ? (
                                <ProductGetByMerchant
                                  data={
                                    filterData?.length > 0
                                      ? filterData
                                      : dealsData
                                  }
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
                                        filterData?.length > 0
                                          ? filterData
                                          : dealsData
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
                          data={
                            filterData?.length > 0 ? filterData : discountData
                          }
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
                              data={
                                filterData?.length > 0
                                  ? filterData
                                  : discountData
                              }
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
                                    filterData?.length > 0
                                      ? filterData
                                      : discountData
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
                          data={
                            filterData?.length > 0
                              ? filterData
                              : freeShippingData
                          }
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
                                filterData?.length > 0
                                  ? filterData
                                  : freeShippingData
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
                    showFreeShipping == false ? (
                      <ProductGetByCategory
                        data={
                          filterData?.length > 0 ? filterData : data?.response
                        }
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
                          data={
                            filterData?.length > 0 ? filterData : data?.response
                          }
                          Item={Item}
                        ></ProductGetByMerchant>
                      </>
                    ) : (
                      <></>
                    )}
                  </>
                )}
              </>
            )}

            {console.log(dealsData)}
          </Grid>
        </>
      )}
    </>
  );
}
