import React, { useEffect, useState } from "react";
import Discounts from "../../container/DealsAndPromotions/Discounts";
import { getDiscounts } from "../../slice/discountsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
import SortFilter from "../../container/Filter/SortFilter";
import ProductGetByCategory from "../get_all_products_by_category/index";
import ProductGetByMerchant from "../get_all_products_by_merchant/index";
import { styled, useTheme, alpha } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import ViewAllProducts from "../../pages/all_products";


const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));

function Index({
  data,
  showDiscounts,
  showAllCategoryPro,
  showAllMerchantPro,
  filterData,
}) {
  const { discountsData } = useSelector((state) => state.discounts);
  let dispatch = useDispatch();
  const router = useRouter();

  //sort

  //

  console.log(data);

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
      // setTimeout(() => {
      //   router.push("/cart");
      // }, 1000);
    }
  };

  const viewProduct = (item) => {
    router.push({
      pathname: "/product_detail",
      query: { productId: item.productId },
    });
  };
  useEffect(() => {
    dispatch(getDiscounts());
    // dispatch(couponsData());
  }, []);

  return (
    <>
      {console.log(data)}
      <Grid container justifyContent="center">
        {data?.length > 0 ? (
          <>



            <ViewAllProducts
              viewProduct={viewProduct}
              data={data}

            // dealsData={dealsData && dealsData}
            />

            {showAllCategoryPro ? (
              <ProductGetByCategory
                data={filterData ? filterData : discountsData}
                Item={Item}
              ></ProductGetByCategory>
            ) : (
              <></>
            )}

            {showAllMerchantPro ? (
              <ProductGetByMerchant
                data={filterData ? filterData : discountsData}
                Item={Item}
              ></ProductGetByMerchant>
            ) : (
              <></>
            )}
          </>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}

export default Index;
