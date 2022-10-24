import React from "react";
import Congratulations from "../../container/Congratulations";
import { useRouter, withRouter } from "next/router";
const Index = () => {
  let router = useRouter();
  return (
    <div>
      {router.query?.shippingCode ? <>
        <Congratulations orderNo={router.query?.orderNo} amount={router.query?.amount} shipCharges={router.query?.shipcharges} shipCode={router?.query?.shippingCode} shipParcel={router?.query?.shippingParcel} />
      </> : <>
        <Congratulations orderNo={router.query?.orderNo} amount={router.query?.amount} shipCharges={router.query?.shipcharges} />
      </>}

    </div>
  );
};

export default Index;
