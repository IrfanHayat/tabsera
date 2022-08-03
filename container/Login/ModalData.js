import { Controller, useForm } from "react-hook-form";
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

import { useDispatch, useSelector } from "react-redux";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

import InputAdornment from "@material-ui/core/InputAdornment";
// import TextField from "@material-ui/core/TextField";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Avatar from "@mui/material/Avatar";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import useMediaQuery from "@mui/material/useMediaQuery";
import MuiPhoneNumber from "material-ui-phone-number";
import Box from "@mui/material/Box";
import ModalData from "./ModalData";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import Cookies from "js-cookie";
import {
    addToCart,
    getCartItems,
    getTotalCartQuantity,
} from "../../slice/basketSlice";

// import MuiPhoneNumber from "material-ui-phone-number-2";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function ModalLoginData({ handleClose, open }) {
    const router = useRouter();
    const { redirect } = router.query; // login?redirect=/shipping
    const dispatch = useDispatch();
    const auth = useSelector((state) => state.auth);
    const [loginSccess, setLginSccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

    const [openBar, setOpenBar] = React.useState(false);

    const [nameLogin, setNameLogin] = React.useState(true);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleClickBar = () => {
        setOpenBar(true);
    };

    const handleCloseBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenBar(false);
    };
    const submitHandler = async ({ userName, pwd }) => {
        //   closeSnackbar();
        let data;

        data = { userName, pwd };


        console.log(data);

        let result = await dispatch(loginUser(data));

        console.log(result.payload);
        console.log(Cookies.get("item"));
        if (
            Object.keys(result.payload).length > 0 &&
            Cookies.get("item") != undefined
        ) {
            console.log("I am here");
            if (result.payload == "") {
                setLginSccess(false);
                handleClickBar();
                handleClose();
                setNameLogin(false)
            } else {
                let parseData = Cookies.get("item") ? JSON.parse(Cookies.get("item")) : '';
                await dispatch(addToCart(parseData));
                dispatch(getCartItems());
                dispatch(getTotalCartQuantity());
                setTimeout(() => {
                    Cookies.remove("item"), router.push("/cart");
                }, 1000);
                setLginSccess(true);
                handleClickBar();
                handleClose();
                setNameLogin(false)
            }
        } else {
            result.payload
                ? (router.push("/"), setLginSccess(true), handleClickBar(), handleClose())
                : (setLginSccess(false), handleClickBar(), handleClose(), setNameLogin(false), router.push("/"));

        }

        // handleClose();
        // } catch (err) {
        //   //  enqueueSnackbar(getError(err), { variant: 'error' });
        // }
    };

    const submitHandler1 = async ({ phone, password }) => {
        //   closeSnackbar();
        let data;

        data = { phone, password };


        console.log(data);

        let result = await dispatch(loginUser(data));

        console.log(result.payload);
        console.log(Cookies.get("item"));
        if (
            Object.keys(result.payload).length > 0 &&
            Cookies.get("item") != undefined
        ) {
            console.log("I am here");
            if (result.payload == "") {
                setLginSccess(false);
                handleClickBar();
                handleClose();
                setNameLogin(false)
            } else {
                let parseData = Cookies.get("item") ? JSON.parse(Cookies.get("item")) : '';
                await dispatch(addToCart(parseData));
                dispatch(getCartItems());
                dispatch(getTotalCartQuantity());
                setTimeout(() => {
                    Cookies.remove("item"), router.push("/cart");
                }, 1000);
                setLginSccess(true);
                handleClickBar();
                handleClose();
                setNameLogin(false)
            }
        } else {
            result.payload
                ? (router.push("/"), setLginSccess(true), handleClickBar(), handleClose())
                : (setLginSccess(false), handleClickBar(), handleClose(), setNameLogin(false), router.push("/"));

        }

        // handleClose();
        // } catch (err) {
        //   //  enqueueSnackbar(getError(err), { variant: 'error' });
        // }
    };
    const {
        handleSubmit,
        control,
        register,
        setError,
        formState: { errors },
    } = useForm();
    return (
        <>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                // fullWidth
                // maxWidth="lg"
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <Box
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        // m: "auto",
                        // flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <DialogTitle
                        variant="h1"
                        style={{ fontSize: 24, fontWeight: "bold" }}
                    >
                        Sign In
                    </DialogTitle>
                    <Avatar sx={{ bgcolor: "secondary.main" }}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-around",
                            p: 1,
                            m: 1,
                            bgcolor: "background.paper",
                            //   borderRadius: 1,
                            width: "100%",
                        }}
                    >
                        <Button
                            variant="contained"
                            //   size="small"
                            //   disabled={nameLogin ? "" : "disabled"}
                            onClick={() => setNameLogin(true)}
                        >
                            Sign In with UserName
                        </Button>
                        <Button
                            variant="contained"
                            //   size="small"
                            color="warning"
                            //   disabled={nameLogin ? "disabled" : ""}
                            onClick={() => setNameLogin(false)}
                        >
                            Sign In with Phone
                        </Button>
                    </Box>
                    <DialogContent sx={{ width: "100" }}>



                        {nameLogin ? (
                            <form onSubmit={handleSubmit(submitHandler)}>
                                <Controller
                                    name="userName"
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
                                            sx={{ m: 1 }}
                                            id="userName"
                                            label="User Name"
                                            type="text"
                                            // inputProps={{ type: "password" }}
                                            error={Boolean(errors.userName)}
                                            {...field}
                                        ></TextField>
                                    )}
                                ></Controller>
                                <Controller
                                    name="pwd"
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
                                            sx={{ m: 1 }}
                                            id="pwd"
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

                                <Button
                                    //   onClick={handleSubmit(submitHandler); handleClose()}
                                    variant="contained"
                                    type="submit"
                                    sx={{ m: 1 }}
                                    fullWidth
                                    color="primary"
                                >
                                    Login
                                </Button>

                                <Box sx={{ m: 1 }}>
                                    Don&apos;t have an account? &nbsp;
                                    <NextLink
                                        href={`/register?redirect=${redirect || "/"}`}
                                        passHref
                                    >
                                        <Link>Register</Link>
                                    </NextLink>
                                </Box>

                            </form>
                        ) : (
                            <form onSubmit={handleSubmit(submitHandler1)}>
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
                                            sx={{ m: 1 }}
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
                                            sx={{ m: 1 }}
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

                                <Button
                                    //   onClick={handleSubmit(submitHandler); handleClose()}
                                    variant="contained"
                                    type="submit"
                                    sx={{ m: 1 }}
                                    fullWidth
                                    color="primary"
                                >
                                    Login
                                </Button>

                                <Box sx={{ m: 1 }}>
                                    Don&apos;t have an account? &nbsp;
                                    <NextLink
                                        href={`/register?redirect=${redirect || "/"}`}
                                        passHref
                                    >
                                        <Link>Register</Link>
                                    </NextLink>
                                </Box>

                            </form>
                        )}


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
        </>
    );
}
