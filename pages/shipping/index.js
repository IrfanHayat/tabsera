import React, { useState, useEffect } from "react";
import Shipping from "../../container/Shipping";
import EditShipping from "../../container/EditShipping";
import { useSelector, useDispatch } from "react-redux";
import {
  addShipmentAddress,
  updateShipmentAddress,
  getLabels,
  getCountry,
  getCity,
  getState

} from "../../slice/shipmentSlice";
import localStorage from "localStorage";
import useStyles from "../../utils/styles";

import { useRouter, withRouter } from "next/router";

import { Controller, useForm } from "react-hook-form";

function Shipping1({ key, data }) {

  const {
    userInfo,
    cart: { shippingAddress },
  } = useSelector((state) => state.basket);

  const { labels, countryData, states, cityData } = useSelector(
    (state) => state.shipments
  );
  let [labelValue, setLabelValue] = useState("");
  let [countryApiData, setCountryApiData] = useState();
  let router = useRouter();

  let dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  // const { location } = shippingAddress;

  const handleChange = (value) => {
    setLabelValue({ value });
  };
  useEffect(() => {
    dispatch(getLabels());
  }, []);

  useEffect(async () => {
    let country = await dispatch(getCountry());
    setCountryApiData(country.payload)
  }, []);

  const classes = useStyles();

  const submitHandler = async (value) => {
    let obj = {
      addresses: [
        {
          add_type_id: 1,
          address: value.address,
          address_default_billing: true,
          address_id: 0,
          city_id: value.city.city_id,
          country_id: value.country.country_id,
          label_id: labelValue.value,
          state_id: value.states.state_id,
        },
        {
          add_type_id: 2,
          address: value.address,
          address_default_billing: false,
          address_id: 0,
          city_id: value.city.city_id,
          country_id: value.country.country_id,
          label_id: labelValue.value,
          state_id: value.states.state_id,
        },
      ],
    };

    let result = await dispatch(addShipmentAddress(obj));
    if (result.payload) {
      //  localStorage.setItem("shippingAddress", JSON.stringify(value));
      router.push("/shipping_information");
    }
  };

  const editSubmitHandler = async (value) => {
    let obj = {
      addresses: [
        {
          add_type_id: 1,
          address: value.address,
          address_default_billing: true,
          address_id: 0,
          city_id: value.city.city_id,
          country_id: value.country.country_id,
          label_id: labelValue.value,
          state_id: value.states.state_id,
        },
        {
          add_type_id: 2,
          address: value.address,
          address_default_billing: false,
          address_id: 0,
          city_id: value.city.city_id,
          country_id: value.country.country_id,
          label_id: labelValue.value,
          state_id: value.states.state_id,
        },
      ],
    };

    let result = await dispatch(updateShipmentAddress(obj));
    if (result.payload) {
      //  localStorage.setItem("shippingAddress", JSON.stringify(value));
      router.push("/shipping_information");
    }
  };

  const getStates = (value) => {
    dispatch(getState(value.country_id));
  };

  const getCities = (value) => {
    dispatch(getCity(value.state_id));
  };

  // const chooseLocationHandler = () => {
  //   const fullName = getValues('fullName');
  //   const address = getValues('address');
  //   const city = getValues('city');
  //   const postalCode = getValues('postalCode');
  //   const country = getValues('country');

  //   dispatch(saveShippingAdress({ fullName, address, city, postalCode, country, location }))
  //   localStorage.setItem("shippingAddress", {
  //     fullName,
  //     address,
  //     city,
  //     postalCode,
  //     country,
  //     location,
  //   });
  //   // router.push('/map');
  // };

  return (
    <>
      {data == undefined ?
        <Shipping
          key={key}
          submitHandler={submitHandler}
          // chooseLocationHandler={chooseLocationHandler}

          classes={classes}
          Controller={Controller}
          control={control}
          handleSubmit={handleSubmit}
          labels={labels && labels}
          errors={errors}
          countryData={countryApiData && countryApiData}
          getStates={getStates}
          states={states}
          getCities={getCities}
          cityData={cityData}
          handleChange={handleChange}
          labelValue={labelValue}
        ></Shipping> :
        <EditShipping
          key={key}
          editSubmitHandler={editSubmitHandler}
          // chooseLocationHandler={chooseLocationHandler}
          data={data}
          classes={classes}
          Controller={Controller}
          control={control}
          handleSubmit={handleSubmit}
          labels={labels && labels}
          errors={errors}
          countryData={countryData && countryData}
          getStates={getStates}
          states={states}
          getCities={getCities}
          cityData={cityData}
          handleChange={handleChange}
          labelValue={labelValue}
        ></EditShipping>}
    </>
  );
}

export default withRouter(Shipping1);
