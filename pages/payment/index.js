import React, { useState, useEffect } from "react";
import Payment1 from "../../container/Payment";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, withRouter } from "next/router";
import { getPayment, postPayment } from "../../slice/paymentSlice";
import { ConstructionOutlined } from "@mui/icons-material";
import { getTotals } from "../../slice/basketSlice";
import PaymentModal from "../../container/PaymentModal//PaymantModal";

<<<<<<< HEAD
function Payement() {

  const { paymentData,paymentAddData,statusCode } = useSelector((state) => state.payment);
  const  { placeOrderData} = useSelector((state) => state.placeorder);
  const {cartTotalAmount} =useSelector((state)=>state.basket.cart)
  const [showModal,setShowModal]=useState(false)
  const [open, setOpen] = useState(false);
 const [status,setStatus]=useState()

 let [accountDetails,setAccountDetails]=useState()

  let router = useRouter();
  let dispatch = useDispatch();
  const [openBar, setOpenBar] = React.useState(false);
  
  
=======
function payement() {
  const { paymentData, paymentAddData } = useSelector((state) => state.payment);
  const { placeOrderData } = useSelector((state) => state.placeorder);
  const { cartTotalAmount } = useSelector((state) => state.basket.cart);
  const [showModal, setShowModal] = useState(false);
  const [open, setOpen] = React.useState(false);
  let [accountDetails, setAccountDetails] = useState();

  let router = useRouter();
  let dispatch = useDispatch();

  console.log("Payment Data = ", paymentData);
>>>>>>> origin/demo-one

  const [paymentMethod, setPaymentMethod] = useState("");

  const [selectPaymentMethod, setSelectPaymentMethod] = useState();
  // useEffect(() => {
  //   if (!shippingAddress.address) {
  //     router.push("/shipping");
  //   } else {
  //     setPaymentMethod(localStorage.getItem("paymentMethod") || "");
  //   }
  // }, []);
<<<<<<< HEAD
  
=======
  console.log(cartTotalAmount);
>>>>>>> origin/demo-one

  const [openBar, setOpenBar] = React.useState(false);

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBar(false);
  };
  useEffect(() => {
    dispatch(getTotals());
  }, []);
  useEffect(() => {
    dispatch(getPayment());
  }, []);

  const submitHandler =async  (total) => {
    //  closeSnackbar();
       
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
         let result=await  dispatch(postPayment(obj))
           console.log(result.payload.resultCode)
           if(result.payload.resultCode==5000){
            setStatus(result.payload)
            setOpenBar(true);
           }else{
           router.push("/paymentIframe");
           }
              
       }


       if(selectPaymentMethod?.payment_mode=="API"){
      
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
          let result1=await dispatch(postPayment(obj))
          if(result1.payload.resultCode==5000){
            setStatus(result1.payload)
            setOpenBar(true);
           }else{
            setStatus(result1.payload)
            setOpenBar(true);
           }
          // router.push("/paymentIframe");   
       }
       
       if(selectPaymentMethod?.payment_mode==null){
      
        let obj={
          "requestBody": {
          //  "accountNumber": accountDetails.accountNumber, //"923450600666",
          amount: cartTotalAmount.toString(),
          //  "pin":accountDetails.pin,//'123456',
          orderId: placeOrderData?.orderId,
          parentPaymentMethodId: selectPaymentMethod?.parent_payment_method_id,
          paymentGatewayId: selectPaymentMethod?.payment_gateway_id,
          paymentMethodId: selectPaymentMethod?.payment_method_id,
          serviceTypeId: 6,
          transactionTypeId: 8,
        },
      };
      dispatch(postPayment(obj));
      setOpenBar(true);
      // router.push("/paymentIframe");
    }

<<<<<<< HEAD
  const handleChange=(result)=>{
    setSelectPaymentMethod(result)
    
     if(result?.payment_mode=="API"){
      setShowModal(true)
      setOpen(true)
     }
=======
    // dispatch(savePayment(paymentMethod));
>>>>>>> origin/demo-one

    // localStorage.getItem("paymentMethod", paymentMethod);
    // router.push("/paymentIframe");
  };

  const handleChange = (result) => {
    setSelectPaymentMethod(result);
    console.log(result.payment_method_id);
    if (result?.payment_mode == "API") {
      setShowModal(true);
      setOpen(true);
    }
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const confirmPayment = (value) => {
    setAccountDetails(value);
  };

  return (
    <>
<<<<<<< HEAD
    
    { 
    
    showModal? <PaymentModal confirmPayment={confirmPayment} handleClickOpen={handleClickOpen} handleClose={handleClose} open={open}/>:''
    }
    <Payment1
      paymentMethod={paymentData}
      submitHandler={submitHandler}
      setPaymentMethod={setPaymentMethod}
      handleChange={handleChange}
      cartTotalAmount={cartTotalAmount}
      status={status}
      handleCloseBar={handleCloseBar}
      openBar={openBar}
    ></Payment1>
    {
      
    }
=======
      {console.log(showModal)}
      {showModal ? (
        <PaymentModal
          confirmPayment={confirmPayment}
          handleClickOpen={handleClickOpen}
          handleClose={handleClose}
          open={open}
        />
      ) : (
        ""
      )}
      <Payment
        paymentMethod={paymentData}
        submitHandler={submitHandler}
        setPaymentMethod={setPaymentMethod}
        handleChange={handleChange}
        cartTotalAmount={cartTotalAmount}
        handleCloseBar={handleCloseBar}
        openBar={openBar}
      ></Payment>
      {}
>>>>>>> origin/demo-one
    </>
  );
}

export default withRouter(Payement);
