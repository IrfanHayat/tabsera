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
  productPrice
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
       
        <Grid item md={9} xs={12}>
          <Paper className="container">
            <Table>
              <TableHead>
                
              </TableHead>
              <TableBody>
                {productCartData &&
                  productCartData.map((item) => (
                    <TableRow key={item.name}>
                      <TableCell>
                        <NextLink href={`/product/${item?.name}`} passHref>
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
                          {/* <Link> */}
                          <Typography
                            variant="body"
                            style={{ textDecoration: "none " }}
                          >
                            {item.name}
                          </Typography>
                          {/* </Link> */}
                        </NextLink>
                      </TableCell>
                      <TableCell align="center">
                        {/* <Button
                          variant="contained"
                          onClick={() => handleDecreaseCart(item)}
                        >
                          -
                        </Button> */}
                        <IconButton
                          onClick={() => handleDecreaseCart(item)}
                          aria-label="delete item"
                          size="large"
                          variant="contained"
                          sx={{ color: "text.secondary" }}
                          // onClick={() => removeItemHandler(item)}
                        >
                          <IndeterminateCheckBoxOutlinedIcon />
                        </IconButton>
                        <Typography className="count" align="center">
                          {item.qty}
                        </Typography>

                        <IconButton
                          aria-label="delete item"
                          size="large"
                          variant="contained"
                          sx={{ color: "text.secondary" }}
                          onClick={() => handleAddToCart(item)}
                        >
                          <AddBoxOutlinedIcon />
                        </IconButton>

                        {/* <Button
                          variant="contained"
                          onClick={() => handleAddToCart(item)}
                        >
                          +
                        </Button> */}
                      </TableCell>
                      <TableCell align="right">${item.price}</TableCell>
                      <TableCell align="right">
                        {/* <Button
                          variant="contained"
                          //  color="secondary"
                          onClick={() => removeItemHandler(item)}
                        >
                          x
                        </Button> */}

                        <IconButton
                          aria-label="delete"
                          size="large"
                          variant="contained"
                          color="error"
                          onClick={() => removeItemHandler(item)}
                        >
                          <DeleteIcon fontSize="inherit" />
                        </IconButton>
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Paper>
          {/* </TableContainer> */}
        </Grid>
       

       
      </Grid>
      
      
    </>
  );
}

export default withRouter(CartScreen);
