import React, { useState, useEffect } from "react";
import Details from "../../component/Detail";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket } from "../../slice/basketSlice";
import { useRouter, withRouter } from "next/router";

function product_detail(props) {
  const product = useSelector(state => state.product.productData);
  let router = useRouter();
   
  let dispatch = useDispatch();
  let [filterData, setFilterData] = useState({});
  useEffect(() => {
    let new_arr = product.filter(result => result.productId == router?.query?.productId);
    setFilterData(new_arr[0]);
  }, [router.query.id]);

  const addToCartHandler = product => {
    dispatch(addToBasket(product));
  };

  return (
    <div>
      <Details
        productDetail={filterData}
        addToCartHandler={addToCartHandler}
      ></Details>
    </div>
  );
}

export default withRouter(product_detail);
