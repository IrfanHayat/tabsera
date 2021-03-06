import ShippingMethods from "../../container/ShippingMethods";

import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  getShipmentsCharges,
  getShipmentsMethods,
  getCustomer,
  getShipmentAddress,
} from "../../slice/shipmentSlice";
import { getCartItems } from "../../slice/basketSlice";
import useStyles from "../../utils/styles";
const Index = () => {
  const { shipmentMethodData, shippingAddressData, shippingCharges, userData } = useSelector(
    state => state.shipments
  );
  const [shippementData, setShippementData] = useState();
  const classes = useStyles();
  const { cartItems,cartId } = useSelector(state => state.basket.cart);
  const [shippementCharges,setShippementCharges]=useState()
  const [shippingMethodId,setShippingMethodId]=useState()
  let router = useRouter();
  let dispatch = useDispatch();

  const checkoutHandler = () => {
    router.push({ pathname: "/placeorder", query: {addressId:router.query.addressId,shipId:shippingMethodId.shipping_method_id,shipName:shippingMethodId.shipping_method_name} });
  };

  const handleChange =async ( value) => {
  
    setShippingMethodId(value)
    let result = shippingAddressData.filter(result => {
      if (result.address_id == router.query.addressId) return result;
    })[0];
  
               
    let obj = {
      cartId: cartId,
      shipmentMethodId: value.shipping_method_id,
      shipmentMethodType: "address",
      shippingAddress: {
        address: result.address,
        addressId: result.address_id,
        cityId: result.city_id,
        countryId: result.country_id,
        stateId: result.state_id,
      },
    };

    // let obj = {
    //   address: result.address,
    //   bundle_id: null,
    //   cart_id: 611,
    //   city_id: result.city_id,
    //   country_id: result.country_id,
    //   shipment_method_type: "address",
    //   sku_id: null,
    //   state_id: result.state_id,
    // };
 let result2=await dispatch(getShipmentsCharges(obj));

 setShippementCharges(result2.payload.charges)
  };

  

  useEffect(() => {
    dispatch(getShipmentAddress());
  }, []);

  useEffect(() => {
    localStorage.setItem("addressId",JSON.stringify(router.query.addressId))
    let result1 = shippingAddressData.filter(result =>
      result.address_id == router.query.addressId ? result : ""
    );

    setShippementData(result1[0]);

    let obj = {
      address: result1[0]?.address,
      bundle_id: null,
      cart_id: cartId?cartId:'',
      city_id: result1[0]?.city_id,
      country_id: result1[0]?.country_id,
      shipment_method_type: "address",
      sku_id: null,
      state_id: result1[0]?.state_id,
    };

    dispatch(getShipmentsMethods(obj));
    dispatch(getCustomer());
    dispatch(getCartItems());
  }, [router, shippementData]);

  return (
    <div>
      <ShippingMethods
        productPrice={cartItems}
        userData={userData}
        shippementData={shippementData}
        handleChange={handleChange}
        shipmentMethodData={shipmentMethodData}
        checkoutHandler={checkoutHandler}
        classes={classes}
        shippingCharges={shippementCharges}
      />
    </div>
  );
};

export default Index;
