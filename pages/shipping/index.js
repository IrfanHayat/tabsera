import React, { useState, useEffect } from "react";
import Shipping from "../../component/Shipping";
import { useSelector, useDispatch } from "react-redux";
import {
    saveShippingAdress
} from "../../slice/basketSlice";
import localStorage from "localStorage";
import useStyles from '../../utils/styles'

import { useRouter, withRouter } from "next/router";

import { Controller, useForm } from 'react-hook-form';


function shipping() {
    const  {userInfo,cart: { shippingAddress }}  = useSelector(state => state.basket);
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
        //   if (!userInfo) {
        //    router.push('/login?redirect=/shipping');
        //   }
          setValue('fullName', shippingAddress.fullName);
          setValue('address', shippingAddress.address);
          setValue('city', shippingAddress.city);
          setValue('postalCode', shippingAddress.postalCode);
          setValue('country', shippingAddress.country);
        }, []);
        const classes = useStyles();
        
        
        const submitHandler = (value) => {
            console.log(value) 
             dispatch(saveShippingAdress(value))
             localStorage.setItem("shippingAddress", JSON.stringify(value));
             router.push('/payment');
        };
      
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
      errors={errors}
    ></Shipping>
  );
}

export default withRouter(shipping);
