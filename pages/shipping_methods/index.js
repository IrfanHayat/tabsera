import ShippingMethods from "../../container/ShippingMethods";

import React, { useEffect,useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  getShipmentsCharges,
  getShipmentsMethods,
  getCustomer
} from "../../slice/shipmentSlice";

const index = () => {
   

  const { shipmentMethodData,userData } = useSelector(
    state => state.shipments
  );
  const { cartItems } = useSelector(
    state => state.basket.cart
  );
  let router = useRouter();
  let dispatch=useDispatch()



  const checkoutHandler = () => {
  //  router.push("/placeorder");
    router.push({pathname:"/placeorder",query:router.query});
  };


  
  console.log("Here")
 console.log(shipmentMethodData)
 console.log("-------------") 
 const handleChange=(event, value)=>{
  console.log(value)
  let result=shipmentMethodData.filter(result=>result.shipping_method_id==value?result:'')[0]
    console.log(result)
    console.log(router.query.city_id)
   let obj={"cartId":611,
   "shipmentMethodId":result.shipping_method_id,
   "shipmentMethodType":result.shipping_method_type_id,
   "shippingAddress":{"address":router.query.address,"addressId":router.query.address_id,"city_id":router.query.city_id,"countryId":router.query.country_id,"stateId":router.query.state_id}}
 
  dispatch(getShipmentsCharges(obj))
 }
 
 useEffect(()=>{
  let obj={
    "address":router.query.address,
    "bundle_id":null,
    "cart_id":611,
    "city_id":router.query.city_id,
    "country_id":router.query.country_id,
    "shipment_method_type":"address",
    "sku_id":null,
    "state_id":router.query.state_id
 }

 dispatch(getShipmentsMethods(obj))
 dispatch(getCustomer())
 },[router])


  return (
    <div>
      <ShippingMethods  productPrice={cartItems}  userData={userData}shippementData={router.query} handleChange={handleChange} shipmentMethodData={shipmentMethodData} checkoutHandler={checkoutHandler}/>
    </div>
  );
};

export default index;
