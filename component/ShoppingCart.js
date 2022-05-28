import React, { useContext } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
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
  Select,
  MenuItem,
  Button,
  Card,
  List,
  ListItem,
} from '@mui/material';

import { withRouter} from 'next/router';


function CartScreen({productCartData,removeItemHandler,handleAddToCart,handleDecreaseCart}) {
  return (
    <>
      <Typography component="h4" variant="h4">
        Shopping Cart
      </Typography>
        <Grid container spacing={1}>
          <Grid item md={9} xs={12}>
            <TableContainer>
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
                  {productCartData?.map((item) => (
                    <TableRow key={item._id}>
                      <TableCell>
                        <NextLink href={`/product/${item.slug}`} passHref>
                          <Link>
                            <Image
                              src={item.imgdata}
                              alt={item.rname}
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
                      <Button
                          variant="contained" onClick={() => handleDecreaseCart(item)}>
                      -
                    </Button>
                    <div className="count">{item.cartQuantity}</div>
                    <Button
                          variant="contained" onClick={() => handleAddToCart(item)}>+</Button>
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
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid item md={3} xs={12}>
            <Card>
              <List>
                <ListItem>
                  <Typography variant="h2">
                      Subtotal ({productCartData.reduce((a, c) => a + c.cartQuantity, 0)}{' '}
                    items) : $
                    {productCartData.reduce((a, c) => a + c.cartQuantity * c.price, 0)} 
                  </Typography>
                </ListItem>
                <ListItem>
                  <Button
                    // onClick={checkoutHandler}
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
