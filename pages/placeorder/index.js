import React, { useState, useEffect } from "react";
import PlaceOrder from "../../container/PlaceOrder";
import { useRouter, withRouter } from "next/router";

import useStyles from "../../utils/styles";

//import { clearBasket } from "../../slice/basketSlice";
//import Cookies from 'js-cookie';
import { useSelector, useDispatch } from "react-redux";
import localStorage from "localStorage";
import { getTotals } from "../../slice/basketSlice";
import {
  getShipmentAddress,
  getCustomer,
 
} from "../../slice/shipmentSlice";

function placeorder() {
  let [groupProductData, setGroupedProductData] = useState();
  const { userData,shippingAddressData } = useSelector(state => state.shipments);
  const [shippementData,setShippementData]=useState()
  const classes = useStyles();
  const router = useRouter();
  const dispatch = useDispatch();

  const {
    cart: { cartItems },
  } = useSelector(state => state.basket);

  useEffect(() => {
    //dispatch(getCartItems())

    // dispatch(getCartItems())
    var groupedCategory = groupArrayOfObjects(cartItems);
    setGroupedProductData(groupedCategory);
  }, [cartItems]);

  function groupArrayOfObjects(list) {
    const grouped = _.groupBy(list, items => items.merchant_id);
    return grouped;
  }

  useEffect(() => {
    dispatch(getTotals());
  }, []);
  useEffect(() => {
    let result1 = shippingAddressData.filter(result =>result.address_id == router.query.addressId?  result:'' );
    
    
    setShippementData(result1[0])
  
   dispatch(getCustomer());
   
  }, [router,shippementData,shippingAddressData]);

  useEffect(() => {
    dispatch(getShipmentAddress());
  }, []);
  return (
    <>
      <PlaceOrder
        // shippingAddress={shippingAddress}
        // shippingPrice={shippingPrice}
        // taxPrice={taxPrice}
        // totalPrice={totalPrice}
        // placeOrderHandler={placeOrderHandler}
        // loading={loading}
        classes={classes}
        //paymentMethod={paymentMethod}
        cartItems={cartItems}
        userData={userData}
        productPrice={cartItems}
        productCartData={groupProductData}
        shippementData={shippementData}
        //itemsPrice={itemsPrice}
      ></PlaceOrder>
    </>
  );
}

export default withRouter(placeorder);
