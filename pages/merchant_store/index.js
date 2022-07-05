import React, { useState, useMemo, useEffect } from "react";
import Details from "../../container/Detail";
import { useSelector, useDispatch } from "react-redux";
import {
  addToBasket,
  addToCart,
  getTotalCartQuantity,
} from "../../slice/basketSlice";
import { useRouter, withRouter } from "next/router";
import { getMerchantStore } from "../../slice/merchantStoreSlice";
import MerchantStore from "../../container/MerchantStore";

function product_detail(props) {
  let dispatch = useDispatch();

  const { merchantStoreData } = useSelector((state) => state.merchantStore);
  console.log("merchant Store Data", merchantStoreData);

  useEffect(() => {
    dispatch(getMerchantStore(merchantStoreData.merchant_id));
  }, []);

  return (
    <div>
      <MerchantStore merchantStoreDetail={merchantStoreData} />
    </div>
  );
}

export default withRouter(product_detail);
