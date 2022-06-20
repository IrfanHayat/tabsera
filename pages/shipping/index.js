import React, { useState, useEffect } from "react";
import Shipping from "../../container/Shipping";
import { useSelector, useDispatch } from "react-redux";
import {
  addShipmentAddress,
  getLabels,
  getCountry,
  getCity,
  getState
} from "../../slice/shipmentSlice";
import localStorage from "localStorage";
import useStyles from '../../utils/styles'

import { useRouter, withRouter } from "next/router";

import { Controller, useForm } from 'react-hook-form';


function shipping() {
    const  {userInfo,cart: { shippingAddress }}  = useSelector(state => state.basket);
    
    const {labels,countryData,states,cityData}=useSelector(state=>state.shipments)

    console.log(labels)
    let router = useRouter();
  
    let dispatch = useDispatch();
    const {
        handleSubmit,
        control,
        formState: { errors },
        setValue,
        getValues,
      } = useForm();

    const { location } = shippingAddress;
    useEffect(() => {
       dispatch(getLabels())
       dispatch(getCountry())
       
          setValue('fullName', shippingAddress.fullName);
          setValue('address', shippingAddress.address);
          setValue('city', shippingAddress.city);
          setValue('postalCode', shippingAddress.postalCode);
          setValue('country', shippingAddress.country);
        }, []);
        const classes = useStyles();
        
        
        const submitHandler = (value) => {
            console.log(value) 
             dispatch(addShipmentAddress(value))
           //  localStorage.setItem("shippingAddress", JSON.stringify(value));
             router.push('/payment');
        };

        const getStates = (event, value) => {
          console.log(value.country_id)
          dispatch(getState(value.country_id))
          
        };
      
        const getCities = (event,value)=>{
              console.log(value.state_id)
              dispatch(getCity(value.state_id))
        }

        const chooseLocationHandler = () => {
          const fullName = getValues('fullName');
          const address = getValues('address');
          const city = getValues('city');
          const postalCode = getValues('postalCode');
          const country = getValues('country');

          dispatch(saveShippingAdress({ fullName, address, city, postalCode, country, location }))
          localStorage.setItem("shippingAddress", {
            fullName,
            address,
            city,
            postalCode,
            country,
            location,
          });
          // router.push('/map');
        };

  return (
    <Shipping
      submitHandler={submitHandler}
      chooseLocationHandler={chooseLocationHandler}
      classes={classes}
      Controller={Controller}
      control={control}
      handleSubmit={handleSubmit}
      labels={labels}
      errors={errors}
      countryData={countryData}
      getStates={getStates}
      states={states} 
      getCities={getCities}  
      cityData={cityData}
      
    ></Shipping>
  );
}

export default withRouter(shipping);
