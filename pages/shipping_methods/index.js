import ShippingMethods from "../../container/ShippingMethods";

import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  getShipmentsCharges,
  getShipmentsMethods,
  getCustomer,
  getShipmentAddress
} from "../../slice/shipmentSlice";
import { getCartItems } from "../../slice/basketSlice";

const index = () => {
  const { shipmentMethodData,shippingAddressData, userData } = useSelector(
    state => state.shipments
  );
  const [shippementData,setShippementData]=useState()

  const { cartItems } = useSelector(state => state.basket.cart);
  let router = useRouter();
  let dispatch = useDispatch();

  const checkoutHandler = () => {
    
    router.push({ pathname: "/placeorder", query: router.query });
  };

 
  const handleChange = (event, value) => {
  
    let result = shippingAddressData.filter(result =>{
      
      if(result.address_id == router.query.addressId) return result  
    }
      
    )[0];
    
  
    let obj = {
      address: result.address,
      bundle_id: null,
      cart_id: 611,
      city_id: result.city_id,
      country_id: result.country_id,
      shipment_method_type: "address",
      sku_id: null,
      state_id: result.state_id,
    };

  
    dispatch(getShipmentsCharges(obj));
  };
  useEffect(() => {
    dispatch(getShipmentAddress());
  }, []);

  useEffect(() => {
  
    let result1 = shippingAddressData.filter(result =>result.address_id == router.query.addressId?  result:'' );
    

    setShippementData(result1[0])
    
    let obj = {
      address: result1[0]?.address,
      bundle_id: null,
      cart_id: 611,
      city_id: result1[0]?.city_id,
      country_id: result1[0]?.country_id,
      shipment_method_type: "address",
      sku_id: null,
      state_id: result1[0]?.state_id,
    };

   dispatch(getShipmentsMethods(obj));
    dispatch(getCustomer());
    dispatch(getCartItems());
  }, [router,shippementData]);

  return (
    <div>
      <ShippingMethods
        productPrice={cartItems}
        userData={userData}
        shippementData={shippementData}
        handleChange={handleChange}
        shipmentMethodData={shipmentMethodData}
        checkoutHandler={checkoutHandler}
      />
    </div>
  );
};

export default index;
