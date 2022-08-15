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
import ViewAllProducts from '../pages/all_products'
import ProductGetByCategory from '../pages/get_all_products_by_category';
import ProductGetByMerchant from '../pages/get_all_products_by_merchant';
import _ from "lodash";

import Checkbox from '@mui/material/Checkbox';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';

import SortFilter from "./Filter/SortFilter";
import { motion } from 'framer-motion'
import DealsAndPromotions from "../pages/deals_and_promotions";


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

  // checkbox 
  const [state, setState] = React.useState({
    deals: false,
    discounts: false,
    freeShipping: false,
  });

  //deals and promotions
  let [dealsData, setDealsData] = useState()
  let [showDeals, setShowDeals] = useState(false)



  const handleChange = async (event) => {
    console.log(event.target.name)
    console.log(event.target.checked)
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
    if (event.target.name == 'deals') {
      let deals = await dispatch(getDeals());

      setDealsData(deals.payload)
      setShowProduct(false)
      setShowDeals(true)

    }
    // if (event.target.name == 'discounts') {
    //   router.push('/discounts')
    // }
    // if (event.target.name == 'freeShipping') {
    //   router.push('/is_free_shipping')
    // }



  };

  const { deals, discounts, freeShipping } = state;
  const error = [deals, discounts, freeShipping].filter((v) => v).length !== 2;
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
  }


  const showAllCategoriesProduct = () => {
    console.log("ccc")
    setShowAllCategoryPro(true)
    setShowProduct(false)
    setShowAllMerchantPro(false)
  }
  const showAllMerchantsProduct = () => {
    console.log("ccc")
    setShowAllMerchantPro(true)
    setShowProduct(false)
    setShowAllCategoryPro(false)
  }
  // ----------------------------------------------------------------------------------

  // React.useEffect(() => {
  //   dispatch(getProduct());
  // }, []);

  const dealsPromotions = <div>yes</div>;
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
        <Grid component="main" sx={{ mt: 2 }} maxWidth="xl">
          {featureProduct != "" ? (
            <Grid data-aos="fade-up" item xs={12} md={12}>
              <Item>

                <CarouselApp
                  heading="Featured Products"
                  product={featureProduct}
                  viewProduct={viewProduct}
                  addToCartHandler={addToCartHandler}
                />
              </Item>
            </Grid>
          ) : (
            ""
          )}
          {/* <NewCarousel
            product={
              product &&
              product.slice([6], [12]).map((item, i) => {
                return item;
              })
            }
          /> */}

          {/* <Grid item xs={12} md={12}>
            <MenuCard
              heading="Deals & Promotions"
              dealsData={dealsData}
              discountsData={discountsData}
              freeShippingData={freeShippingData}
            />
          </Grid> */}

          <SortFilter data={data?.response} setFilterData={setFilterData} showAllProducts={showAllProducts} showAllMerchantsProduct={showAllMerchantsProduct} showAllCategoriesProduct={showAllCategoriesProduct}></SortFilter>

          <Grid data-aos="fade-up" sx={{ display: "flex" }}>
            <Box
              sx={{

                p: 1,
                my: 1,
                bgcolor: "background.paper",
                borderRadius: 0,
              }}
            >
              <Box>

                <FormControl sx={{ m: 3 }} component="fieldset" variant="standard">

                  <FormGroup>
                    <motion.div
                      className="animatable"

                      whileTap={{ scale: 0.9 }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox checked={deals} onChange={handleChange} name="deals" />
                        }
                        label="Deals And pormotions"
                      />
                    </motion.div>
                    <motion.div
                      className="animatable"

                      whileTap={{ scale: 0.9 }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox checked={discounts} onChange={handleChange} name="discounts" />
                        }
                        label="Discounts"
                      />
                    </motion.div>
                    <motion.div
                      className="animatable"

                      whileTap={{ scale: 0.9 }}
                    >
                      <FormControlLabel
                        control={
                          <Checkbox checked={freeShipping} onChange={handleChange} name="freeShipping" />
                        }
                        label="Free Shipping"
                      />
                    </motion.div>
                  </FormGroup>

                </FormControl>

              </Box>

            </Box>

            {
              showProduct == false && showAllCategoryPro == false && showAllMerchantPro == false && showDeals == false ?
                <ViewAllProducts Item={Item} data={filterData ? filterData : data?.response}></ViewAllProducts> : <></>

            }

            {
              showProduct ?
                <ViewAllProducts Item={Item} data={filterData ? filterData : data?.response}></ViewAllProducts> : <></>

            }
            {
              showDeals ?
                <DealsAndPromotions data={filterData ? filterData : dealsData}></DealsAndPromotions> : <></>

            }

            <Grid sx={{ display: 'flex', flexDirection: "column" }}>
              {showAllCategoryPro ?
                <ProductGetByCategory data={filterData ? filterData : data?.response} Item={Item}></ProductGetByCategory> : <></>}

              {showAllMerchantPro ?
                <ProductGetByMerchant data={filterData ? filterData : data?.response} Item={Item}></ProductGetByMerchant> : <></>}

            </Grid>
          </Grid>

        </Grid>
      )
      }
    </Grid >
  );
}
