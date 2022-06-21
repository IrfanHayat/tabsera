import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
// import ShoppingCart from "../../component/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import {
  addToBasket,
  clearBasket,
  decreaseBasket,
  getTotals,
  removeFromBasket,
  getCartItems,
  addToCart,
} from "../../slice/basketSlice";
import { useRouter, withRouter } from "next/router";
// import VariableWidthGrid from "../../container/ShoppingCart";
import VariableWidthGrid from "../../container/NewShoppingCart";
import ShoppingCart from "../../container/ShoppingCart";
import CalculateBill from "../../container/CalculateBill";
import _ from "lodash";
import { Grid } from "@mui/material";

function cart() {
  const { cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.basket
  );
  const { cartItems } = useSelector((state) => state.basket.cart);
  let [groupProductData, setGroupedProductData] = useState();
  let router = useRouter();
  let dispatch = useDispatch();

  
  // const { current: myArray } = useRef(cartItems);
  useEffect(()=>{
    dispatch(getCartItems())
  },[])

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

  const handleAddToCart = (item) => {
    console.log(item)
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
              heading={
                groupProductData[key].map((result) => result.merchant_name)[0]
              }
              productCartData={groupProductData[key]}
              productPrice={cartItems}
              handleAddToCart={handleAddToCart}
              handleDecreaseCart={handleDecreaseCart}
              handleClearCart={handleClearCart}
              removeItemHandler={removeItemHandler}
              checkoutHandler={checkoutHandler}
            ></ShoppingCart>
          ))
      }
      {
        <CalculateBill
          productPrice={cartItems}
          handleAddToCart={handleAddToCart}
          handleDecreaseCart={handleDecreaseCart}
          handleClearCart={handleClearCart}
          removeItemHandler={removeItemHandler}
          checkoutHandler={checkoutHandler}
        ></CalculateBill>
      }
    </>
  );
}

export default withRouter(cart);
