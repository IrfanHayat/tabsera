import React, { useEffect } from "react";
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
const Index = ({ data, showProduct }) => {
  const { dealsData } = useSelector((state) => state.deals);

  console.log(data);

  let dispatch = useDispatch();
  const router = useRouter();

  const viewProduct = (item) => {
    router.push({
      pathname: "/product_detail",
      query: { productId: item.bundleId },
    });
  };
  useEffect(() => {
    dispatch(getDeals());

    // dispatch(couponsData());
  }, []);

  useEffect(() => {}, [dealsData]);

  return (
    <Grid sx={{ display: "flex", flexWrap: "wrap" }}>
      {data && showProduct == false ? (
        <DealAndPromotions dealsData={data} viewProduct={viewProduct} />
      ) : (
        <></>
      )}

      {data && showProduct == true ? (
        <DealAndPromotions dealsData={data && data} viewProduct={viewProduct} />
      ) : (
        <></>
      )}
    </Grid>
  );
};
export default Index;
