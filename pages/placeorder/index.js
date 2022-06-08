import React, { useState, useEffect } from "react";
import PlaceOrder from "../../container/PlaceOrder";
import { useRouter,withRouter } from 'next/router';

import useStyles from "../../utils/styles";

import { clearBasket } from "../../slice/basketSlice";
//import Cookies from 'js-cookie';
import { useSelector, useDispatch } from "react-redux";
import localStorage from "localStorage";

function placeorder() {

  const classes = useStyles();
  const router = useRouter();
  const { dispatch } = useDispatch();
  const {
    cart: { cartItems, shippingAddress, paymentMethod },
  } = useSelector(state => state.basket);
  const round2 = num => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.productCost * c.cartQuantity, 0)
  );
  console.log(itemsPrice)
  const shippingPrice = itemsPrice > 200 ? 10 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, []);
  // const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    // closeSnackbar();
    try {
      setLoading(true);
      //   const { data } = await axios.post(
      //     '/api/orders',
      //     {
      //       orderItems: cartItems,
      //       shippingAddress,
      //       paymentMethod,
      //       itemsPrice,
      //       shippingPrice,
      //       taxPrice,
      //       totalPrice,
      //     },
      //     {
      //       headers: {
      //         authorization: `Bearer ${userInfo.token}`,
      //       },
      //     }
      //   );
      dispatch(clearBasket());
      //Cookies.remove('cartItems');
      localStorage.removeItem("cartItems");
      setLoading(false);
      //  router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      //enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  return (
    <PlaceOrder
      shippingAddress={shippingAddress}
      shippingPrice={shippingPrice}
      taxPrice={taxPrice}
      totalPrice={totalPrice}
      placeOrderHandler={placeOrderHandler}
      loading={loading} 
      classes={classes}
      paymentMethod={paymentMethod}
      cartItems={cartItems}
      itemsPrice={itemsPrice}
    ></PlaceOrder>
  );
}

export default withRouter(placeorder);
