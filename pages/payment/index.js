import React, { useState, useEffect } from "react";
import Payment from "../../container/Payment";
import { useSelector, useDispatch } from "react-redux";
import localStorage from "localStorage";
import { savePayment } from "../../slice/basketSlice";

import { useRouter, withRouter } from "next/router";

function payement() {
  const {
    cart: { shippingAddress },
  } = useSelector(state => state.basket);
  let router = useRouter();
  let dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push("/shipping");
    } else {
      setPaymentMethod(localStorage.getItem("paymentMethod") || "");
    }
  }, []);

  const submitHandler = e => {
    //  closeSnackbar();
    e.preventDefault();
    if (!paymentMethod) {
     
      //  enqueueSnackbar('Payment method is required', { variant: 'error' });
    } else {
      dispatch(savePayment(paymentMethod));

      localStorage.getItem("paymentMethod", paymentMethod);
      router.push("/placeorder");
    }
  };
  return (
    <Payment
      paymentMethod={paymentMethod}
      submitHandler={submitHandler}
      setPaymentMethod={setPaymentMethod}
    ></Payment>
  );
}

export default withRouter(payement);
