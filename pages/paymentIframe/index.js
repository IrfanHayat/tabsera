import React from 'react'
import { useSelector, useDispatch } from "react-redux";

function index() {
const {paymentAddData} =useSelector(state=>state.payment)

console.log(paymentAddData)
  return (
    <div
    dangerouslySetInnerHTML={{__html: paymentAddData}}
  />

    
    )
}

export default index