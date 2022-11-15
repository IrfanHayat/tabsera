import React, { useState, useEffect } from "react";
import ShippingInformation from "../../pages/shipping_information";
import ShippingMethods from "../../pages/shipping_methods";
import LockerShippingMethods from "../../pages/Locker_Shipping_Methods";
import CheckoutWizard from "../../container/CheckoutWizard";
import localStorage from "localStorage";

function Index() {
  const [showShippingMethod, setShowShippingMethod] = useState(false);
  const [addressShippingMethod, setAddressShippingMethod] = useState(false);
  const [LockerShippingMethod, setLockerShippingMethod] = useState(false);
  localStorage.setItem("showAddress", "false");

  useEffect(() => { }, [showShippingMethod]);
  return (
    <>

      <CheckoutWizard activeStep={1} />
      <ShippingInformation setLockerShippingMethod={setLockerShippingMethod} setAddressShippingMethod={setAddressShippingMethod} setShowShippingMethod={setShowShippingMethod} />
      {/* {addressShippingMethod == false && showShippingMethod && LockerShippingMethod == false ? <ShippingMethods /> : ''} */}
      {/* {LockerShippingMethod && addressShippingMethod == false && showShippingMethod == false ? <LockerShippingMethods /> : ''} */}
      {/* {addressShippingMethod && showShippingMethod && LockerShippingMethod == false ? <ShippingMethods /> : ''} */}
    </>
  );
}

export default Index;
