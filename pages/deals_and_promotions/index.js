import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { getDeals } from "../../slice/dealsPromotionsSlice";
import { getDiscounts } from "../../slice/discountsSlice";
import { getFreeShipping } from "../../slice/freeShippingSlice";
import { couponsData } from "../../slice/couponsSlice";
import Grid from "@mui/material/Grid";
import DealsAndPromotions from "../../container/DealsAndPromotions/DealsAndPromotions";

import { TransitionGroup } from "react-transition-group";
import { useRouter } from "next/router";
import ActionAreaCard from "../../container/Card";
const Index = () => {
  const { dealsData } = useSelector((state) => state.deals);
  const { discountsData } = useSelector((state) => state.discounts);
  const { freeShippingData } = useSelector((state) => state.freeShipping);
  const { couponsData } = useSelector((state) => state.coupons);
  let dispatch = useDispatch();
  const router = useRouter();

  console.log(discountsData);
  console.log(freeShippingData);

  const viewProduct = (item) => {
    router.push({
      pathname: "/product_detail",
      query: { productId: item.bundleId },
    });
  };
  useEffect(() => {
    dispatch(getDeals());
    dispatch(getDiscounts());
    dispatch(getFreeShipping());
    // dispatch(couponsData());
  }, []);

  useEffect(() => {}, [dealsData]);

  return (
    <Grid container justifyContent="center">
      {discountsData.length > 0 ? (
        <DealsAndPromotions
          viewProduct={viewProduct}
          discountsData={discountsData && discountsData}
          // dealsData={dealsData && dealsData}
        />
      ) : (
        ""
      )}

      {/* {dealsData.map((result) => (
        <ActionAreaCard
          dealsData={dealsData && dealsData}
          viewProduct={viewProduct}
        />
      ))} */}
    </Grid>
  );
};
export default Index;
