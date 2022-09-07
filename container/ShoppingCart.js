import React, { useContext, useEffect } from "react";
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
  ListItemText,
  Divider,
  Button,
  Card,
  List,
  ListItem,
  CardMedia,
  Box,
  Paper,
  CardContent,
} from "@mui/material";

import { withRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import styles from "../styles/cart.module.css";
function CartScreen({
  heading,
  productCartData,
  removeItemHandler,
  handleAddToCart,
  handleDecreaseCart,
  checkoutHandler,
  productPrice,
}) {
  console.log(productCartData);
  return (
    <Box className={styles.cart}>
      <Typography
        // style={{ fontWeight: "bold", m: 3 }}
        component="h5"
        variant="h5"
      >
        {heading}
      </Typography>
      {productCartData &&
        productCartData.map((item) => (
          <Card
            className={styles.cartCard}
            sx={{
              flexDirection: { xs: "column", md: "row" },
            }}
          >
            {item.image_URL && (
              <CardMedia
                // component="img"
                component="img"
                // height="194"
                image={item.image_URL}
                alt={item.name}
                className={styles.cartCardImg}
                sx={{
                  maxHeight: { xs: 233, md: 167 },
                  maxWidth: { xs: 350, md: 250 },
                }}
              ></CardMedia>
            )}

            <CardContent sx={{ flex: "1 0 auto" }}>
              <Typography className={styles.cartItemName}>
                {item.name}
              </Typography>
              <Divider />
              <Grid container>
                <Grid
                  item
                  xs={9}
                  sm={9}
                  md={9}
                  lg={9}
                  className={styles.cartItemPrice}
                >
                  <Typography variant="body1" component="div">
                    {" "}
                    Quantity
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  className={styles.cartItemQuantity}
                >
                  <IconButton
                    onClick={() => handleDecreaseCart(item)}
                    aria-label="reduce item"
                    size="large"
                    variant="contained"
                    color="error"
                    // sx={{ color:  "text.secondary" }}
                  >
                    <IndeterminateCheckBoxOutlinedIcon />
                  </IconButton>

                  <Typography className="count" align="center">
                    {item.qty}
                  </Typography>

                  <IconButton
                    aria-label="increase item"
                    size="large"
                    variant="contained"
                    color="success"
                    // sx={{ color: "text.secondary" }}
                    onClick={() => handleAddToCart(item)}
                  >
                    <AddBoxOutlinedIcon />
                  </IconButton>
                  {/* </Grid> */}
                </Grid>
                <Grid
                  item
                  xs={9}
                  sm={9}
                  md={9}
                  lg={9}
                  className={styles.cartItemPrice}
                >
                  <Typography variant="body1" component="div">
                    Price
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  {" "}
                  <Typography
                    component="h5"
                    variant="h5"
                    // m={1}
                    sx={{ color: "warning.main" }}
                    // align="center"
                    className={styles.cartItemPriceValue}
                  >
                    Rs. {item.price}
                  </Typography>
                </Grid>

                <Grid
                  item
                  xs={9}
                  sm={9}
                  md={9}
                  lg={9}
                  className={styles.cartItemPrice}
                >
                  <Typography variant="body1" component="div">
                    Delete
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={3}
                  sm={3}
                  md={3}
                  lg={3}
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <IconButton
                    aria-label="delete"
                    size="large"
                    variant="contained"
                    color="error"
                    onClick={() => removeItemHandler(item)}
                  >
                    <DeleteIcon fontSize="inherit" />
                  </IconButton>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        ))}
    </Box>
  );
}

export default withRouter(CartScreen);
