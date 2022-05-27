import React, { useState, useEffect } from "react";
import Details from "../../component/Detail";
import { useSelector, useDispatch } from "react-redux";

import { useRouter, withRouter } from "next/router";
function product_detail(props) {
  const product = useSelector(state => state.product.productData);
  let router = useRouter();

  let [filterData, setFilterData] = useState({});
  useEffect(() => {
    let new_arr = product.filter(result => result.id == router?.query?.id);
    setFilterData(new_arr[0]);
  }, [router.query.id]);
 
  

  const checkoutHandler = (item) => {
 
      router.push({
      pathname: '/cart',
      query: { id:item.id }
  })
  };

  return (
    <div>
      <Details productDetail={filterData}  checkoutHandler={checkoutHandler}></Details>
    </div>
  );
}

export default withRouter(product_detail);