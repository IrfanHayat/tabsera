import React, { useState, useEffect } from "react";
import Register1 from "../../container/Register";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAdress } from "../../slice/basketSlice";
import localStorage from "localStorage";
import useStyles from "../../utils/styles";

import { useRouter, withRouter } from "next/router";

import { Controller, useForm } from "react-hook-form";

function Register() {
  const { userInfo } = useSelector(state => state.basket);
  let router = useRouter();
  let dispatch = useDispatch();
  const { redirect } = router.query;
  const {
    handleSubmit,
    control,
    getValues,
    register,
    watch,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);



  return (
    <Register1

      classes={classes}
      Controller={Controller}
      control={control}
      handleSubmit={handleSubmit}
      register={register}
      errors={errors}
      redirect={redirect}
      watch={watch}
      getValues={getValues}
    ></Register1>
  );
}

export default withRouter(Register);
