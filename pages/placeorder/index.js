import React, { useState, useEffect } from "react";
import PlaceOrder from "../../component/PlaceOrder";
import { useRouter,withRouter } from 'next/router';


function placeorder() {

  return (
    <PlaceOrder
     
    ></PlaceOrder>
  );
}

export default withRouter(placeorder);
