import React, { useState, useEffect } from "react";
import PlaceOrder1 from "../../container/PlaceOrder";
import { useRouter, withRouter } from "next/router";

import useStyles from "../../utils/styles";

//import { clearBasket } from "../../slice/basketSlice";
//import Cookies from 'js-cookie';
import { useSelector, useDispatch } from "react-redux";
import localStorage from "localStorage";
import { getTotals } from "../../slice/basketSlice";
import { getShipmentAddress, getCustomer } from "../../slice/shipmentSlice";

import { addOrder } from "../../slice/placeOrderSlice";

function Placeorder() {
  let [groupProductData, setGroupedProductData] = useState();
  const { userData, shippingAddressData, shippingCharges, shipmentMethodData } =
    useSelector((state) => state.shipments);
  const [shippementData, setShippementData] = useState();
  const [shippementCharges, setShippementCharges] = useState();
  const classes = useStyles();
  // const router = useRouter();
  const dispatch = useDispatch();

  const [openBar, setOpenBar] = React.useState(false);
  // const [loginSccess, setLginSccess] = React.useState(false);
  const router = useRouter();

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBar(false);
  };

  const {
    cart: { cartItems },
  } = useSelector((state) => state.basket);

 useEffect(()=>{
   
 },[shippingCharges])

  useEffect(() => {
    //dispatch(getCartItems())

    // dispatch(getCartItems())
    var groupedCategory = groupArrayOfObjects(cartItems);
    setGroupedProductData(groupedCategory);
  }, [cartItems]);

  function groupArrayOfObjects(list) {
    const grouped = _.groupBy(list, (items) => items.merchant_id);
    return grouped;
  }

  useEffect(() => {
    setShippementCharges(shippingCharges.charges);
  }, []);

  useEffect(() => {
    dispatch(getTotals());
  }, []);
  useEffect(() => {
    let result1 = shippingAddressData.filter((result) =>
      result.address_id == router.query.addressId ? result : ""
    );

    setShippementData(result1[0]);

    dispatch(getCustomer());
  }, [router, shippementData, shippingAddressData]);

  useEffect(() => {
    dispatch(getShipmentAddress());
  }, []);

  console.log(cartItems);

  

  const placeOrderHandler=(shippementData,userData)=>{
    
    // let newCartItems=cartItems.map(result=>{
    //     let newObj={
    //         merchantId:result.merchant_id,
    //         price:result.price,
    //         quantity:result.quantity
    //     }
    //     return newObj
    // })
    

//    let obj={
//     "isBuyNow": true,
//     "orderAmount": 3.0,
//     "cartItems": [
//         {
//             "discount": 0,
//             "merchantId": 215,
//             "origPrice": 3.0,
//             "price": 3,
//             "quantity": 1,
//             "sku": "SKU_1582873943422"
//         }
//     ],
//     "coupons": [],
//     "orderDiscount": 0.0,
//     "discounts": [],
//     "paymentInfo": {
//         "paymentAmount": 3,
//         "paymentCurreny": "PKR"
//     },
//     "rewards": [],
//     "shippingInfo": {
//         "contactInfo": {
//             "address": "johar",
//             "cityId": 11,
//             "cityName": "Lahore",
//             "countryId": 1,
//             "countryName": "Pakistan",
//             "email": "mailto:umar.ismail@smartfusion.co",
//             "firstName": "um",
//             "lastName": "is",
//             "mobileNumber": "03215890184",
//             "stateId": 3,
//             "stateName": "Punjab"
//         },
//         "origShippingCharges": 45,
//         "shipment_method_type": "address",
//         "shippingCharges": 45,
//         "shippingDiscount": 0,
//         "shippingMethodId": 3
//     },
//     "origOrderAmount": 3.0
// }


let newCartItems=cartItems.map(result=>{
      let obj={};
       obj.discount=0;
       obj.merchantId=result.merchant_id
       obj.origPrice=result.price
       obj.price=result.price  
       obj.quantity=result.qty
       obj.sku=result.sku
       return obj
})


    let obj={
      "isBuyNow": false,
      "orderAmount":cartItems.reduce((a, c) => a + c.qty * c.price, 0),
      "cartItems": newCartItems,
      "coupons": [],
      "orderDiscount": 0.0,
      "discounts": [],
      "paymentInfo": {
        "paymentAmount": cartItems.reduce((a, c) => a + c.qty * c.price, 0),
        "paymentCurreny": "PKR"
      },
      rewards: [],
      shippingInfo: {
        contactInfo: {
          address: shippementData.address,
          cityId: shippementData.city_id,
          cityName: shippementData.city,
          countryId: shippementData.country_id,
          countryName: shippementData.country,
          email: "",
          firstName: userData.first_name,
          lastName: userData.last_name,
          mobileNumber: "",
          stateId: shippementData.state_id,
          stateName: shippementData.state,
        },
        origShippingCharges: shippementCharges,
        shippingCharges: shippementCharges,
        shippingDiscount: 0,
        shippingMethodId: router.query.shipId,
        shipment_method_type: "address",
      },
      "origOrderAmount": cartItems.reduce((a, c) => a + c.qty * c.price, 0)
    }
    
    setOpenBar(true);
    dispatch(addOrder(obj))
    router.push('/payment')
  }

   
  return (
    <>
      <PlaceOrder1
        // shippingAddress={shippingAddress}
        // shippingPrice={shippingPrice}
        // taxPrice={taxPrice}
        // totalPrice={totalPrice}
        placeOrderHandler={placeOrderHandler}
        // loading={loading}
        classes={classes}
        //paymentMethod={paymentMethod}
        cartItems={cartItems}
        userData={userData}
        productPrice={cartItems}
        productCartData={groupProductData}
        shippementData={shippementData}
        shippingCharges={shippementCharges}
        shippmentName={router.query.shipName}
        handleCloseBar={handleCloseBar}
        openBar={openBar}
      ></PlaceOrder1>
    </>
  );
}

export default withRouter(Placeorder);
