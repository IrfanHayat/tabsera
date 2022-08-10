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
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

export default function PersistentDrawerLeft() {
  const { data, isLoading, isFetching, isError } = useGetAllProductsQuery();
  const { dealsData } = useSelector((state) => state.deals);
  const { discountsData } = useSelector((state) => state.discounts);
  const { freeShippingData } = useSelector((state) => state.freeShipping);
  const { couponsData } = useSelector((state) => state.coupons);

  console.log(discountsData);
  console.log(dealsData);
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
  const category = useSelector((state) => state.category.categoryData);

  let [groupProduct, setGroupedProduct] = useState();

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
    dispatch(getCategory());
    dispatch(getFreeShipping());
    dispatch(getDeals());
  }, []);

  function groupArrayOfObjects(list) {
    const grouped = _.groupBy(list, (items) => items.categoryName);
    return grouped;
  }
  useEffect(() => {
    if (data) {
      var groupedCategory = groupArrayOfObjects(data.response);
      setGroupedProduct(groupedCategory);
    }
  }, [product, data]);

  // const categoryData = (category) => {
  //   let result1 =
  //     category &&
  //     category.map((result) => {
  //       if (result.child.length > 0) {
  //         return result.child;
  //       }
  //     });
  //   let result3 =
  //     category &&
  //     category.map((result) => {
  //       if (result.child.length > 0) {
  //         return result.category_name;
  //       }
  //     });

  //   let result2 = result1 && result1.filter((result) => result != undefined);
  //   let result4 = result3 && result3.filter((result) => result != undefined);

  //   if (groupProduct) {
  //     let result5 = Object.keys(groupProduct).map((pro) => {
  //       if (pro == result4.toString().split(" ").join("")) {
  //         let result = groupProduct[pro].concat(result2[0]);
  //         groupProduct[pro] = result;
  //         return groupProduct;
  //       }
  //     });
  //     let result6 = result5.filter((result) => result != undefined);
  //     setGroupedProduct(result6[0]);
  //   }
  // };

  // useMemo(() => categoryData(category), [category && category && groupProduct]);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

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
              <Button variant="text">Products</Button>
              <Button variant="text">Sellers</Button>
              <Button variant="text">Categories</Button>
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
          {groupProduct &&
            Object.keys(groupProduct).map((key, index) => (
              <Grid item xs={12} md={12} key={index}>
                <Item>
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
        </Grid>
      )}
    </Grid>
  );
}
