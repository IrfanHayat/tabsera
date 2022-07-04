import React, { useState, useEffect } from "react";
import Payment from "../../container/Payment";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, withRouter } from "next/router";
import { getPayment,postPayment } from "../../slice/paymentSlice";
import { ConstructionOutlined } from "@mui/icons-material";
import {getTotals} from '../../slice/basketSlice'

function payement() {

  const { paymentData,paymentAddData } = useSelector((state) => state.payment);
  const  { placeOrderData} = useSelector((state) => state.placeorder);
  const {cartTotalAmount} =useSelector((state)=>state.basket.cart)

  let router = useRouter();
  let dispatch = useDispatch();

  
  console.log("Payment Data = ", paymentData);

  const [paymentMethod, setPaymentMethod] = useState("");

  const [selectPaymentMethod,setSelectPaymentMethod]=useState()
  // useEffect(() => {
  //   if (!shippingAddress.address) {
  //     router.push("/shipping");
  //   } else {
  //     setPaymentMethod(localStorage.getItem("paymentMethod") || "");
  //   }
  // }, []);
  console.log(cartTotalAmount)
  useEffect(() => {
    dispatch(getTotals());
  }, []);
  useEffect(()=>{
        dispatch(getPayment())
  },[])

  const submitHandler = (total) => {
    //  closeSnackbar();
       console.log(placeOrderData)    
       console.log(selectPaymentMethod)
       console.log(total)
       
   
      let obj={
        "requestBody": {
            "accountNumber": "",
            "amount": cartTotalAmount,
            "orderId": placeOrderData?.orderId,
            "parentPaymentMethodId": selectPaymentMethod?.parent_payment_method_id,
            "paymentGatewayId": selectPaymentMethod?.payment_gateway_id,
            "paymentMethodId": selectPaymentMethod?.payment_method_id,
            "serviceTypeId": 6,
            "transactionTypeId": 8
        }
    }
      dispatch(postPayment(obj))

      // dispatch(savePayment(paymentMethod));

      // localStorage.getItem("paymentMethod", paymentMethod);
      // router.push("/placeorder");
  };

  const handleChange=(result)=>{
    setSelectPaymentMethod(result)
     console.log(result.payment_method_id)
  }


 


  return (
    <Payment
      paymentMethod={paymentData}
      submitHandler={submitHandler}
      setPaymentMethod={setPaymentMethod}
      handleChange={handleChange}
      cartTotalAmount={cartTotalAmount}
    ></Payment>
  );
}

export default withRouter(payement);
