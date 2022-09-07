// import { Modal } from '@mui/material'
import { Button } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import MuiAlert from "@mui/material/Alert";
import ModalData from "./ModalData";
import { useDispatch } from "react-redux";
import localStorage from "localStorage";
// import MuiPhoneNumber from "material-ui-phone-number-2";
import NavSelect from "../Navbar/Components/NavSelect";

import locales from "../../i18n.json";
import Divider from "@mui/material/Divider";
import { useRouter, withRouter } from "next/router";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { ListItemIcon } from "@mui/material";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import ReceiptIcon from "@mui/icons-material/Receipt";
import AdUnitsIcon from "@mui/icons-material/AdUnits";
import GppGoodOutlinedIcon from "@mui/icons-material/GppGoodOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import Menu from "@mui/material/Menu";
import { loginUser, logoutUser, logOutCustomer } from "../../slice/authSlice";
import Cookies from "js-cookie";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import Avatar from "@mui/material/Avatar";
import styles from "../../styles/signIn.module.css";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn({ isLoggedIn, setIsLoggedIn }) {
  let dispatch = useDispatch();
  let router = useRouter();
  const [open, setOpen] = React.useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open1 = Boolean(anchorEl);
  const handleClick1 = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose1 = () => {
    setAnchorEl(null);
  };
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
  const myAccount = (
    <div>
      <MenuItem value={10}>
        <ListItemIcon>
          <AccountBoxIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText onClick={() => router.push("/profile")}>
          My Profile
        </ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <FormatListBulletedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText onClick={() => router.push("/orders")}>
          My Orders
        </ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <FormatListBulletedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText onClick={() => router.push("/coupons")}>
          My Coupons
        </ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <ReceiptIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText onClick={() => router.push("/bills")}>
          My Bill Payments
        </ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <AdUnitsIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText onClick={() => router.push("/topUps")}>
          My Topups
        </ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <GppGoodOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText onClick={() => router.push("/security")}>
          Security
        </ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <InfoOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText onClick={() => router.push("/about")}>About</ListItemText>
      </MenuItem>

      <MenuItem>
        <ListItemIcon>
          <HelpOutlineOutlinedIcon fontSize="small" />
        </ListItemIcon>
        <ListItemText onClick={() => router.push("/help")}>Help</ListItemText>
      </MenuItem>
      <Divider />
      <MenuItem onClick={logOut} alignText="center">
        <ListItemIcon>
          <LogoutIcon />
        </ListItemIcon>
        <ListItemText>Logout</ListItemText>
      </MenuItem>
    </div>
  );

  return (
    <>
      {localStorage.getItem("login") == "true" ? (
        <>
          {/* <NavSelect
            // Title={<Avatar sx={{ bgcolor: "green" }}>O</Avatar>}
            Title="My Account"
            Data={myAccount}
            color="white"
          /> */}
          {/* <Button
            // sx={{ color: "white" }}
            id="basic-button"
            aria-controls={open1 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open1 ? "true" : undefined}
            onClick={handleClick1}
          > */}
          {/* <Avatar
            aria-controls={open1 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open1 ? "true" : undefined}
            onClick={handleClick1}
          > */}
          <AccountCircleIcon
            aria-controls={open1 ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open1 ? "true" : undefined}
            onClick={handleClick1}
            color="primary"
            // fontSize="large"
            className={styles.avatar}
          />
          {/* </Avatar> */}
          {/* </Button> */}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open1}
            onClose={handleClose1}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            {myAccount}
          </Menu>
          {/* <Button onClick={logOut} sx={{ color: "white" }}>
            Logout
          </Button> */}
        </>
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
