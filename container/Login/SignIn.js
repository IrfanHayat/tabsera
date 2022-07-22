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
import React, { useContext, useEffect, useState } from "react";
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
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
// import TextField from "@material-ui/core/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import useMediaQuery from "@mui/material/useMediaQuery";
import MuiPhoneNumber from "material-ui-phone-number";
import Box from "@mui/material/Box";
// import MuiPhoneNumber from "material-ui-phone-number-2";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

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
  const [showPassword, setShowPassword] = useState(false);

  const [openBar, setOpenBar] = React.useState(false);

  const handleClickBar = () => {
    setOpenBar(true);
  };

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBar(false);
  };
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  // useEffect(() => {
  //   if (auth._id) {
  //     navigate("/cart");
  //   }
  // }, []);
  const [loginSccess, setLginSccess] = useState(false);

  const submitHandler = async ({ phone, password }) => {
    //   closeSnackbar();
    let data = { phone, password };

    let result = await dispatch(loginUser(data));

   
    result.payload
      ? (router.push("/"), setLginSccess(true), handleClickBar(), handleClose())
      : (setLginSccess(false), handleClickBar(), router.push("/login"));
    // handleClose();
    // } catch (err) {
    //   //  enqueueSnackbar(getError(err), { variant: 'error' });
    // }
   
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
      <Button onClick={handleModalOpen} sx={{ color: "white" }}>
        sign in
      </Button>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            // m: "auto",
            // width: "100%",
            alignItems: "center",
          }}
        >
          <DialogTitle id="responsive-dialog-title">Sign In</DialogTitle>
          <Avatar sx={{ bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
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
                      <MuiPhoneNumber
                        defaultCountry={"us"}
                        fullWidth
                        disableDropdown
                        variant="outlined"
                        id="phone"
                        label="Phone Number"
                        error={Boolean(errors.phone)}
                        {...field}
                        // disableAreaCodes
                      />
                      // <PhoneInput
                      //   variant="outlined"
                      //   inputStyle={{ height: "50px", width: "135%" }}
                      //   id="phone"
                      //   label="Phone"
                      //   error={Boolean(errors.phone)}
                      //   {...field}
                      // ></PhoneInput>
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
                      minLength: 2,
                    }}
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        fullWidth
                        id="password"
                        label="Password"
                        type={showPassword ? "text" : "password"}
                        // inputProps={{ type: "password" }}
                        error={Boolean(errors.password)}
                        helperText={
                          errors.password
                            ? errors.password.type === "minLength"
                              ? "Password length is more than 5"
                              : "Password is required"
                            : ""
                        }
                        {...field}
                        InputProps={{
                          endAdornment: (
                            <InputAdornment
                              position="end"
                              onClick={handleShowPassword}
                            >
                              {showPassword ? (
                                <VisibilityOffIcon />
                              ) : (
                                <VisibilityIcon />
                              )}
                            </InputAdornment>
                          ),
                        }}
                        // InputProps={{
                        //   endAdornment: (
                        //     <InputAdornment position="end">
                        //       <IconButton
                        //         aria-label="Toggle password visibility"
                        //         onClick={handleShowPassword}
                        //         // onMouseDown={this.handleMouseDownPassword}
                        //       >
                        //         {showPassword ? (
                        //           <VisibilityOffIcon />
                        //         ) : (
                        //           <VisibilityIcon />
                        //         )}
                        //       </IconButton>
                        //     </InputAdornment>
                        //   ),
                        // }}
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
        </Box>
      </Dialog>
      <Snackbar
        open={openBar}
        autoHideDuration={2000}
        onClose={handleCloseBar}
        anchorOrigin={{
          horizontal: "center",
          vertical: "top",
        }}
      >
        <Alert
          onClose={handleCloseBar}
          severity={loginSccess ? "success" : "error"}
          sx={{ width: "100%" }}
        >
          {loginSccess ? " Login SuccessFully!" : " Login Failed!"}
        </Alert>
      </Snackbar>
    </div>
  );
}
