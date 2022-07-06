import React from "react";
import { styled } from "@mui/system";

const PreviewIframe = styled("iframe")(() => ({
  border: "1 px solid black",
  height: "100%",
  width: "100%",
}));

function index() {
  return <PreviewIframe srcdoc="<p>Hello world!</p>" />;
}

export default index;
