import React, { useState } from "react";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function ProductDetailSub() {
  console.log(productDetail);
  return <></>;
}

export default ProductDetailSub;
