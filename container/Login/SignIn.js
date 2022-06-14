// import { Modal } from '@mui/material'
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
import PhoneInput from "react-phone-input-2";
import Modal from "../Modal/Modal";
// import SignIn from "../../container/Login/SignIn";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
// import useMediaQuery from "@mui/material/useMediaQuery";
export default function SignIn() {
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
      handleClose();
    } catch (err) {
      //  enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleModalOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <Button onClick={handleModalOpen}>sign in</Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">Sign In</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(submitHandler)}>
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
                      inputStyle={{ height: "50px", width: "135%" }}
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
                <Button
                  //   onClick={handleSubmit(submitHandler); handleClose()}
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                >
                  Login
                </Button>
              </ListItem>
              <ListItem>
                Don&apos;t have an account? &nbsp;
                <NextLink
                  href={`/register?redirect=${redirect || "/"}`}
                  passHref
                >
                  <Link>Register</Link>
                </NextLink>
              </ListItem>
            </List>
          </form>
        </DialogContent>
        <DialogActions>
          {/* <Button autoFocus onClick={handleClose}>
            Login
          </Button>
          <Button onClick={handleClose} autoFocus>
            Cancel
          </Button> */}
        </DialogActions>
      </Dialog>
    </div>
  );
}
