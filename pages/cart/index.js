import React, {useRef,useCallback, useMemo,useState, useEffect } from "react";
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
import _ from 'lodash'


function cart() {
  const {cartTotalQuantity,cartTotalAmount} = useSelector((state) => state.basket);
  const {cartItems}=useSelector((state)=>state.basket.cart)
  let [groupProductData,setGroupedProductData]=useState()
  let router = useRouter();
  let dispatch = useDispatch();

  console.log("product");
  console.log(cartItems);
  
 // const { current: myArray } = useRef(cartItems);

  

 useEffect(()=>{
  //dispatch(getCartItems())
   
    console.log(cartItems)  
    var groupedCategory = groupArrayOfObjects(cartItems);
    setGroupedProductData(groupedCategory);
   
   
   
 },[cartItems])
 

function groupArrayOfObjects(list){
  const grouped = _.groupBy(list, items => items.merchant_id );
   return grouped
}

console.log(groupProductData)

  

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
    <>
         {
          // console.log("---------"+groupProductData)
           groupProductData &&
           Object.keys(groupProductData).map((key) => (
           <ShoppingCart
           heading={groupProductData[key].map(result=>result.merchant_name)[0]}
           productCartData={groupProductData[key]}
           handleAddToCart={handleAddToCart}
           handleDecreaseCart={handleDecreaseCart}
           handleClearCart={handleClearCart}
           removeItemHandler={removeItemHandler}
           checkoutHandler={checkoutHandler}
         ></ShoppingCart>  
           ))
    }
    </>
    
    
  );
}

export default withRouter(cart);
