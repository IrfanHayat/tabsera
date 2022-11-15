import React, { useEffect, useState } from "react";
import ShippingInformation from "../../container/ShippingInformation";
import { useRouter, withRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import ShippingMethods from "../../pages/shipping_methods";
import LockerShippingMethods from "../../pages/Locker_Shipping_Methods";
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

const Index = ({ setLockerShippingMethod, setAddressShippingMethod, setShowShippingMethod }) => {
  let router = useRouter();

  const {
    lockersAddressData,
    lockerLabels,
    lockerCountryData,
    lockerStatesData,
    lockerCityData,
  } = useSelector((state) => state.lockers);
  const { shippingAddressData, userData } = useSelector(
    (state) => state.shipments
  );

  let [shippingAddres, setShippingAddess] = useState();
  let [shippingLockerAddres, setShippingLockerAddess] = useState();
  let [shipLocker, setShipLocker] = useState()
  let [boolShipAddress, setBoolShipAddress] = useState(false)
  let [boolLockerShipAddress, setBoolLockerShipAddress] = useState(false)
  const [buttonKey, setButtonKey] = React.useState(1);
  let dispatch = useDispatch();



  useEffect(() => {
    dispatch(getLockerCountry());
    // dispatch(getLockers());
  }, []);
  const checkoutHandler = () => {
    dispatch(getCountry());
  };
  const checkoutHandler1 = () => {
    dispatch(getCountry());
    router.push("/shipping");
  };

  const handleChange = (event, value) => {


    let result = shippingAddressData.filter((result) =>
      result.address_id == value ? result : ""
    )[0];
    setBoolShipAddress(true)
    setBoolLockerShipAddress(false)
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
    setShowShippingMethod(true)
    router.push({
      pathname: "/shipping_details",
      query: { addressId: result.address_id },
    });
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

  }, [lockerCountryData]);

  const submitHandler = async (value) => {
    let obj = {
      cityId: value.city.city_id,
      countryId: value.country.country_id,
      stateId: value.states.state_id,
    };

    let shippementLocker = await dispatch(addShipmentLockers(obj))
    setShipLocker(shippementLocker.payload)
  };

  const getStates = (value) => {
    dispatch(getLockerState(value.country_id));
  };

  const getCities = (value) => {
    dispatch(getLockerCity(value.state_id));

  };
  const handleChangeLocker = (event, value) => {
    setBoolLockerShipAddress(true)
    setBoolShipAddress(false)
    let result = lockersAddressData.filter((result) =>
      result.locker_id == value ? result : ""
    )[0];

    setShippingLockerAddess(result);
    let obj = {
      address: result.locker_address,
      bundle_id: null,
      cart_id: 611,
      city_id: result.city_id,
      country_id: result.country_id,
      shipment_method_type: "locker",
      sku_id: null,
      state_id: result.state_id,
    };

    dispatch(getShipmentsMethods(obj));
    router.push({
      pathname: "/shipping_details",
      query: { lockerId: result.locker_id },
    });
  };
  const checkoutHandlerLocker = (event) => {
    router.push({
      pathname: "/shipping_details",
      query: { lockerId: shippingLockerAddres.locker_id },
    });
  };
  return (
    <div>
      <ShippingInformation
        // show={show}
        userData={userData}
        // setShow={setShow}
        handleChange={handleChange}
        setLockerShippingMethod={setLockerShippingMethod}
        shippementAddress={shippingAddressData}
        checkoutHandler={checkoutHandler}
        checkoutHandler1={checkoutHandler1}
        setAddressShippingMethod={setAddressShippingMethod}
        lockerCountryData={lockerCountryData}
        lockerStatesData={lockerStatesData}
        lockerCityData={lockerCityData}
        getStates={getStates}
        getCities={getCities}
        submitHandler={submitHandler}
        setShowShippingMethod={setShowShippingMethod}
        lockersAddressData={lockersAddressData}
        checkoutHandlerLocker={checkoutHandlerLocker}
        handleChangeLocker={handleChangeLocker}
        shipLocker={shipLocker}
        setButtonKey={setButtonKey}
        buttonKey={buttonKey}
      />
      {boolShipAddress == true && buttonKey == 1 ? <ShippingMethods /> : <></>}
      {boolLockerShipAddress == true && buttonKey == 2 ? <LockerShippingMethods /> : <></>}
    </div>
  );
};

export default Index;
