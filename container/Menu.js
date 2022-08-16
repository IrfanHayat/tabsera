import React, { useMemo, useEffect, useState } from "react";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";

import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

import { useSelector, useDispatch } from "react-redux";
import { getFreeShipping } from "../slice/freeShippingSlice";
import { getDeals } from "../slice/dealsPromotionsSlice";
import { useRouter } from "next/router";
import { addToBasket } from "../slice/basketSlice";
import { getProduct, getFeatureProduct } from "../slice/productSlice";
import { getCategory } from "../slice/categorySlice";
import NewCarousel from "./Carousel/NewCarousel";
import CarouselApp from "./Carousel/Carousel";
import { useGetAllProductsQuery } from "../RTK/productApi";
import MenuCard from "./DealsAndPromotions/MenuCards";
import { CircularProgress, Typography } from "@mui/material";
import { getDiscounts } from "../slice/discountsSlice";
import Button from "@mui/material/Button";
import NavSelect from "./Navbar/Components/NavSelect";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import ViewAllProducts from "../pages/all_products";
import ProductGetByCategory from "../pages/get_all_products_by_category";
import ProductGetByMerchant from "../pages/get_all_products_by_merchant";
import _ from "lodash";
import Radio from '@mui/material/Radio';
import Checkbox from "@mui/material/Checkbox";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormHelperText from "@mui/material/FormHelperText";
import RadioGroup from '@mui/material/RadioGroup';
import SortFilter from "./Filter/SortFilter";
import { motion } from 'framer-motion'
import DealsAndPromotions from "../pages/deals_and_promotions";
import Discounts from "../pages/discounts";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

