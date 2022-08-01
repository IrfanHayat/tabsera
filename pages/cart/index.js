import React, {
  useRef,
  useCallback,
  useMemo,
  useState,
  useEffect,
} from "react";
// import ShoppingCart from "../../component/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import CheckoutWizard from "../../container/CheckoutWizard";
import {
  addToBasket,
  clearBasket,
  decreaseBasket,
  getTotals,
  removeFromBasket,
  getTotalCartQuantity,
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

function Cart() {
  const { cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.basket
  );
  const { cartItems } = useSelector((state) => state.basket.cart);

  let [groupProductData, setGroupedProductData] = useState();
  let router = useRouter();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  useEffect(() => {
    var groupedCategory = groupArrayOfObjects(cartItems);
    setGroupedProductData(groupedCategory);
  }, [JSON.stringify(cartItems)]);

  function groupArrayOfObjects(list) {
    const grouped = _.groupBy(list, (items) => items.merchant_id);
    return grouped;
  }

  const handleAddToCart = async (item) => {
    dispatch(addToBasket(item));

    setTimeout(() => {
      dispatch(getTotalCartQuantity());
    }, 1000);
  };
  const removeItemHandler = (item) => {
    dispatch(removeFromBasket(item));
    setTimeout(() => {
      dispatch(getTotalCartQuantity());
    }, 1000);
  };

  const handleClearCart = () => {
    dispatch(clearBasket());
    setTimeout(() => {
      dispatch(getTotalCartQuantity());
    }, 1000);
  };

  const handleDecreaseCart = (product) => {
    dispatch(decreaseBasket(product));
    setTimeout(() => {
      dispatch(getTotalCartQuantity());
    }, 1000);
  };

  const checkoutHandler = () => {
    router.push("/shipping_information");
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
      <CheckoutWizard activeStep={0} />
      {cartItems && groupProductData
        ? Object.keys(groupProductData).map((key) => (
          <ShoppingCart
            key={key}
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
        : ""}
      {cartItems ? (
        <CalculateBill
          productPrice={cartItems}
          handleAddToCart={handleAddToCart}
          handleDecreaseCart={handleDecreaseCart}
          handleClearCart={handleClearCart}
          removeItemHandler={removeItemHandler}
          checkoutHandler={checkoutHandler}
        ></CalculateBill>
      ) : (
        ""
      )}
    </>
  );
}

export default withRouter(Cart);
