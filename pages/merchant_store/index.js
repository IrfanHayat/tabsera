import React, { useState, useMemo, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { useRouter, withRouter } from "next/router";
import { getMerchantStore } from "../../slice/merchantStoreSlice";
import { getMerchantReviews } from "../../slice/reviewsSlice";
import MerchantStore from "../../container/MerchantStore";

function Product_detail() {
  let dispatch = useDispatch();

  let router = useRouter();
  const { merchantStoreData } = useSelector((state) => state.merchantStore);




  const { reviewsData } = useSelector((state) => state.reviews);



  useEffect(() => {
    dispatch(getMerchantStore(router.query.merchantId));
    dispatch(getMerchantReviews());
  }, []);

  return (
    <div>
      <MerchantStore merchantStoreDetail={merchantStoreData} />
    </div>
  );
}

export default withRouter(Product_detail);
