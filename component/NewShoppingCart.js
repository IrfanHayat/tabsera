import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
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
} from "@mui/material";
import NextLink from "next/link";

const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  //   ...theme.typography.body2,
  margin: theme.spacing(1),
  padding: theme.spacing(1),
  textAlign: "center",
  //   color: theme.palette.text.secondary,
}));

export default function VariableWidthGrid({
  productCartData,
  removeItemHandler,
  handleAddToCart,
  handleDecreaseCart,
  checkoutHandler,
}) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography component="h4" variant="h5">
        Shopping Cart
      </Typography>

      {/* <Grid container spacing={1} style={{ textAlign: "center" }}>
        <Grid item xs={3}>
          <Typography> Image </Typography>
        </Grid>
        <Grid item>
          <Typography> Name </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography> Quantity </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography> Price</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography> Action</Typography>
        </Grid> */}
      {/* </Grid> */}

      {productCartData?.map((item) => (
        <Grid
          container
          spacing={1}
          key={item._id}
          style={{ textAlign: "center" }}
        >
          <Grid item xs="auto" style={{ marginTop: "5px" }}>
            {/* <Item> */}
            <NextLink href={`/product/${item.slug}`} passHref>
              <Link>
                <CardMedia
                  component="img"
                  // height="10"
                  style={{ height: "100px", width: "150px" }}
                  image={item.productImage}
                  alt="green iguana"
                />
              </Link>
            </NextLink>
            {/* </Item> */}
          </Grid>

          <Grid item xs={3}>
            {/* <Item> */}
            <NextLink href={`/product/${item.slug}`} passHref>
              <Link>
                <Typography>{item.productName}</Typography>
              </Link>
            </NextLink>
            {/* </Item> */}
          </Grid>

          <Grid item xs={2}>
            {/* <Item> */}
            <Button
              variant="contained"
              onClick={() => handleDecreaseCart(item)}
            >
              -
            </Button>
            <Typography className="count">{item.cartQuantity}</Typography>
            <Button variant="contained" onClick={() => handleAddToCart(item)}>
              +
            </Button>
            {/* </Item> */}
          </Grid>

          <Grid item xs={2}>
            <Typography>$  {item.productCost}</Typography>
            {/* <Item> */}
            {/* </Item> */}
          </Grid>

          <Grid item xs={2}>
            {/* <Item> */}
            <Button
              variant="contained"
              //  color="secondary"
              onClick={() => removeItemHandler(item)}
            >
              x
            </Button>
            {/* </Item> */}
          </Grid>
          <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <ListItemText>
                  Subtotal (
                  {productCartData.reduce((a, c) => a + c.cartQuantity, 0)}{" "}
                  items) : $
                  {productCartData.reduce(
                    (a, c) => a + c.cartQuantity * c.productCost,
                    0
                  )}
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
          {/* <Grid item xs={1}>
            <Item>${item.price}</Item>
          </Grid> */}
        </Grid>
      ))}
      
      
    </Box>
  );
}
