import React, { useState, useEffect } from "react";
import Register from "../../container/Register";
import { useSelector, useDispatch } from "react-redux";
import { saveShippingAdress } from "../../slice/basketSlice";
import localStorage from "localStorage";
import useStyles from "../../utils/styles";

import { useRouter, withRouter } from "next/router";

import { Controller, useForm } from "react-hook-form";

function register() {
  const { userInfo } = useSelector(state => state.basket);
  let router = useRouter();
  let dispatch = useDispatch();
  const { redirect } = router.query;
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const classes = useStyles();
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, []);

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    //closeSnackbar();
    if (password !== confirmPassword) {
      //enqueueSnackbar("Passwords don't match", { variant: 'error' });
      return;
    }
    try {
      //   const { data } = await axios.post('/api/users/register', {
      //     name,
      //     email,
      //     password,
      //   });

      //   dispatch({ type: 'USER_LOGIN', payload: data });
      //   Cookies.set('userInfo', data);
      router.push(redirect || "/");
    } catch (err) {
      //enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };

  return (
    <Register
      submitHandler={submitHandler}
      classes={classes}
      Controller={Controller}
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      redirect={redirect}
    ></Register>
  );
}

export default withRouter(register);
