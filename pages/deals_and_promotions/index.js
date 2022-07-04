import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { getDeals } from "../../slice/dealsPromotionsSlice";
import { Grid } from "@mui/material";
import DealsAndPromotions from "../../container/DealsAndPromotions/DealsAndPromotions";
const index = () => {
  const { dealsData } = useSelector((state) => state.deals);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDeals());
  }, []);

  useEffect(() => {}, [dealsData]);
  console.log("Deals Data = ", dealsData);

  return (
    <Grid container justifyContent="center">
      <DealsAndPromotions dealsData={dealsData && dealsData} />;
    </Grid>
  );
};

export default index;
