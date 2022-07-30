import React, { useEffect, useState } from "react";
import ShippingInformation from "../../container/ShippingInformation";
import { useRouter, withRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
  getShipmentAddress,
  getShipmentsMethods,
  getCountry,
  getCustomer,
} from "../../slice/shipmentSlice";
import { getTotals } from "../../slice/basketSlice";

const Index = () => {
  let router = useRouter();

  const { shippingAddressData } = useSelector((state) => state.shipments);
  let [shippingAddres, setShippingAddess] = useState();

  let dispatch = useDispatch();

  const checkoutHandler = () => {
    dispatch(getCountry());
    router.push({
      pathname: "/shipping_methods",
      query: { addressId: shippingAddres.address_id },
    });
  };
  const checkoutHandler1 = () => {
    dispatch(getCountry());
    router.push("/shipping");
  };

  const handleChange = (event, value) => {
    let result = shippingAddressData.filter((result) =>
      result.address_id == value ? result : ""
    )[0];

    setShippingAddess(result);
    let obj = {
      address: result.address,
      bundle_id: null,
      cart_id: 611,
      city_id: result.city_id,
      country_id: result.country_id,
      shipment_method_type: "address",
      sku_id: null,
      state_id: result.state_id,
    };

    dispatch(getShipmentsMethods(obj));
  };
  useEffect(() => {
    dispatch(getCustomer());
  }, []);

  // useEffect(() => {
  //   dispatch(getTotals());
  // }, []);

  useEffect(() => {
    dispatch(getShipmentAddress());
  }, []);

  return (
    <div>
      <ShippingInformation
        handleChange={handleChange}
        shippementAddress={shippingAddressData}
        checkoutHandler={checkoutHandler}
        checkoutHandler1={checkoutHandler1}
      />
    </div>
  );
};

export default Index;
