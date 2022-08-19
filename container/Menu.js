import React, { useMemo, useEffect, useState } from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { getFreeShipping } from "../slice/freeShippingSlice";
import { getDeals } from "../slice/dealsPromotionsSlice";
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
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";

import { getDiscounts } from "../slice/discountsSlice";
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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));
import ListItemButton from "@mui/material/ListItemButton";
export default function PersistentDrawerLeft() {
  const { data, isLoading, isFetching, isError } = useGetAllProductsQuery();
  const { categoryData } = useSelector((state) => state.category);
  const { campaignsData } = useSelector((state) => state.campaigns);

  console.log("cat DAta", categoryData);
  console.log("camp DAta", campaignsData);

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
  const [category, setCategory] = useState();
  const [showList, setShowList] = useState(false);
  const [value, setValue] = React.useState();
  let [status, setStatus] = useState();
  const [openBar, setOpenBar] = React.useState(false);
  const [open, setOpen] = React.useState(false);
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

  const handleChange = async (event) => {
    console.log(event.target.value);

    if (event.target.value == "deals") {
      let deals = await dispatch(getDeals());
      console.log(deals);
      setDealsData(deals.payload);
      setShowProduct(false);
      setShowDeals(true);

      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDiscounts(false);
      setShowFreeShipping(false);
    }
    if (event.target.value == "discounts") {
      let discounts = await dispatch(getDiscounts());
      console.log(discounts.payload);
      setDiscountData(discounts.payload);
      setShowProduct(false);
      setShowDiscounts(true);

      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowFreeShipping(false);
    }
    if (event.target.value == "freeShipping") {
      let freeShipping = await dispatch(getFreeShipping());
      console.log(freeShipping.payload);
      setFreeShippingData(freeShipping.payload);
      setShowProduct(false);
      setShowDiscounts(false);
      setShowFreeShipping(true);
      setShowAllCategoryPro(false);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts();
    }
    // if (event.target.name == 'freeShipping') {
    //   router.push('/is_free_shipping')
    // }
  };

  /////////

  const sortingCategories = (
    <div>
      <MenuItem>
        <ListItemText onClick={() => sortData("price_asc")}>
          Price: High-To-Low{" "}
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText onClick={() => sortData("price_desc")}>
          Price: Low-To-High{" "}
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText onClick={() => sortData("rating_asc")}>
          Rating: High-To-Low
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText onClick={() => sortData("rating_desc")}>
          Rating: Low-To-High
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText onClick={() => sortData("order_asc")}>
          Orders: High-To-Low
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText onClick={() => sortData("order_desc")}>
          Orders: Low-To-High
        </ListItemText>
      </MenuItem>
    </div>
  );

  const featureProduct = useSelector(
    (state) => state.product.featureProductData
  );

  let router = useRouter();
  let dispatch = useDispatch();

  const viewProduct = (item) => {
    router.push({
      pathname: "/product_detail",
      query: { productId: item },
    });
  };

  const viewCategory = (item) => {
    router.push({
      pathname: "/sub_category",
      query: { sub_category: item },
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

  //groupBy
  // function groupArrayOfObjects(list, key, category1) {
  //   return list.reduce(function (rv, x) {
  //     rv[x[key].split(" ").join("")] = rv[x[key].split(" ").join("")] || [];
  //     rv[x[key].split(" ").join("")].push(x);

  //     return rv;
  //   }, {});
  // }

  useEffect(async () => {
    if (router?.query?.key == 1) {
      // let categoryResult = await dispatch(getCategory());
      setCategory(categoryData);
      // setShowList(false);
    } else {
      // let compaignsResult = await dispatch(getCampaigns());
      setCompaigns(campaignsData);
      // setShowList(true);
    }
    // let data = dispatch(getCategory());
    // console.log(data);
    // dispatch(getCampaigns());
  }, [router?.query?.key, categoryData, campaignsData]);

  async function getCompaignsData() {
    if (router?.query?.key == 1) {
      let categoryResult = await dispatch(getCategory());
      setCategory(categoryResult.payload);
      setShowList(false);
    } else {
      let compaignsResult = await dispatch(getCampaigns());
      setCompaigns(compaignsResult.payload);
      setShowList(true);
    }

    // console.log(categoryResult.payload);
    // {
    //   router?.query?.key == 1
    //     ? (setCompaigns(compaignsResult.payload), setShowList(true))
    //     : // console.log(compaignsResult.payload)
    //       (setCategory(categoryResult.payload), setShowList(false));
    //   // console.log(categoryResult.payload);
    // }
  }

  // console.log(compaigns);

  useEffect(() => {
    dispatch(getFeatureProduct());
    dispatch(getDiscounts());
    dispatch(getFreeShipping());
    dispatch(getDeals());
  }, []);

  useEffect(() => {}, [featureProduct]);

  const showAllProducts = () => {
    setShowProduct(true);
    setShowAllCategoryPro(false);
    setShowAllMerchantPro(false);
    setShowDeals(false);
    setShowDiscounts(false);
    setShowFreeShipping(false);
  };

  const showAllCategoriesProduct = () => {
    console.log("ccc");
    if (showFreeShipping == true) {
      setShowAllCategoryPro(true);
      setShowFreeShipping(true);
    } else {
      setShowAllCategoryPro(true);
      setShowProduct(false);
      setShowAllMerchantPro(false);
      setShowDeals(false);
      setShowDiscounts(false);
    }
  };
  const showAllMerchantsProduct = () => {
    console.log("ccc");
    setShowAllMerchantPro(true);
    setShowProduct(false);
    setShowAllCategoryPro(false);
    setShowDeals(false);
    setShowDiscounts(false);
  };
  // ----------------------------------------------------------------------------------

  // React.useEffect(() => {
  //   dispatch(getProduct());
  // }, []);

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
                width: {
                  md: "20%",
                  sm: "40%",
                  xs: "40%",
                  display: "flex",
                  // direction: "column",
                  // fontWeight: "bold",
                  // alignItems: "center",
                  // justifyContent: "center",
                },
              }}
            >
              <List dense>
                {router?.query?.key == 1 && category?.length > 0 ? (
                  <>
                    {category?.map((result) => (
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
                        <ListItemIcon>
                          <Image
                            src={result.category_image}
                            width={50}
                            height={30}
                          ></Image>
                        </ListItemIcon>
                        <ListItemText>{result.category_name}</ListItemText>
                      </ListItem>
                    ))}
                  </>
                ) : (
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
                        <ListItemIcon>
                          <Image
                            src={result.imageURL}
                            width={50}
                            height={30}
                          ></Image>
                        </ListItemIcon>
                        <ListItemText>{result.campaignName}</ListItemText>
                        {/* </ListItemButton> */}
                        {/* <Divider /> */}
                      </ListItem>
                    ))}
                  </>
                )}
              </List>
            </Item>
            {console.log(featureProduct)}
            {featureProduct != "" ? (
              <Item
                sx={{
                  width: {
                    // m: 1,
                    md: "80%",
                    sm: "60%",
                    xs: "60%",
                  },
                }}
              >
                {/* <NewCarousel /> */}
                <Carousel
                  animation="slide"
                  swipe
                  interval={1000}
                  NextIcon={<ArrowRightIcon />}
                  PrevIcon={<ArrowLeftIcon />}
                  height={300}
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
                          bgcolor: "background.default",
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
                {/* <NewCarousel
                  product={featureProduct}
                  viewProduct={viewProduct}
                  addToCartHandler={addToCartHandler}
                /> */}
                {/* <CarouselApp
                  heading="Featured Products"
                  product={featureProduct}
                  viewProduct={viewProduct}
                  addToCartHandler={addToCartHandler}
                /> */}
              </Item>
            ) : (
              ""
            )}
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
              md={12}
              sx={{
                display: "flex",
                flexDirection: "row",
                bgcolor: "background.paper",
                m: 1,
                p: 1,
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <SortFilter
                data={data?.response}
                setFilterData={setFilterData}
                showAllProducts={showAllProducts}
                showAllMerchantsProduct={showAllMerchantsProduct}
                showAllCategoriesProduct={showAllCategoriesProduct}
              ></SortFilter>
              {/* <Box sx={{ flexGrow: 1 }} /> */}
              <FormControl>
                <RadioGroup
                  row
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}
                >
                  <motion.div className="animatable" whileTap={{ scale: 0.9 }}>
                    <FormControlLabel
                      value="deals"
                      control={<Radio onChange={handleChange} />}
                      label="Deals And Promotions"
                    />
                  </motion.div>
                  <motion.div className="animatable" whileTap={{ scale: 0.9 }}>
                    <FormControlLabel
                      value="discounts"
                      control={<Radio onChange={handleChange} />}
                      label="Discounts"
                    />
                  </motion.div>
                  <motion.div className="animatable" whileTap={{ scale: 0.9 }}>
                    <FormControlLabel
                      value="freeShipping"
                      control={<Radio onChange={handleChange} />}
                      label="freeShipping"
                    />
                  </motion.div>
                </RadioGroup>
              </FormControl>
            </Grid>
          </Grid>
          <Grid>
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
              <></>
            )}

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
              <></>
            )}

            {showDeals ? (
              <DealsAndPromotions
                data={filterData ? filterData : dealsData}
                showProduct={showProduct}
                showAllCategoryPro={showAllCategoryPro}
                showAllMerchantPro={showAllMerchantPro}
                filterData={filterData}
              ></DealsAndPromotions>
            ) : (
              <></>
            )}

            {showDiscounts &&
            showProduct == false &&
            showAllMerchantPro == false &&
            showDeals == false &&
            showFreeShipping == false ? (
              <Discounts
                data={filterData ? filterData : discountData}
                showProduct={showProduct}
                showAllCategoryPro={showAllCategoryPro}
                showAllMerchantPro={showAllMerchantPro}
                filterData={filterData}
              ></Discounts>
            ) : (
              <></>
            )}

            {showFreeShipping ? (
              <FreeShipping
                data={filterData ? filterData : freeShippingData}
                showProduct={showProduct}
                showAllCategoryPro={showAllCategoryPro}
                showAllMerchantPro={showAllMerchantPro}
                filterData={filterData}
              ></FreeShipping>
            ) : (
              <></>
            )}

            {/* <Grid sx={{ display: "flex", flexDirection: "column" }}> */}
            {showAllCategoryPro &&
            showDiscounts == false &&
            showAllMerchantPro == false &&
            showDeals == false &&
            showFreeShipping == false ? (
              <ProductGetByCategory
                data={filterData ? filterData : data?.response}
                Item={Item}
              ></ProductGetByCategory>
            ) : (
              <></>
            )}

            {showAllMerchantPro ? (
              <ProductGetByMerchant
                data={filterData ? filterData : data?.response}
                Item={Item}
              ></ProductGetByMerchant>
            ) : (
              <></>
            )}
          </Grid>
        </>
      )}
    </>
  );
}
