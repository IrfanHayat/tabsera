// import { Modal } from '@mui/material'
import {
  Button,

} from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import ModalData from "./ModalData";
// import MuiPhoneNumber from "material-ui-phone-number-2";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {
  const [open, setOpen] = React.useState(false);
  const handleModalOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <>
      <Button onClick={handleModalOpen} sx={{ color: "white" }}>
        Sign In
      </Button>
      <ModalData handleClose={handleClose} open={open}></ModalData>
    </>

  );
}
