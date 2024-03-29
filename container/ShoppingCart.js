import React, { useContext, useEffect } from "react";
import NextLink from "next/link";
import Image from "next/image";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
import CloseIcon from "@mui/icons-material/Close";
import { withRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import styles from "../styles/cart.module.css";
import Currency from "./Currency/currency";
function CartScreen({
  heading,
  productCartData,
  removeItemHandler,
  handleAddToCart,
  handleDecreaseCart,
  checkoutHandler,
  productPrice,
}) {

  let { t, i18n } = useTranslation();
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
                  maxHeight: { xs: 233, md: "140px" },
                  maxWidth: { xs: 350, md: "141px" },
                }}
              ></CardMedia>
            )}

            <CardContent sx={{ flex: "1 0 auto" }}>
              <Box
                className={styles.topLine}
              // display="flex"
              // justifyContent={"space-between"}
              >
                <Typography className={styles.cartItemName}>
                  {item.name}
                </Typography>

                <IconButton
                  aria-label="delete"
                  // size="small"
                  // sx={{ mt: -1 }}
                  variant="contained"
                  // color="error"
                  onClick={() => removeItemHandler(item)}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              </Box>
              <Divider />
              <Box
                className={styles.bottomLine}
              // display="flex"
              // justifyContent={"space-between"}
              >
                <Typography
                  component="h5"
                  variant="h5"
                  // m={1}
                  sx={{ color: "warning.main" }}
                  // align="center"
                  className={styles.cartItemPriceValue}
                >
                  Rs. {item.product_cost}
                </Typography>
                <Grid
                  // item
                  // xs={3}
                  // sm={3}
                  // md={3}
                  // lg={3}
                  className={styles.cartItemQuantity}
                >
                  <IconButton
                    // onClick={() => handleDecreaseCart(item)}
                    aria-label="reduce item"
                    size="large"
                  // variant="contained"
                  // color="error"
                  // sx={{ color:  "text.secondary" }}
                  >
                    <IndeterminateCheckBoxOutlinedIcon
                      onClick={() => handleDecreaseCart(item)}
                      className={styles.quantityBtns}
                    />
                  </IconButton>

                  <Typography className="count" align="center">
                    {item.qty}
                  </Typography>

                  <IconButton
                    aria-label="increase item"
                    // size="large"
                    // variant="contained"
                    // color="success"
                    // sx={{ color: "text.secondary" }}
                    onClick={() => handleAddToCart(item)}
                  >
                    <AddBoxOutlinedIcon className={styles.quantityBtns} />
                  </IconButton>
                  {/* </Grid> */}
                </Grid>
              </Box>
              {/* <Grid container> */}
              {/* <Grid
                  item
                  xs={9}
                  sm={9}
                  md={9}
                  lg={9}
                  className={styles.cartItemPrice}
                >
                  <Typography variant="body1" component="div">
                    {" "}
                    {t("checkoutCart.labels.Quantity")}
                  </Typography>
                </Grid> */}

              {/* <Grid
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
                </Grid> */}

              {/* <Grid
                  item
                  xs={9}
                  sm={9}
                  md={9}
                  lg={9}
                  className={styles.cartItemPrice}
                >
                  <Typography variant="body1" component="div">
                    {t("checkoutCart.labels.Price")}
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
                    <Currency amount={item.price}></Currency>
                  </Typography>
                </Grid> */}

              {/* <Grid
                  item
                  xs={9}
                  sm={9}
                  md={9}
                  lg={9}
                  className={styles.cartItemPrice}
                >
                  <Typography variant="body1" component="div">
                    {t("checkoutCart.labels.Delete")}
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
                </Grid> */}
              {/* </Grid> */}
            </CardContent>
          </Card>
        ))}
    </Box>
  );
}

export default withRouter(CartScreen);
