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
import { checkUser } from '../slice/authSlice'
import { useSelector, useDispatch } from "react-redux";

export default function Register({ watch, getValues, register, handleSubmit, classes, control, Controller, errors, redirect }) {

  let [mobileNumber, setMobileNumber] = useState("")
  let [unLockVerification, setUnLockVerification] = useState(false)

  let dispatch = useDispatch();

  async function valueText(value) {
    if (value == true) {
      console.log(mobileNumber)
      let result = await dispatch(checkUser(mobileNumber))
      console.log(result.payload)
      if (result.payload.resultCode == 2000) {
        setUnLockVerification(false)
      } else if (result.payload.resultCode == 4004) {
        setUnLockVerification(true)
      }
    }
  }

  const submitHandler = ({ firstName, lastName, verification_code, email, password, confirmPassword }) => {

    console.log(firstName, lastName, verification_code, email, password, confirmPassword)
  };



  return (
    <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>

      <Typography component="h4" variant="h4">
        Register
      </Typography>
      <Card>

        <List>
          <ListItem >
            <Controller
              name="phoneNumber"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}

              render={({ field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error } },) => (
                <TextField
                  sx={{ width: "400px" }}
                  variant="outlined"
                  fullWidth

                  id="phoneNumber"
                  label="Phone Number"
                  onChange={(e) => onChange(setMobileNumber(e.target.value))}
                  inputProps={{ type: 'phoneNumber' }}
                  error={Boolean(errors.name)}
                  helperText={
                    errors.name
                      ? errors.name.type === 'minLength'
                        ? 'Mobile Number length is more than 1'
                        : 'Mobile Number is required'
                      : ''
                  }

                ></TextField>
              )}
            ></Controller>
            {/* <Controller
              render={({
                field: { onChange, onBlur, value, name, ref },
                fieldState: { invalid, isTouched, isDirty, error },
              }) => (
                <TextField
                  value={value}
                  onChange={(e) => onChange(console.log(e.target.value))} // send value to hook form
                  onBlur={onBlur} // notify when input is touched
                  inputRef={ref} // wire up the input ref
                />
              )}
              name="TextField"
              control={control}
              rules={{ required: true }}
            /> */}

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
                  sx={{ width: "390px", margin: 3 }}
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
                  sx={{ width: "390px", margin: 3 }}
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
          </ListItem>
          <ListItem>
            {/* <Box sx={{ width: 250 }}>
              <Slider

                defaultValue={30}
                getAriaValueText={valuetext}
                valueLabelDisplay="auto"
                sx={{ height: 10 }}

                min={10}
                max={110}
              />

            </Box> */}
            <SwipeButton Controller={Controller} unLockVerification={unLockVerification} control={control} errors={errors} valueText={valueText} />
          </ListItem>
          <ListItem>
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
                  fullWidth
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
          </ListItem>
          <ListItem>
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
                  fullWidth
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
          </ListItem>
          <ListItem>
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
                  fullWidth
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
          </ListItem>
          <ListItem>
            <Button variant="contained" type="button" fullWidth color="primary">
              Register
            </Button>
          </ListItem>
          <ListItem>
            Already have an account? &nbsp;
            <NextLink href={`/login?redirect=${redirect || '/'}`} passHref>
              <Link>Login</Link>
            </NextLink>
          </ListItem>
        </List>
      </Card>
    </form >

  );
}
