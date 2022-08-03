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
  Button,
  Card,
  List,
  ListItem,
  CardMedia,
  Box,
  Paper,
} from "@mui/material";

import { withRouter } from "next/router";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";

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
    <>


      <Box sx={{ flexGrow: 1, display: "grid", p: 3 }}>
        <Typography component="h5" variant="h5" style={{ fontWeight: "bold" }}>
          {heading}
        </Typography>

        {productCartData &&
          productCartData.map((item) => (
            <Grid
              container
              spacing={1}
              key={item.name}
              style={{
                textAlign: "center",
                display: "flex",
                alignItems: "center",
                // mx: 5,
              }}
            >
              <Grid
                item
                xs="auto"
                sm="auto"
                m={2}
                style={{ height: "150px", width: "150px" }}
              >
                <NextLink
                  href={`/product_detail?productId=${localStorage.getItem(
                    "productId"
                  )}`}
                  passHref
                >
                  <Link>
                    {item.image_URL && (
                      <>
                        <Image
                          // className={cx(styles.media, mediaStyles.root)}
                          src={item.image_URL}
                          alt="product"
                          width={245}
                          height={200}
                          loading="eager"
                          priority
                        ></Image>
                      </>
                    )}

                  </Link>
                </NextLink>
              </Grid>
              <Grid item md={2} sm={1}>
                <NextLink
                  href={`/product_detail?product_name=${item.id}`}
                  passHref
                >
                  <Typography variant="body" style={{ textDecoration: "none " }}>
                    {item.name}
                  </Typography>
                </NextLink>
              </Grid>
              <Grid item md={1} sm={1}>
                <IconButton
                  onClick={() => handleDecreaseCart(item)}
                  aria-label="reduce item"
                  size="large"
                  variant="contained"
                  sx={{ color: "text.secondary" }}
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
                  sx={{ color: "text.secondary" }}
                  onClick={() => handleAddToCart(item)}
                >
                  <AddBoxOutlinedIcon />
                </IconButton>
              </Grid>
              <Grid item md={2} sm={2} align="right">
                {item.price}
              </Grid>
              <Grid item md={1} sm={1} align="right">
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
              {/* <Grid item md={2} sm={2}>
            <Grid item md={3} sm={3}>
              <Card>
                <List>
                  <ListItem>
                    <ListItemText>
                      Sub Total
                      {item.qty}
                      item : ${item.qty * item.price}
                    </ListItemText>
                  </ListItem>
                </List>
              </Card>
            </Grid> */}
            </Grid>
          ))}
      </Box>
    </>
  );
}

export default withRouter(CartScreen);
