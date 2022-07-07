import React, { useEffect,useState } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/system";

const PreviewIframe = styled("iframe")(() => ({
  border: "1 px solid black",
  height: "100%",
  width: "100%",
}));

function index() {
    const {paymentAddData} =useSelector(state=>state.payment)
    let [data,setData]=useState()    
   

  
  return (
  <>
  <PreviewIframe srcdoc={paymentAddData} /> 
  {/* <div dangerouslySetInnerHTML={{ __html: paymentAddData }} />
  <webview source={{html:'<p>Irfan</p>'}}></webview>
   
//    <iframe scrolling="no"  target="_blank" style={{height:"100vh",width:"100%",border:"none",overflow:"hidden"}} sandbox='allow-forms */}
     {/* allow-pointer-lock */}
   {/* allow-popups */}
      {/* allow-same-origin */}
      {/* allow-scripts */}
      {/* allow-top-navigation' allow="payment" referrerPolicy='no-referrer' srcDoc={paymentAddData} /> */}
  </>
  );
}

export default index;
