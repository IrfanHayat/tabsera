import React, { useContext, useEffect, useState } from "react";
//import Layout from '../components/Layout';
import NextLink from "next/link";
import Image from "next/image";
import {
  Grid,
  TableContainer,
  Table,
  Typography,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Link,
  CircularProgress,
  Button,
  Card,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
//import axios from 'axios';
import { useRouter, withRouter } from "next/router";
import Box from "@mui/material/Box";
import CheckoutWizard from "./CheckoutWizard";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Stack } from "@mui/material";
import { RouteGuard } from "../RouterGuard";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PlaceOrder({
  userData,
  shippementData,
  shippmentName,
  shippingAddress,
  shippingPrice,
  taxPrice,
  totalPrice,
  shippingCharges,
  productPrice,
  placeOrderHandler,
  productCartData,
  cartTotalAmount,
  heading,
  loading,
  classes,
  paymentMethod,
  cartItems,
  itemsPrice,
}) {
  const [openBar, setOpenBar] = React.useState(false);
  // const [loginSccess, setLginSccess] = React.useState(false);

  const handleClickBar = () => {
    setOpenBar(true);
  };

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBar(false);
  };
  return (
    <>
   
      <CheckoutWizard activeStep={4}></CheckoutWizard>

      <Grid container mt={5} justifyContent={"center"}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                p: 2,
              }}
            >
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                Shipping Information
              </Typography>

              {/* {productDetail?.merchant_name} */}
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircleIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {userData.first_name} {userData.last_name}
                  </ListItemText>
                </ListItem>
              </List>
              {/* <List>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />
                  </ListItemIcon>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText>{userData.email}</ListItemText>
                </ListItem>
              </List> */}
              <List>
                <ListItem>
                  <ListItemIcon>
                    <DomainAddOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>{shippementData?.address}</ListItemText>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AddLocationAltOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {shippementData?.city},{shippementData?.state},
                    {shippementData?.country}
                  </ListItemText>
                </ListItem>
              </List>
            </Box>
            {/* <TabPanel value={value} index={2}>
              {merchantDetail?.city}
            </TabPanel> */}
          </Card>
          <Card className={classes.section}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                p: 2,
              }}
            >
              <List>
                <ListItem>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Your Shipping Method
                  </Typography>
                </ListItem>
                <ListItem>{shippmentName}</ListItem>
              </List>
            </Box>
          </Card>

          <Card className={classes.section}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                p: 2,
              }}
            >
              <List>
                <ListItem>
                  <Typography variant="h6" style={{ fontWeight: "bold" }}>
                    Order Items
                  </Typography>
                </ListItem>
                <ListItem>
                  <TableContainer>
                    <Table>
                      {productCartData &&
                        Object.keys(productCartData).map((key) => (
                          <>
                            <TableHead>
                              {
                                productCartData[key].map(
                                  (result) => result.merchant_name
                                )[0]
                              }
                            </TableHead>

                            <TableBody>
                              {productCartData[key].map((item) => (
                                <TableRow>
                                  <TableCell>
                                   
                                      
                                        <Image
                                          src={item.image_URL}
                                          alt="shirt"
                                          width={50}
                                          height={50}
                                        ></Image>
                                      
                                    
                                  </TableCell>

                                  <TableCell>
                                    <Typography>{item.name}</Typography>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Typography>{item.qty}</Typography>
                                  </TableCell>
                                  <TableCell align="right">
                                    <Typography>${item.price}</Typography>
                                  </TableCell>
                                </TableRow>
                              ))}
                            </TableBody>
                          </>
                        ))}
                    </Table>
                  </TableContainer>
                </ListItem>
              </List>
            </Box>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                p: 2,
              }}
            >
              <List>
                <ListItem>
                  <Typography
                    variant="h5"
                    component="h4"
                    style={{ fontWeight: "bold" }}
                  >
                    Order Summary
                  </Typography>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography>Items:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography align="right">
                        {" "}
                        {productPrice &&
                          productPrice.reduce((a, c) => a + c.qty * c.price, 0)}
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {/* <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Tax:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${taxPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem> */}
                <ListItem>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography>Shipping:</Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography align="right">{shippingCharges}</Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={3}>
                      <Typography>
                        <strong>Total:</strong>
                      </Typography>
                    </Grid>
                    <Grid item xs={3}>
                      <Typography align="right">
                        <strong>
                          {productPrice && shippingCharges
                            ? productPrice.reduce(
                                (a, c) => a + c.qty * c.price,
                                0
                              ) + shippingCharges
                            : productPrice.reduce(
                                (a, c) => a + c.qty * c.price,
                                0
                              )}
                        </strong>
                      </Typography>
                    </Grid>
                  </Grid>
                </ListItem>
                {/* <ListItem> */}
                {/* <Button
                    onClick={
                      () => {
                        handleClickBar(),
                          placeOrderHandler(shippementData, userData);
                      }
                      // handleClickBar())
                    }
                    variant="contained"
                    color="primary"
                    // fullWidth
                  >
                    Place Order
                  </Button>
                </ListItem> */}
                {/* {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )} */}
              </List>
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={
                    () => {
                      handleClickBar(),
                        placeOrderHandler(shippementData, userData);
                    }
                    // handleClickBar())
                  }
                  variant="contained"
                  color="primary"
                  // fullWidth
                >
                  Place Order
                </Button>
                <Button
                  // fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => router.push("/")}
                >
                  Back
                </Button>
              </Stack>
            </Box>
          </Card>

          <Snackbar
            open={openBar}
            autoHideDuration={6000}
            onClose={handleCloseBar}
            anchorOrigin={{
              horizontal: "center",
              vertical: "top",
            }}
          >
            <Alert
              onClose={handleCloseBar}
              severity="success"
              sx={{ width: "100%" }}
            >
              Ordered SuccessFully!
            </Alert>
          </Snackbar>
        </Grid>
      </Grid>
      {/* <Snackbar open={openBar} autoHideDuration={6000} onClose={handleCloseBar}>
        <Alert
          onClose={handleCloseBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Ordered SuccessFully!
        </Alert>
      </Snackbar> */}
    </>
  );
}

export default withRouter(PlaceOrder);
