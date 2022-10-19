import React from "react";
import Congratulations from "../../container/Congratulations";
import { useRouter, withRouter } from "next/router";
const Index = () => {
  let router = useRouter();
  return (
    <div>
      <Congratulations orderNo={router.query?.orderNo} amount={router.query?.amount} shipCharges={router.query?.shipcharges} />
    </div>
  );
};

export default Index;
