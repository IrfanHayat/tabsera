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
import { Grid, Box, Typography, Stack } from "@mui/material";

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
      <Grid container>
        {cartItems && groupProductData ? (
          Object.keys(groupProductData).map((key) => (
            <>
              <Grid item md={12} sx={12}>
                <Typography
                  component="h5"
                  variant="h5"
                  style={{ fontWeight: "bold" }}
                  // align="center"
                >
                  Cart Details
                </Typography>
              </Grid>
              <Grid item md={8} sx={12}>
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
              </Grid>
              <Grid item md={4} sm={12} sx={{ width: "100%" }}>
                <CalculateBill
                  productPrice={cartItems}
                  handleAddToCart={handleAddToCart}
                  handleDecreaseCart={handleDecreaseCart}
                  handleClearCart={handleClearCart}
                  removeItemHandler={removeItemHandler}
                  checkoutHandler={checkoutHandler}
                ></CalculateBill>
              </Grid>
            </>
          ))
        ) : (
          <Box
            direction="column"
            sx={{
              display: "flex",

              width: "100%",
              maxWidth: 500,
              m: "auto",
              //   height: "100vh",
              minHeight: "50vh",
              // bgcolor: "white",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Stack
              direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
            >
              <Box
                variant="h1"
                component="h1"
                sx={{
                  display: "flex",
                  color: "warning.main",
                }}
              >
                Your Cart is Empty...!!
              </Box>

              {/* <Box variant="h5  " component="h5" sx={{ color: "text.primary" }}>
                Your Cart is Empty
              </Box> */}
            </Stack>
          </Box>
        )}
        {/* {cartItems ? (
          <Grid item md={4} sx={{ top: 0 }}>
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
          <Box>Your Cart Is Empty</Box>
        )} */}
      </Grid>
    </>
  );
}

export default withRouter(Cart);
