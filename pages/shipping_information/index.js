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
import {
  // addShipmentLockers,
  // getLockers,
  getLockerCountry,
  getLockerState,
  getLockerCity,
  addShipmentLockers,
  // getCity,
  // getState,
} from "../../slice/lockerSlice";
import { getTotals } from "../../slice/basketSlice";
import { ContactPageSharp, Login } from "@mui/icons-material";

const Index = () => {
  let router = useRouter();
  const {
    lockersAddressData,
    lockerLabels,
    lockerCountryData,
    lockerStatesData,
    lockerCityData,
  } = useSelector((state) => state.lockers);
  const { shippingAddressData } = useSelector((state) => state.shipments);
  let [shippingAddres, setShippingAddess] = useState();

  let dispatch = useDispatch();

  console.log(lockersAddressData, "lAD");

  useEffect(() => {
    dispatch(getLockerCountry());
    // dispatch(getLockers());
  }, []);
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

  useEffect(() => {
    console.log(lockerCountryData);
  }, [lockerCountryData]);

  const submitHandler = async (value) => {
    console.log(value);
    let obj = {
      cityId: value.city.city_id,
      countryId: value.country.country_id,
      stateId: value.states.state_id,
    };
    console.log(obj);

    dispatch(addShipmentLockers(obj));
  };

  const getStates = (value) => {
    console.log(value.country_id);
    dispatch(getLockerState(value.country_id));
    console.log(lockerStatesData);
  };

  const getCities = (value) => {
    dispatch(getLockerCity(value.state_id));
    console.log(lockerCityData);
  };
  const handleChangeLocker = (value) => {
    console.log(value);
  };
  const checkoutHandlerLocker = (value) => {
    console.log(value);
  };
  return (
    <div>
      <ShippingInformation
        handleChange={handleChange}
        shippementAddress={shippingAddressData}
        checkoutHandler={checkoutHandler}
        checkoutHandler1={checkoutHandler1}
        lockerCountryData={lockerCountryData}
        lockerStatesData={lockerStatesData}
        lockerCityData={lockerCityData}
        getStates={getStates}
        getCities={getCities}
        submitHandler={submitHandler}
        lockersAddressData={lockersAddressData}
        checkoutHandlerLocker={checkoutHandlerLocker}
        handleChangeLocker={handleChangeLocker}
      />
    </div>
  );
};

export default Index;
