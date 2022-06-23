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
  

  return (
    <Box sx={{ flexGrow: 1,display: 'grid', marginTop: 5 }}>
      <Typography component="h4" variant="h5">
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
            }}
          >
            <Grid item xs="auto" style={{ height: "150px", width: "150px" }}>
              <NextLink href={`/product/${item?.name}`} passHref>
                <Link>
                  <CardMedia
                    component="img"
                    style={{ height: "100%", width: "100%" }}
                    image={item.image_URL}
                    alt="green iguana"
                  />
                </Link>
              </NextLink>
            </Grid>
            <Grid item md={2} sm={1}>
              <NextLink
                href={`/product_detail?product_name=${item.name}`}
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
            <Grid item md={1} sm={2} align="right">
              ${item.price}
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
  );
}

export default withRouter(CartScreen);
