import React from "react";
import ShippingInformation from "../../container/ShippingInformation";
import { useRouter, withRouter } from "next/router";

const index = () => {
  let router = useRouter();

  const checkoutHandler = () => {
    router.push("/shipping");
  };
  return (
    <div>
      <ShippingInformation checkoutHandler={checkoutHandler} />
    </div>
  );
};

export default index;
