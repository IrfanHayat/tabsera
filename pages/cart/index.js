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
import Cookies from "js-cookie";
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
import { Grid, CssBaseline, Container } from "@mui/material";
import localStorage from "localStorage";

function Cart() {
  const { cartTotalQuantity, cartTotalAmount } = useSelector(
    (state) => state.basket
  );
  const { cartItems } = useSelector((state) => state.basket.cart);

  console.log(cartItems);
  let [groupProductData, setGroupedProductData] = useState();
  let router = useRouter();
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCartItems());
  }, []);
  useEffect(() => { }, [cartItems]);

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
    router.push("/shipping_details");
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
      <Grid sx={{ ml: 1 }} >
        {localStorage.getItem("login") == "true" ? (
          <CheckoutWizard activeStep={0} />
        ) : (
          ""
        )}
      </Grid>
      <CssBaseline />
      <div>
        <Container fixed>
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} sm={6} md={8} lg={8}>
              <Grid container>
                <Grid item xs>
                  {cartItems && groupProductData
                    ? Object.keys(groupProductData).map((key) => (
                      <ShoppingCart
                        key={key}
                        heading={
                          groupProductData[key].map(
                            (result) => result.merchant_name
                          )[0]
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
                </Grid>
              </Grid>
            </Grid>
            {cartItems ? (
              <Grid item xs={12} sm={6} md={4} lg={4}>
                <CalculateBill
                  productPrice={cartItems}
                  handleAddToCart={handleAddToCart}
                  handleDecreaseCart={handleDecreaseCart}
                  handleClearCart={handleClearCart}
                  removeItemHandler={removeItemHandler}
                  checkoutHandler={checkoutHandler}
                ></CalculateBill>
              </Grid>
            ) : (
              ""
            )}
          </Grid>
        </Container>
      </div>
    </>
  );
}

export default withRouter(Cart);
