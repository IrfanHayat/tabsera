import React from "react";
import Congratulations from "../../container/Congratulations";
import { useRouter, withRouter } from "next/router";
const Index = () => {
  let router = useRouter();
  return (
    <div>
      <Congratulations orderNo={router.query?.orderNo} />
    </div>
  );
};

export default Index;
