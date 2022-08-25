// import { Modal } from '@mui/material'
import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import ModalData from "./ModalData";
import { loginUser, logoutUser, logOutCustomer } from "../../slice/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { useRouter, withRouter } from "next/router";
import localStorage from "localStorage";
// import MuiPhoneNumber from "material-ui-phone-number-2";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn({ isLoggedIn, setIsLoggedIn }) {
  let dispatch = useDispatch();
  let router = useRouter();
  const [open, setOpen] = React.useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  console.log(isLoggedIn);

  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const logOut = async () => {
    let result = await dispatch(logOutCustomer());
    setIsLoggedIn(false);
    localStorage.setItem("login", "false");
    Cookies.remove("item");
    // Cookies.remove("connect.sid");
    router.push("/");
    console.log(result);
  };

  return (
    <>

      {localStorage.getItem('login') == "true" ? (
        <Button onClick={logOut} sx={{ color: "white" }}>
          Logout
        </Button>
      ) : (
        <Button onClick={handleModalOpen} sx={{ color: "white" }}>
          Sign In
        </Button>
      )}
      <ModalData
        isLoggedIn={isLoggedIn}
        handleClose={handleClose}
        open={open}
        setIsLoggedIn={setIsLoggedIn}
      ></ModalData>
    </>
  );
}
