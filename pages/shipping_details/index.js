import React, { useState, useEffect } from "react";
import ShippingInformation from "../../pages/shipping_information";
import ShippingMethods from "../../pages/shipping_methods";
import CheckoutWizard from "../../container/CheckoutWizard";
import localStorage from "localStorage";

function Index() {
  const [show, setShow] = useState(false);
  console.log(show);
  localStorage.setItem("showAddress", "false");

  useEffect(() => {}, [show]);
  return (
    <>
      <CheckoutWizard activeStep={1} />
      <ShippingInformation show={show} setShow={setShow} />
      <ShippingMethods />
    </>
  );
}

export default Index;
