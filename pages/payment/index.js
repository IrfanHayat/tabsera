import React, { useState, useEffect } from "react";
import Payment1 from "../../container/Payment";
import { useSelector, useDispatch } from "react-redux";
import { useRouter, withRouter } from "next/router";
import { getPayment, postPayment } from "../../slice/paymentSlice";
import { ConstructionOutlined } from "@mui/icons-material";
import { getTotals } from "../../slice/basketSlice";
import PaymentModal from "../../container/PaymentModal//PaymantModal";

function Payement() {

  const { paymentData, paymentAddData, statusCode } = useSelector((state) => state.payment);
  const { placeOrderData } = useSelector((state) => state.placeorder);
  const { cartTotalAmount } = useSelector((state) => state.basket.cart)
  const [showModal, setShowModal] = useState(false)
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState()

  let [accountDetails, setAccountDetails] = useState()

  let router = useRouter();
  let dispatch = useDispatch();




  const [paymentMethod, setPaymentMethod] = useState("");

  const [selectPaymentMethod, setSelectPaymentMethod] = useState();
  // useEffect(() => {
  //   if (!shippingAddress.address) {
  //     router.push("/shipping");
  //   } else {
  //     setPaymentMethod(localStorage.getItem("paymentMethod") || "");
  //   }
  // }, []);


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

  const submitHandler = async (total) => {
    //  closeSnackbar();

    if (selectPaymentMethod?.payment_mode == "HPP") {
      let obj = {
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
      let result = await dispatch(postPayment(obj))
      console.log(result.payload.resultCode)
      if (result.payload.resultCode == 5000) {
        setStatus(result.payload)
        setOpenBar(true);
      } else {
        router.push("/paymentIframe");
      }

    }


    if (selectPaymentMethod?.payment_mode == "API") {

      let obj = {
        "requestBody": {
          "accountNumber": null, //"923450600666",
          "amount": cartTotalAmount.toString(),
          "pin": null,//'123456',
          "orderId": placeOrderData?.orderId,
          "parentPaymentMethodId": selectPaymentMethod?.parent_payment_method_id,
          "paymentGatewayId": selectPaymentMethod?.payment_gateway_id,
          "paymentMethodId": selectPaymentMethod?.payment_method_id,
          "serviceTypeId": 6,
          "transactionTypeId": 8
        }
      }
      let result1 = await dispatch(postPayment(obj))
      if (result1.payload.resultCode == 5000) {
        setStatus(result1.payload)
        setOpenBar(true);


      } else {
        setStatus(result1.payload)
        setOpenBar(true);
        setTimeout(() => {
          router.push('/congratulations')
        }, 1000)
      }
      // router.push("/paymentIframe");   
    }

    if (selectPaymentMethod?.payment_mode == null) {

      let obj = {
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
      let result = await dispatch(postPayment(obj));
      if (result.payload.resultCode == 2000) {

        setTimeout(() => {
          router.push('/congratulations')
        }, 1000)
      }

      // router.push("/paymentIframe");
    }
  }
  const handleChange = (result) => {
    setSelectPaymentMethod(result)
    console.log(result)
    if (result?.payment_mode == "API" && result.payment_method_name != "Tabsera Wallet") {
      setShowModal(true)
      setOpen(true)
    }

    // localStorage.getItem("paymentMethod", paymentMethod);
    // router.push("/paymentIframe");
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

      {

        showModal ? <PaymentModal confirmPayment={confirmPayment} handleClickOpen={handleClickOpen} handleClose={handleClose} open={open} /> : ''
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

    </>
  );
}

export default withRouter(Payement);
