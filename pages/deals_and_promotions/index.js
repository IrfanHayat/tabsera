import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { getDeals } from "../../slice/dealsPromotionsSlice";
import { getDiscounts } from "../../slice/discountsSlice";
import { getFreeShipping } from "../../slice/freeShippingSlice";
import { couponsData } from "../../slice/couponsSlice";
import Grid from "@mui/material/Grid";
import DealAndPromotions from "../../container/DealsAndPromotions/DealsAndPromotions";

import { TransitionGroup } from "react-transition-group";
import { useRouter } from "next/router";
import ActionAreaCard from "../../container/Card";
import {
  addToBasket,
  clearBasket,
  addToCart,
  decreaseBasket,
  getTotals,
  removeFromBasket,
  getCartItems,
  getTotalCartQuantity,
} from "../../slice/basketSlice";
import Cookies from "js-cookie";
const Index = ({ data, showProduct }) => {
  const { dealsData } = useSelector((state) => state.deals);
  const [open, setOpen] = React.useState(false);
  let [status, setStatus] = useState();
  console.log(data);

  let dispatch = useDispatch();
  const router = useRouter();

  const viewProduct = (item) => {
    router.push({
      pathname: "/bundles_details",
      query: { productId: item.bundleId },
    });
  };
  useEffect(() => {
    dispatch(getDeals());

    // dispatch(couponsData());
  }, []);
  const addToCartHandler = async (product) => {
    console.log(product)
    let obj = {
      "productId": product.product_id,
      "productName": product.product_name,
      "productImage": product.bundleImage,

      "productCost": product.bundleCost,

      "merchantId": product.merchantId,

    }
    let result = await dispatch(addToCart(obj));
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
  useEffect(() => { }, [dealsData]);

  return (
    <Grid sx={{ display: "flex", flexWrap: "wrap" }}>
      {data && showProduct == false ? (
        <DealAndPromotions dealsData={data} viewProduct={viewProduct} addToCartHandler={addToCartHandler} />
      ) : (
        <></>
      )}

      {data && showProduct == true ? (
        <DealAndPromotions dealsData={data && data} addToCartHandler={addToCartHandler} viewProduct={viewProduct} />
      ) : (
        <></>
      )}
    </Grid>
  );
};
export default Index;
