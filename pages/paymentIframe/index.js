import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Head from "next/head";
import DOMPurify from "dompurify";
function index() {
const {paymentAddData} =useSelector(state=>state.payment)
let [data,setData]=useState()


  return (
   <div dangerouslySetInnerHTML={{ __html: paymentAddData }} />

   //<webview source={{html:'<p>Irfan</p>'}}></webview>
   

//   <iframe scrolling="no"  target="_blank" style={{height:"100vh",width:"100%",border:"none",overflow:"hidden"}} sandbox='allow-forms
//   allow-pointer-lock
//   allow-popups
//   allow-same-origin
//   allow-scripts
//   allow-top-navigation' allow="payment" referrerPolicy='no-referrer' srcDoc={paymentAddData} />
    
 

    
    )
}

export default index