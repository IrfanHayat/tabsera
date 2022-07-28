import React, { useMemo, useEffect, useState } from "react";

// import { styled, alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
// import Drawer from "@mui/material/Drawer";
// import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";

import { useSelector, useDispatch } from "react-redux";
import { CssBaseline, InputAdornment } from "@mui/material";

import { AppBar, Grid, Stack, Typography } from "@mui/material";
import SignInModal from "../Login/SignIn";
import Image from "next/image";
import TopNav from "./Components/TopNav";

import NavDown from "./Components/NavDown";
import { header, footer } from "../../helper/config/config";
import { useRouter, withRouter } from "next/router";
import { loginUser } from "../../slice/authSlice";

export default function NavBar() {
  let dispatch = useDispatch();

  const [showLogin, setShowLogin] = useState(false);
  const [currentHost, setCurrentHost] = useState();

  const routers = useRouter();

  useEffect(() => {
    //dispatch(getTotalCartQuantity());
    // setQunatityProduct(result.payload)
    if (
      typeof window !== "undefined" &&
      window.location !== window.parent.location
    ) {
      const hostname = window.location.hostname;
      setCurrentHost(hostname);
      // console.log(hostname);
    }
    if (routers.query?.userName != "" && routers.query?.pwd != "") {
      // console.log(routers.query?.userName);
      // console.log(routers.query?.pwd);
      dispatch(loginUser(routers.query));
    }
  }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* {router.pathname === "/" ? */}

      <CssBaseline />
      {currentHost != "137.74.4.23" && header != true ? (
        <>
          <TopNav />

          <AppBar
            sx={{
              color: "inherit",
              // bgcolor: "#bdbdbd",
              // height: "95%",
              // bgcolor: "#0277bd",
              justifyContent: "center",
              padding: "5px",
            }}
            position="static"
          >
            <Toolbar>
              <Image src="/logo.png" height={40} width={100}></Image>
              <Box component="div" sx={{ flexGrow: 1 }} />
              <SignInModal show={showLogin} close={() => setShowLogin(false)} />
            </Toolbar>
          </AppBar>
        </>
      ) : (
        ""
      )}
      <NavDown />
    </Box>
  );
}
