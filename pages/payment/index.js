import React, { useState, useEffect } from "react";
import Payment from "../../container/Payment";
import { useSelector, useDispatch } from "react-redux";
import localStorage from "localStorage";
import { savePayment } from "../../slice/basketSlice";
//import {getPayment} from '../../slice/paymentSlice'
import { useRouter, withRouter } from "next/router";
import { getPayment } from "../../slice/paymentSlice";

function payement() {
  const {
    cart: { shippingAddress },
  } = useSelector((state) => state.basket);
  let router = useRouter();
  let dispatch = useDispatch();

  const { paymentData } = useSelector((state) => state.payment);

  console.log("Payment Data = ", paymentData);

  const [paymentMethod, setPaymentMethod] = useState("");

  // useEffect(() => {
  //   if (!shippingAddress.address) {
  //     router.push("/shipping");
  //   } else {
  //     setPaymentMethod(localStorage.getItem("paymentMethod") || "");
  //   }
  // }, []);
  useEffect(()=>{
        dispatch(getPayment())
  },[])

  const submitHandler = (e) => {
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

  const handleChange=(result)=>{
     console.log(result)
  }


  return (
    <Payment
      paymentMethod={paymentData}
      submitHandler={submitHandler}
      setPaymentMethod={setPaymentMethod}
      handleChange={handleChange}
    ></Payment>
  );
}

export default withRouter(payement);
