
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/system";

const PreviewIframe = styled("iframe")(() => ({
  border: "1 px solid black",
  height: "100%",
  width: "100%",
}));

function index() {
  const { paymentAddData } = useSelector(state => state.payment);
  let [data, setData] = useState();

  useEffect(()=>{
        console.log("payment",paymentAddData)
        if(paymentAddData){
            document.getElementById("submit").click();
        }
  },[paymentAddData])

  return <div dangerouslySetInnerHTML={{ __html: paymentAddData }} />;
}

export default index;
