
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { styled } from "@mui/system";
import { sanitize } from 'dompurify';
import { ConstructionOutlined } from "@mui/icons-material";
const PreviewIframe = styled("iframe")(() => ({
  border: "1 px solid black",
  height: "100%",
  width: "100%",
}));

function Index() {
  const { paymentAddData } = useSelector(state => state.payment);
  let [data, setData] = useState();


  useEffect(() => {

    if (paymentAddData) {
      document.getElementById("submit").click();
    }
  }, [paymentAddData])

  return <div dangerouslySetInnerHTML={{ __html: paymentAddData.response }} />;
}

export default Index;
