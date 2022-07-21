import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { getDeals } from "../../slice/dealsPromotionsSlice";
import Grid from "@mui/material/Grid";
import DealsAndPromotions from "../../container/DealsAndPromotions/DealsAndPromotions";

import { TransitionGroup } from 'react-transition-group';
import { useRouter } from "next/router";
import ActionAreaCard from "../../container/Card";
const Index = () => {
  const { dealsData } = useSelector((state) => state.deals);
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
  }, []);

  useEffect(() => {}, [dealsData]);


  return (
    <Grid container justifyContent="center" >
    
      <DealsAndPromotions
        viewProduct={viewProduct}
        dealsData={dealsData && dealsData}
      />
      
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
