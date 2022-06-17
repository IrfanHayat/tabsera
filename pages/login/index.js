import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Link,
} from "@mui/material";
import { useRouter } from "next/router";
import NextLink from "next/link";
import React, { useContext, useEffect } from "react";
import { loginUser } from "../../slice/authSlice";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useSnackbar } from "notistack";
import CheckoutWizard from "../../container/CheckoutWizard";
import PhoneInput from "react-phone-input-2";
import SignIn from "../../container/Login/SignIn";
export default function Login() {
  const {
    handleSubmit,
    control,
    register,
    setError,
    formState: { errors },
  } = useForm();
  // const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const router = useRouter();
  const { redirect } = router.query; // login?redirect=/shipping
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  // useEffect(() => {
  //   if (auth._id) {
  //     navigate("/cart");
  //   }
  // }, []);

  const submitHandler = async ({ phone, password }) => {
    //   closeSnackbar();
    let data = { phone, password };

    try {
      let result = await dispatch(loginUser(data));
      result.payload ? router.push("/") : router.push("/login");
    } catch (err) {
      //  enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  return (
    <>
      {/* <SignIn /> */}

      {/* <form onSubmit={handleSubmit(submitHandler)}>
        <Typography component="h1" variant="h1">
          Login
        </Typography>
        <List>
          <ListItem>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              inputProps={{
                required: true,
              }}
              render={({ field }) => (
                <PhoneInput
                  variant="outlined"
                  dropdownStyle={{ height: "250px" }}
                  inputStyle={{ height: "50px", width: "207vh" }}
                  id="phone"
                  label="Phone"
                  error={Boolean(errors.phone)}
                  {...field}
                ></PhoneInput>
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
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="password"
                  label="Password"
                  inputProps={{ type: "password" }}
                  error={Boolean(errors.password)}
                  helperText={
                    errors.password
                      ? errors.password.type === "minLength"
                        ? "Password length is more than 5"
                        : "Password is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem>
          <ListItem>
            <Button variant="contained" type="submit" fullWidth color="primary">
              Login
            </Button>
          </ListItem>
          <ListItem>
            Don&apos;t have an account? &nbsp;
            <NextLink href={`/register?redirect=${redirect || "/"}`} passHref>
              <Link>Register</Link>
            </NextLink>
          </ListItem>
        </List>
      </form> */}
    </>
  );
}
