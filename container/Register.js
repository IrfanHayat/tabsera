import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
  Card
} from '@mui/material';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import NextLink from 'next/link';
import React, { useState } from 'react';
import SwipeButton from '../container/SwipeButton'
import { checkUser, registerUser } from '../slice/authSlice'
import { useSelector, useDispatch } from "react-redux";
import MuiPhoneNumber from "material-ui-phone-number";
import { Router } from '@mui/icons-material';
import { useRouter } from "next/router";

export default function Register({ watch, getValues, register, handleSubmit, classes, control, Controller, errors, redirect }) {

  let [mobileNumber, setMobileNumber] = useState("")
  let [unLockVerification, setUnLockVerification] = useState(false)
  const router = useRouter();

  let dispatch = useDispatch();

  async function valueText(value) {
    if (value == true) {
      console.log(mobileNumber)
      let result = await dispatch(checkUser(mobileNumber))
      console.log(result.payload)
      if (result.payload.resultCode == 2000) {
        setUnLockVerification(false)
        router.push('/')

      } else if (result.payload.resultCode == 4004) {
        setUnLockVerification(true)
      }
    }
  }

  const submitHandler = async ({ email, firstName, mobileNumber, lastName, password, confirmPassword, verification_code }) => {
    console.log("submit Handler")
    console.log(firstName, mobileNumber, lastName, password, confirmPassword, verification_code, email)
    let obj = { "channelid": 1, "deviceid": "", "email": email, "firstName": firstName, "lastName": lastName, "mobile_number": mobileNumber, "password": password }
    let result = await dispatch(registerUser(obj))
    console.log(result)
  };



  return (
    <>
      <Typography component="h4" variant="h4">
        Register
      </Typography>
      <form onSubmit={handleSubmit(submitHandler)}>
        <Controller

          name="mobileNumber"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 2,

          }}
          render={({ field }) => (
            <TextField
              sx={{ width: "1000px", margin: 3 }}
              variant="outlined"
              fullWidth
              id="mobileNumber"
              label="Phone Number"
              inputProps={{ type: 'number' }}
              error={Boolean(errors.mobileNumber)}
              helperText={
                errors.mobileNumber
                  ? errors.mobileNumber.type === 'minLength'
                    ? 'First Name length is more than 1'
                    : 'First Name is required'
                  : ''
              }
              {...field}
            ></TextField>
          )}
        ></Controller>
        <SwipeButton Controller={Controller} unLockVerification={unLockVerification} control={control} errors={errors} valueText={valueText} />
        <Controller

          name="firstName"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 2,

          }}
          render={({ field }) => (
            <TextField
              sx={{ width: "490px", margin: 3 }}
              variant="outlined"
              fullWidth
              id="firstName"
              label="First Name"
              inputProps={{ type: 'name' }}
              error={Boolean(errors.firstName)}
              helperText={
                errors.firstName
                  ? errors.firstName.type === 'minLength'
                    ? 'First Name length is more than 1'
                    : 'First Name is required'
                  : ''
              }
              {...field}
            ></TextField>
          )}
        ></Controller>
        <Controller

          name="lastName"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 2,

          }}
          render={({ field }) => (
            <TextField
              sx={{ width: "470px", margin: 3 }}
              variant="outlined"
              fullWidth
              id="lastName"
              label="Last Name"
              inputProps={{ type: 'name' }}
              error={Boolean(errors.name)}
              helperText={
                errors.lastName
                  ? errors.lastName.type === 'minLength'
                    ? 'Last Name length is more than 1'
                    : 'Last Name is required'
                  : ''
              }
              {...field}
            ></TextField>
          )}
        ></Controller>

        <Controller
          name="email"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
          }}
          render={({ field }) => (
            <TextField
              variant="outlined"
              sx={{ width: "1000px", margin: 3 }}

              id="email"
              label="Email"
              inputProps={{ type: 'email' }}
              error={Boolean(errors.email)}
              helperText={
                errors.email
                  ? errors.email.type === '/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i'
                    ? 'Email is not valid'
                    : 'Email is required'
                  : ''
              }
              {...field}
            ></TextField>
          )}
        ></Controller>

        <Controller
          name="password"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 6,
          }}

          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <TextField
              variant="outlined"
              sx={{ width: "1000px", margin: 3 }}

              id="password"
              label="Password"
              {...register('password', {
                required: "You must specify a password",
                minLength: {
                  value: 8,
                  message: "Password must have at least 8 characters"
                }
              })}
              //onChange={(e) => onChange(setPassword(e.target.value))}
              inputProps={{ type: 'password' }}
              error={Boolean(errors.password)}
              helperText={errors.password
                ? errors.password.type === 'minLength'
                  ? 'Password length is more than 5'
                  : 'Password is required'
                : ''}

            ></TextField>
          )}
        ></Controller>

        <Controller
          name="confirmPassword"
          control={control}
          defaultValue=""
          rules={{
            required: true,
            minLength: 6,
          }}
          render={({ field: { onChange, onBlur, value, name, ref } }) => (
            <TextField
              variant="outlined"
              sx={{ width: "1000px", margin: 3 }}

              id="confirmPassword"
              label="Confirm Password"
              inputProps={{ type: 'password' }}
              //onChange={(e) => onChange(setConfirmPassword(e.target.value))}
              error={Boolean(errors.confirmPassword)}
              {...register("confirmPassword", { required: true })}

              helperText={
                errors.confirmPassword
                  ? errors.confirmPassword.type === 'minLength'
                    ? 'Confirm Password length is more than 5'
                    : 'Confirm  Password is required'
                  :
                  watch("confirmPassword") !== watch("password") &&
                    getValues("confirmPassword") ? (
                    <p style={{ color: 'Red' }}>password not match</p>
                  ) : null

              }

            ></TextField>
          )}
        ></Controller>



        <Button
          //   onClick={handleSubmit(submitHandler); handleClose()}
          variant="contained"
          type="submit"
          sx={{ m: 3, width: "1000px" }}
          fullWidth
          color="primary"
        >
          Signup
        </Button>


      </form>



    </>

  );
}
