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
} from "@mui/material";
//import axios from 'axios';
import { useRouter, withRouter } from "next/router";
import useStyles from "../utils/styles";
import CheckoutWizard from "../component/CheckoutWizard";
import { clearBasket } from "../slice/basketSlice";
//import Cookies from 'js-cookie';
import { useSelector, useDispatch } from "react-redux";
import localStorage from "localStorage";

function PlaceOrder() {
  const classes = useStyles();
  const router = useRouter();
  const { dispatch } = useDispatch();
  const {
    cart: { cartItems, shippingAddress, paymentMethod },
  } = useSelector(state => state.basket);
  const round2 = num => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.cartQuantity, 0)
  );
  console.log(itemsPrice)
  const shippingPrice = itemsPrice > 200 ? 10 : 15;
  const taxPrice = round2(itemsPrice * 0.15);
  const totalPrice = round2(itemsPrice + shippingPrice + taxPrice);

  useEffect(() => {
    if (!paymentMethod) {
      router.push("/payment");
    }
    if (cartItems.length === 0) {
      router.push("/cart");
    }
  }, []);
  // const { closeSnackbar, enqueueSnackbar } = useSnackbar();
  const [loading, setLoading] = useState(false);
  const placeOrderHandler = async () => {
    // closeSnackbar();
    try {
      setLoading(true);
      //   const { data } = await axios.post(
      //     '/api/orders',
      //     {
      //       orderItems: cartItems,
      //       shippingAddress,
      //       paymentMethod,
      //       itemsPrice,
      //       shippingPrice,
      //       taxPrice,
      //       totalPrice,
      //     },
      //     {
      //       headers: {
      //         authorization: `Bearer ${userInfo.token}`,
      //       },
      //     }
      //   );
      dispatch(clearBasket());
      //Cookies.remove('cartItems');
      localStorage.removeItem("cartItems");
      setLoading(false);
      //  router.push(`/order/${data._id}`);
    } catch (err) {
      setLoading(false);
      //enqueueSnackbar(getError(err), { variant: 'error' });
    }
  };
  return (
    <>
      <CheckoutWizard activeStep={3}></CheckoutWizard>
      <Typography component="h1" variant="h1">
        Place Order
      </Typography>

      <Grid container spacing={1}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Shipping Address
                </Typography>
              </ListItem>
              <ListItem>
                {shippingAddress.fullName}, {shippingAddress.address},{" "}
                {shippingAddress.city}, {shippingAddress.postalCode},{" "}
                {shippingAddress.country}
              </ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Payment Method
                </Typography>
              </ListItem>
              <ListItem>{paymentMethod}</ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h2">
                  Order Items
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableCell>Image</TableCell>
                        <TableCell>Name</TableCell>
                        <TableCell align="right">Quantity</TableCell>
                        <TableCell align="right">Price</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {cartItems.map(item => (
                        <TableRow key={item._id}>
                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Image
                                  src={item.imgdata}
                                  alt="shirt"
                                  width={50}
                                  height={50}
                                ></Image>
                              </Link>
                            </NextLink>
                          </TableCell>

                          <TableCell>
                            <NextLink href={`/product/${item.slug}`} passHref>
                              <Link>
                                <Typography>{item.rname}</Typography>
                              </Link>
                            </NextLink>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>{item.cartQuantity}</Typography>
                          </TableCell>
                          <TableCell align="right">
                            <Typography>${item.price}</Typography>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Items:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${itemsPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Tax:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${taxPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Shipping:</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">${shippingPrice}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>
                      <strong>Total:</strong>
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography align="right">
                      <strong>${totalPrice}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={placeOrderHandler}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Place Order
                </Button>
              </ListItem>
              {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )}
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default withRouter(PlaceOrder);
