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
import { useTranslation } from "react-i18next";
import styles from "../styles/placeOrder.module.css";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CategoryIcon from "@mui/icons-material/Category";
import SummarizeIcon from "@mui/icons-material/Summarize";
import ViewListIcon from "@mui/icons-material/ViewList";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import Currency from "../container/Currency/currency";
import { Divider } from "@mui/material";
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function PlaceOrder({
  userData,
  shippementData,
  shippmentName,
  shippementLockerData,
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
  handleCloseBar,
  // openBar,
}) {
  const [openBar, setOpenBar] = React.useState(false);
  // const [loginSccess, setLginSccess] = React.useState(false);
  const router = useRouter();
  let { t, i18n } = useTranslation();
  // const handleClickBar = () => {
  //   setOpenBar(true);
  // };

  // const handleCloseBar = (event, reason) => {
  //   if (reason === "clickaway") {
  //     return;
  //   }
  //   setOpenBar(false);
  // };
  console.log(shippmentName);
  return (
    <>
      <CheckoutWizard activeStep={2}></CheckoutWizard>

      <Grid container>
        <Grid item md={8} xs={12}>
          <Grid item md={12} xs={12} className={styles.placeOrder}>
            <Box className={styles.placeOrderHeading}>
              <InfoIcon className={styles.Icon} />
              <Typography style={{ fontWeight: "bold" }}>
                {t("shippingInfo.Review Order.labels.shippingInformation")}
              </Typography>
            </Box>
            <Box>
              <Box className={styles.infoList}>
                <AccountCircleIcon className={styles.infoIcon} />
                <Typography>
                  {userData.first_name} {userData.last_name}
                </Typography>
              </Box>
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

              <Box className={styles.infoList}>
                <DomainAddOutlinedIcon className={styles.infoIcon} />

                {shippementLockerData ? (
                  <Typography>
                    {shippementLockerData?.locker_address}{" "}
                  </Typography>
                ) : (
                  <Typography>
                    {shippementData?.address_label_name}{" "}
                    {shippementData?.address}
                    ," ",{shippementData?.city},{shippementData?.state},
                    {shippementData?.country}
                  </Typography>
                )}
              </Box>
              {/* </List>
              <List> */}
              {/* <ListItem>
                  <ListItemIcon>
                    <AddLocationAltOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {shippementData?.city},{shippementData?.state},
                    {shippementData?.country}
                  </ListItemText>
                </ListItem> */}
            </Box>
            {/* <TabPanel value={value} index={2}>
              {merchantDetail?.city}
            </TabPanel> */}
          </Grid>
          <Grid item md={12} xs={12} className={styles.placeOrder}>
            <Box className={styles.placeOrderHeading}>
              <LocalShippingIcon className={styles.Icon} />

              <Typography style={{ fontWeight: "bold" }}>
                {t("shippingInfo.Review Order.labels.shippingMethod")}
              </Typography>
            </Box>

            <Box className={styles.infoList}>
              <Typography>{shippmentName}</Typography>
            </Box>
          </Grid>

          <Grid item md={12} xs={12} className={styles.placeOrder}>
            <Box className={styles.placeOrderHeading}>
              <ViewListIcon className={styles.Icon} />

              <Typography style={{ fontWeight: "bold" }}>
                {t("shippingInfo.Review Order.labels.orderItems")}
              </Typography>
            </Box>
            <Box>
              <List>
                <ListItem>
                  <TableContainer>
                    <Table>
                      {productCartData &&
                        Object.keys(productCartData).map((key) => (
                          <>
                            <TableHead sx={{ fontWeight: "bold" }}>
                              {
                                productCartData[key].map(
                                  (result) => result.merchant_name
                                )[0]
                              }
                              :
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
                                    <Typography>
                                      <Currency amount={item.price}></Currency>
                                    </Typography>
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
          </Grid>
        </Grid>

        <Grid item md={4} xs={12} className={styles.orderSummary}>
          <Box className={styles.placeOrderHeading}>
            {/* <SummarizeIcon className={styles.Icon} /> */}
            <Typography sx={{ fontWeight: "bold", ml: 2 }}>
              {t("shippingInfo.Review Order.labels.orderSummary")}
            </Typography>
          </Box>
          <Box>
            <Grid container>
              <ListItem>
                <Grid item xs={8}>
                  <Typography>
                    {" "}
                    {t("shippingInfo.Review Order.labels.items")}:
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography>
                    {" "}
                    <Currency
                      amount={
                        productPrice &&
                        productPrice.reduce((a, c) => a + c.qty * c.price, 0)
                      }
                    ></Currency>
                  </Typography>
                </Grid>
                {/* <Grid item xs={6}></Grid> */}
              </ListItem>

              <ListItem>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography>
                      {" "}
                      {t("shippingInfo.Review Order.labels.shipping")}:
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      {shippingCharges ? (
                        <Currency amount={shippingCharges}></Currency>
                      ) : (
                        <Currency amount={0}></Currency>
                      )}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider fullwidth />
              <ListItem>
                <Grid container>
                  <Grid item xs={8}>
                    <Typography>
                      <strong>
                        {" "}
                        {t("shippingInfo.Review Order.labels.total")}:
                      </strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Typography>
                      <strong>
                        <Currency
                          amount={
                            productPrice && shippingCharges
                              ? productPrice.reduce(
                                  (a, c) => a + c.qty * c.price,
                                  0
                                ) + shippingCharges
                              : productPrice.reduce(
                                  (a, c) => a + c.qty * c.price,
                                  0
                                )
                          }
                        ></Currency>
                      </strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </Grid>

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
            {/* <Stack direction="row" spacing={2}> */}
            <Button
              onClick={
                () => {
                  // handleClickBar(),
                  placeOrderHandler(shippementData, userData);
                }
                // handleClickBar())
              }
              sx={{ mt: "11px" }}
              variant="contained"
              color="primary"
              fullWidth
            >
              {t("shippingInfo.Review Order.button.pay")}
            </Button>
            {/* <Button
                  // fullWidth
                  variant="contained"
                  color="error"
                  onClick={() =>
                    router.push(
                      `shipping_details?addressId=${JSON.parse(
                        localStorage.getItem("addressId")
                      )}`
                    )
                  }
                >
                  Back
                </Button> */}
            {/* </Stack> */}
          </Box>

          <Snackbar
            // open={openBar}
            autoHideDuration={2000}
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
