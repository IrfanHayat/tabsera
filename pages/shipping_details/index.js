import React, { useState, useEffect } from "react";
import ShippingInformation from "../../pages/shipping_information";
import ShippingMethods from "../../pages/shipping_methods";
import CheckoutWizard from "../../container/CheckoutWizard";
function Index() {
  const [show, setShow] = useState(false);
  console.log(show);
  //   useEffect(() => {}, [show]);
  return (
    <>
      <CheckoutWizard activeStep={1} />
      <ShippingInformation show={show} setShow={setShow} />
      {/* {show ? */}
      <ShippingMethods />
      {/* : ""} */}
    </>
  );
}

export default Index;
