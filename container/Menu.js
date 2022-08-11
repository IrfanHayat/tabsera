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
  // show all merchants
  const [showAllMerchantPro, setShowAllMerchantPro] = useState(false)

  // const product = useSelector((state) => state.product.productData);
  // const { productData, loading } = useSelector((state) => state.product);
  let product = data?.response;

  const sortingCategories = (
    <div>
      <MenuItem>
        <ListItemText>Price</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText>Rating</ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText>Orders</ListItemText>
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
        <Grid component="main" maxWidth="xl">
          {featureProduct != "" ? (
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

          <Box
            sx={{
              display: "flex",
              // justifyContent: "space-around",
              p: 1,
              my: 1,
              bgcolor: "background.paper",
              borderRadius: 0,
            }}
          >
            <Box>
              <Typography sx={{ display: "inline" }}>List By : </Typography>
              <Button variant="text" onClick={showAllProducts}>Products</Button>
              <Button variant="text" onClick={showAllMerchantsProduct}>Sellers</Button>
              <Button variant="text" onClick={showAllCategoriesProduct}>Categories</Button>
            </Box>
            <Box sx={{ flexGrow: 0.85 }} />
            <Box>
              {/* <Button variant="text">Sort By</Button> */}
              <NavSelect
                Title="Sort By"
                Data={sortingCategories}
                color="black"
              />
            </Box>
          </Box>

          {
            showProduct ?
              <ViewAllProducts Item={Item}></ViewAllProducts> : <></>

          }
          {showAllCategoryPro ?
            <ProductGetByCategory data={data} Item={Item}></ProductGetByCategory> : <></>}
          {showAllMerchantPro ?
            <ProductGetByMerchant data={data} Item={Item}></ProductGetByMerchant> : <></>}
        </Grid>
      )}
    </Grid>
  );
}