export default function PersistentDrawerLeft() {
  const { data, isLoading, isFetching, isError } = useGetAllProductsQuery();

  // show all products
  const [showProduct, setShowProduct] = useState(false)
  // show all categories
  const [showAllCategoryPro, setShowAllCategoryPro] = useState(false)
  const [filterData, setFilterData] = useState()

  // show all merchants
  const [showAllMerchantPro, setShowAllMerchantPro] = useState(false)

  // const product = useSelector((state) => state.product.productData);
  // const { productData, loading } = useSelector((state) => state.product);
  let product = data?.response;
  const [value, setValue] = React.useState();
  // checkbox 
  const [state, setState] = React.useState({
    deals: false,
    discounts: false,
    freeShipping: false,
  });

  //deals and promotions
  let [dealsData, setDealsData] = useState()
  let [showDeals, setShowDeals] = useState(false)


  //discounts
  let [discountData, setDiscountData] = useState()
  let [showDiscounts, setShowDiscounts] = useState(false)




  const handleChange = async (event) => {
    console.log(event.target.value)


    if (event.target.value == 'deals') {
      let deals = await dispatch(getDeals());
      console.log(deals)
      setDealsData(deals.payload)
      setShowProduct(false)
      setShowDeals(true)

      setShowAllCategoryPro(false)
      setShowAllMerchantPro(false)
      setShowDiscounts(false)

    }
    if (event.target.value == 'discounts') {
      let discounts = await dispatch(getDiscounts());
      console.log(discounts.payload)
      setDiscountData(discounts.payload)
      setShowProduct(false)
      setShowDiscounts(true)

      setShowAllCategoryPro(false)
      setShowAllMerchantPro(false)
      setShowDeals(false)
    }
    // if (event.target.name == 'freeShipping') {
    //   router.push('/is_free_shipping')
    // }
  };



  /////////






  const featureProduct = useSelector(
    (state) => state.product.featureProductData
  );

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
  // function groupArrayOfObjects(list, key, category1) {
  //   return list.reduce(function (rv, x) {
  //     rv[x[key].split(" ").join("")] = rv[x[key].split(" ").join("")] || [];
  //     rv[x[key].split(" ").join("")].push(x);

  //     return rv;
  //   }, {});
  // }

  useEffect(() => {
    dispatch(getFeatureProduct());
    dispatch(getDiscounts());
    dispatch(getFreeShipping());
    dispatch(getDeals());
  }, []);

  const showAllProducts = () => {
    setShowProduct(true)
    setShowAllCategoryPro(false)
    setShowAllMerchantPro(false)
    setShowDeals(false)
    //setShowDiscounts(false)
  }


  const showAllCategoriesProduct = () => {
    console.log("ccc");
    setShowAllCategoryPro(true);
    setShowProduct(false);
    setShowAllMerchantPro(false);
    setShowDeals(false)
    // setShowDiscounts(false)
  };
  const showAllMerchantsProduct = () => {
    console.log("ccc");
    setShowAllMerchantPro(true);
    setShowProduct(false);
    setShowAllCategoryPro(false);
    setShowDeals(false)
    setShowDiscounts(false)
  };
  // ----------------------------------------------------------------------------------

  // React.useEffect(() => {
  //   dispatch(getProduct());
  // }, []);


  return (
    <Grid>
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
        <Grid component="main" maxWidth="xl">
          <Grid
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
                  //  sm: "50%", xs: "50%"
                },
              }}
            >
              Categories
            </Item>

            {featureProduct != "" ? (
              <Item
                sx={{
                  width: {
                    md: "80%",
                    //  sm: "50%", xs: "50%"
                  },
                }}
              >
                <CarouselApp
                  heading="Featured Products"
                  product={featureProduct}
                  viewProduct={viewProduct}
                  addToCartHandler={addToCartHandler}
                />
              </Item>
            ) : (
              ""
            )}
          </Grid>
          <SortFilter
            data={data?.response}
            setFilterData={setFilterData}
            showAllProducts={showAllProducts}
            showAllMerchantsProduct={showAllMerchantsProduct}
            showAllCategoriesProduct={showAllCategoriesProduct}
          ></SortFilter>

          <Grid
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
                  //  sm: "50%", xs: "50%"
                },
                maxHeight: "200px",
              }}
            >
              <FormControl>
                <FormLabel id="demo-controlled-radio-buttons-group">Pages</FormLabel>
                <RadioGroup
                  aria-labelledby="demo-controlled-radio-buttons-group"
                  name="controlled-radio-buttons-group"
                  value={value}

                >
                  <FormControlLabel value="deals" control={<Radio onChange={handleChange} />} label="Deals And Promotions" />
                  <FormControlLabel value="discounts" control={<Radio onChange={handleChange} />} label="Discounts" />
                </RadioGroup>
              </FormControl>
              {/* <FormControl
                sx={{ m: 3 }}
                component="fieldset"
                variant="standard"
              >
                <FormGroup>
                  <motion.div className="animatable" whileTap={{ scale: 0.9 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={deals}
                          onChange={handleChange}
                          name="deals"
                        />
                      }
                      label="Deals And pormotions"
                    />
                  </motion.div>
                  <motion.div className="animatable" whileTap={{ scale: 0.9 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={discounts}
                          onChange={handleChange}
                          name="discounts"
                        />
                      }
                      label="Discounts"
                    />
                  </motion.div>
                  <motion.div className="animatable" whileTap={{ scale: 0.9 }}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={freeShipping}
                          onChange={handleChange}
                          name="freeShipping"
                        />
                      }
                      label="Free Shipping"
                    />
                  </motion.div>
                </FormGroup>
              </FormControl> */}
            </Item>

            <Item
              sx={{
                width: {
                  md: "80%",
                  //  sm: "50%", xs: "50%"
                },
              }}
            >
              {showProduct == false &&
                showAllCategoryPro == false &&
                showAllMerchantPro == false && showDeals == false && showDiscounts == false ? (
                <ViewAllProducts
                  Item={Item}
                  data={filterData ? filterData : data?.response}
                ></ViewAllProducts>
              ) : (
                <></>
              )}

              {showProduct && showDiscounts == false && showAllCategoryPro == false &&
                showAllMerchantPro == false && showDeals == false ? (
                <ViewAllProducts
                  Item={Item}
                  data={filterData ? filterData : data?.response}
                ></ViewAllProducts>
              ) : (
                <></>
              )}

              {
                showDeals ?
                  <DealsAndPromotions data={filterData ? filterData : dealsData} showProduct={showProduct} showAllCategoryPro={showAllCategoryPro} showAllMerchantPro={showAllMerchantPro} filterData={filterData}></DealsAndPromotions> : <></>

              }

              {

                showDiscounts ?
                  <Discounts data={filterData ? filterData : discountData} showProduct={showProduct} showAllCategoryPro={showAllCategoryPro} showAllMerchantPro={showAllMerchantPro} filterData={filterData}></Discounts> : <></>

              }

              {/* <Grid sx={{ display: "flex", flexDirection: "column" }}> */}
              {showAllCategoryPro && showDiscounts == false &&
                showAllMerchantPro == false && showDeals == false ? (
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
            </Item>
          </Grid>
        </Grid>
        // </Grid>
      )}
    </Grid>
  );
}
