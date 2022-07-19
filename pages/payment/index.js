import React, { useState, useEffect } from "react";
import Payment from "../../container/Payment";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, withRouter } from "next/router";
import { getPayment,postPayment } from "../../slice/paymentSlice";
import { ConstructionOutlined } from "@mui/icons-material";
import {getTotals} from '../../slice/basketSlice'
import PaymentModal from "../../container/PaymentModal//PaymantModal";

function payement() {

  const { paymentData,paymentAddData } = useSelector((state) => state.payment);
  const  { placeOrderData} = useSelector((state) => state.placeorder);
  const {cartTotalAmount} =useSelector((state)=>state.basket.cart)
  const [showModal,setShowModal]=useState(false)
  const [open, setOpen] = React.useState(false);
 let [accountDetails,setAccountDetails]=useState()

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
       
       if(selectPaymentMethod?.payment_mode=="HPP" ){
        let obj={
          "requestBody": {
              //"accountNumber": "923450600666",
              "amount": cartTotalAmount.toString(),
             // "pin":'123456',
              "orderId": placeOrderData?.orderId,
              "parentPaymentMethodId": selectPaymentMethod?.parent_payment_method_id,
              "paymentGatewayId": selectPaymentMethod?.payment_gateway_id,
              "paymentMethodId": selectPaymentMethod?.payment_method_id,
              "serviceTypeId": 6,
              "transactionTypeId": 8
          }
        }
           dispatch(postPayment(obj))
           router.push("/paymentIframe");   
       }


       if(selectPaymentMethod?.payment_mode=="API"){
        console.log(accountDetails)
        let obj={
          "requestBody": {
              "accountNumber": accountDetails.accountNumber, //"923450600666",
              "amount": cartTotalAmount.toString(),
              "pin":accountDetails.pin,//'123456',
              "orderId": placeOrderData?.orderId,
              "parentPaymentMethodId": selectPaymentMethod?.parent_payment_method_id,
              "paymentGatewayId": selectPaymentMethod?.payment_gateway_id,
              "paymentMethodId": selectPaymentMethod?.payment_method_id,
              "serviceTypeId": 6,
              "transactionTypeId": 8
          }
        }
           dispatch(postPayment(obj))
          // router.push("/paymentIframe");   
       }
       
       if(selectPaymentMethod?.payment_mode==null){
        console.log(accountDetails)
        let obj={
          "requestBody": {
          //  "accountNumber": accountDetails.accountNumber, //"923450600666",
            "amount": cartTotalAmount.toString(),
          //  "pin":accountDetails.pin,//'123456',
            "orderId": placeOrderData?.orderId,
            "parentPaymentMethodId": selectPaymentMethod?.parent_payment_method_id,
            "paymentGatewayId": selectPaymentMethod?.payment_gateway_id,
            "paymentMethodId": selectPaymentMethod?.payment_method_id,
            "serviceTypeId": 6,
            "transactionTypeId": 8
        }
          
        }
           dispatch(postPayment(obj))
          // router.push("/paymentIframe");   
       }
        

      
      
      
      // dispatch(savePayment(paymentMethod));

      // localStorage.getItem("paymentMethod", paymentMethod);
      // router.push("/paymentIframe");
  };

  const handleChange=(result)=>{
    setSelectPaymentMethod(result)
     console.log(result.payment_method_id)
     if(result?.payment_mode=="API"){
      setShowModal(true)
      setOpen(true)
     }

     
  }

 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 

  const confirmPayment=(value)=>{
    setAccountDetails(value)
  }


  return (
    <>
     {
      console.log(showModal)
     }
    { 
    
    showModal? <PaymentModal confirmPayment={confirmPayment} handleClickOpen={handleClickOpen} handleClose={handleClose} open={open}/>:''
    }
    <Payment
      paymentMethod={paymentData}
      submitHandler={submitHandler}
      setPaymentMethod={setPaymentMethod}
      handleChange={handleChange}
      cartTotalAmount={cartTotalAmount}
    ></Payment>
    {
      
    }
    </>
  );
}

export default withRouter(payement);
