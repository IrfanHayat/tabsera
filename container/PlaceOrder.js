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
import Box from '@mui/material/Box';
import CheckoutWizard from "./CheckoutWizard";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import DomainAddOutlinedIcon from '@mui/icons-material/DomainAddOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';

function PlaceOrder({userData,shippementData,shippingAddress,shippingPrice,taxPrice,totalPrice,productPrice,placeOrderHandler,productCartData,cartTotalAmount,heading,loading,classes,paymentMethod,cartItems,itemsPrice}) {
  
  return (
    <>
      <CheckoutWizard activeStep={5}></CheckoutWizard>
      
      <Grid container mt={5} justifyContent={"center"}>
      
        <Grid item md={9} xs={12}>
        <Card className={classes.section}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="h6" component="h2">
             Shipping Information
           </Typography>
            
              {/* {productDetail?.merchant_name} */}
              <List>
                <ListItem><AccountCircleIcon/>{userData.first_name} {userData.last_name}</ListItem>
              </List>
              <List>
                <ListItem><PhoneIcon/> </ListItem>
              </List>
              <List>
                <ListItem>
                  <EmailIcon/>{userData.email}
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <DomainAddOutlinedIcon/>{shippementData?.address}
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <AddLocationAltOutlinedIcon/>{shippementData?.city},{shippementData?.state},{shippementData?.country}
                </ListItem>
              </List>
              </Box>
            {/* <TabPanel value={value} index={2}>
              {merchantDetail?.city}
            </TabPanel> */}
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h4">
                  Your Shipping Method
                </Typography>
              </ListItem>
              <ListItem>overnight</ListItem>
            </List>
          </Card>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography component="h2" variant="h4">
                  Order Items
                </Typography>
              </ListItem>
              <ListItem>
                <TableContainer>
                  <Table>
                  
                  {productCartData && Object.keys(productCartData).map((key) => (  
                  <>
                  <TableHead>
                  {productCartData[key].map((result) => result.merchant_name)[0]}
                   </TableHead>
                  
                     <TableBody>
                     { productCartData[key].map((item)=> (
                       <TableRow >
                         <TableCell>
                           <NextLink href={`/product/${item.name}`} passHref>
                             <Link>
                               <Image
                                 src={item.image_URL}
                                 alt="shirt"
                                 width={50}
                                 height={50}
                               ></Image>
                             </Link>
                           </NextLink>
                         </TableCell>

                         <TableCell>
                           <NextLink href={`/product/${item.name}`} passHref>
                             <Link>
                               <Typography>{item.name}</Typography>
                             </Link>
                           </NextLink>
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
                   ))
                   } 
                  </Table>
                </TableContainer>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <List>
              <ListItem>
                <Typography variant="h2">Order Summary</Typography>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={3}>
                    <Typography>Items:</Typography>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography align="right"> {productPrice &&
              productPrice.reduce((a, c) => a + c.qty * c.price, 0)}</Typography>
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
                    <Typography align="right">500</Typography>
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
                      <strong>{productPrice &&
              productPrice.reduce((a, c) => a + c.qty * c.price, 0)+500}</strong>
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  onClick={()=>placeOrderHandler(shippementData,userData)}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Place Order
                </Button>
              </ListItem>
              {/* {loading && (
                <ListItem>
                  <CircularProgress />
                </ListItem>
              )} */}
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default withRouter(PlaceOrder);
