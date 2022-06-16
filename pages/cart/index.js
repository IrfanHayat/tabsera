import React, {useCallback, useMemo,useState, useEffect } from "react";
// import ShoppingCart from "../../component/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import {
  addToBasket,
  clearBasket,
  decreaseBasket,
  getTotals,
  removeFromBasket,
  getCartItems
} from "../../slice/basketSlice";
import { useRouter, withRouter } from "next/router";
// import VariableWidthGrid from "../../container/ShoppingCart";
import VariableWidthGrid from "../../container/NewShoppingCart";
import ShoppingCart from "../../container/ShoppingCart";

function cart() {
  const {cartTotalQuantity,cartTotalAmount} = useSelector((state) => state.basket);
  const {cartItems}=useSelector((state)=>state.basket.cart)
  
  let router = useRouter();
  let dispatch = useDispatch();

  console.log("product");
  console.log(cartItems);
  console.log("-----------");
 useEffect(()=>{
   if(cartItems)
   dispatch(getCartItems())
   
 },[cartItems])
 
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
    // <VariableWidthGrid
    //   productCartData={cartItems}
    //   handleAddToCart={handleAddToCart}
    //   handleDecreaseCart={handleDecreaseCart}
    //   handleClearCart={handleClearCart}
    //   removeItemHandler={removeItemHandler}
    //   checkoutHandler={checkoutHandler}
    //   cartTotalQuantity={cartTotalQuantity}
    //   cartTotalAmount={cartTotalAmount}

    // />
    // <NewShoppingCart/>
    <ShoppingCart
      productCartData={cartItems}
      handleAddToCart={handleAddToCart}
      handleDecreaseCart={handleDecreaseCart}
      handleClearCart={handleClearCart}
      removeItemHandler={removeItemHandler}
      checkoutHandler={checkoutHandler}
    ></ShoppingCart>
  );
}

export default withRouter(cart);
