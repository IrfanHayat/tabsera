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
  Paper,
} from "@mui/material";

import { withRouter } from "next/router";

function CartScreen({
  heading,
  productCartData,
  removeItemHandler,
  handleAddToCart,
  handleDecreaseCart,
  checkoutHandler,
}) {
  
  console.log("productCartData");
  console.log(productCartData);
  console.log("-----------------------");

  return (
    <>
      <Typography component="h4" variant="h5">
        {heading}
      </Typography>

      <Grid container spacing={1}>
        {/* <Grid item md={9} xs={12}> */}
        {/* <TableContainer
          style={{
            // width: "75%",
            display: "flex",
            // overflowX: "auto",
            flexDirection: "column",
            alignContent: "flex-start",
            // flexWrap: "wrap",
            // flexDirection: "row",
          }}

        > */}
        <Grid item md={9} xs={12}>
          <Paper className="container">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Image</TableCell>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Quantity</TableCell>
                  <TableCell align="right">Price</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {productCartData &&
                  productCartData?.map(item => (
                    <TableRow key={item.name}>
                      <TableCell>
                        <NextLink href={`/product/${item.name}`} passHref>
                          <Link>
                            <CardMedia
                              component="img"
                              // height="10"
                              style={{ height: "70px", width: "100px" }}
                              image={item.image_URL}
                              alt="green iguana"

                              // style={{ margin: "5px" }}
                            />
                            {/* <CardMedia
                            component="img"
                            height="14"
                            image={productDetail?.imgdata}
                            alt="green iguana"
                            style={{ margin: "5px" }}
                          /> */}
                            {/* <Image
                              src={item.imgdata}
                              alt={item.rname}
                              width={50}
                              height={50}
                            ></Image> */}
                          </Link>
                        </NextLink>
                      </TableCell>

                      <TableCell>
                        <NextLink
                          href={`/product_detail?product_name=${item.name}`}
                          passHref
                        >
                          <Link>
                            <Typography>{item.name}</Typography>
                          </Link>
                        </NextLink>
                      </TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          onClick={() => handleDecreaseCart(item)}
                        >
                          -
                        </Button>
                        <Typography className="count">{item.qty}</Typography>
                        <Button
                          variant="contained"
                          onClick={() => handleAddToCart(item)}
                        >
                          +
                        </Button>
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        <Button
                          variant="contained"
                          //  color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          x
                        </Button>
                      </TableCell>
                      <TableCell>
                        <Card>
                          <List>
                            <ListItem>
                              <ListItemText>
                                Sub Total 
                                 {item.qty}
                                item : $
                                {   item.qty * item.price
                                 
                                }
                              </ListItemText>
                            </ListItem>
                          </List>
                        </Card>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
          {/* </TableContainer> */}
        </Grid>

        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <ListItemText>
                  Total (
                  {productCartData &&
                    productCartData.reduce((a, c) => a + c.qty, 0)}{" "}
                  items) : $
                  {productCartData &&
                    productCartData.reduce((a, c) => a + c.qty * c.price, 0)}
                </ListItemText>
              </ListItem>
              <ListItem>
                <Button
                  onClick={checkoutHandler}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Check Out
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default withRouter(CartScreen);
