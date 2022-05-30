import React, { useState, useEffect } from "react";
import Payement from "../../component/Payement";
// import { useSelector, useDispatch } from "react-redux";
// import {
//   addToBasket,
//   clearBasket,
//   decreaseBasket,
//   getTotals,
//   removeFromBasket,
// } from "../../slice/basketSlice";

import { useRouter, withRouter } from "next/router";

function payement() {
//   const cartItems = useSelector(state => state.basket.cartItems);
//   let router = useRouter();
//   let dispatch = useDispatch();

//   console.log("product");
//   console.log(cartItems);
//   console.log("-----------");
  
//   const handleAddToCart=(item)=>{
//       dispatch(addToBasket(item))
//   }
//   const removeItemHandler = item => {
//     dispatch(removeFromBasket(item));
//   };

//   const handleClearCart = () => {
//     dispatch(clearBasket());
//   };

//   const handleDecreaseCart = product => {
//     dispatch(decreaseBasket(product));
//   };

  return (
    <Payement
    //   productCartData={cartItems}
    //   handleAddToCart={handleAddToCart}
    //   handleDecreaseCart={handleDecreaseCart}
    //   handleClearCart={handleClearCart}
    //   removeItemHandler={removeItemHandler}
    ></Payement>
  );
}

export default withRouter(payement);
