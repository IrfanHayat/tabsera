import React, { useState, useEffect } from "react";
import ShoppingCart from "../../component/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import {
  addToBasket,
  clearBasket,
  decreaseBasket,
  getTotals,
  removeFromBasket,
} from "../../slice/basketSlice";
import { useRouter, withRouter } from "next/router";
import VariableWidthGrid from "../../container/ShoppingCart";

function cart() {
  const cartItems = useSelector((state) => state.basket.cart.cartItems);
  let router = useRouter();
  let dispatch = useDispatch();

  console.log("product");
  console.log(cartItems);
  console.log("-----------");

  const handleAddToCart = (item) => {
    dispatch(addToBasket(item));
  };
  const removeItemHandler = (item) => {
    dispatch(removeFromBasket(item));
  };

  const handleClearCart = () => {
    dispatch(clearBasket());
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseBasket(product));
  };

  const checkoutHandler = () => {
    router.push("/shipping");
  };

  return (
    <VariableWidthGrid
      productCartData={cartItems}
      handleAddToCart={handleAddToCart}
      handleDecreaseCart={handleDecreaseCart}
      handleClearCart={handleClearCart}
      removeItemHandler={removeItemHandler}
      checkoutHandler={checkoutHandler}
    />
    // <NewShoppingCart/>
    // <ShoppingCart
    //   productCartData={cartItems}
    //   handleAddToCart={handleAddToCart}
    //   handleDecreaseCart={handleDecreaseCart}
    //   handleClearCart={handleClearCart}
    //   removeItemHandler={removeItemHandler}
    //   checkoutHandler={checkoutHandler}
    // ></ShoppingCart>
  );
}

export default withRouter(cart);
