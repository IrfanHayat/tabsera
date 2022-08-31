import React from "react";
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
  CardContent,
  CardActions,
  Divider,
} from "@mui/material";
import { RouteGuard } from "../RouterGuard";
function CalculateBill({ productPrice, checkoutHandler }) {
  return (
    <Card item md={12} xs={12}>
      {/* <Card> */}
      <CardContent>
        <Typography
          component="h6"
          variant="h6"
          // m={1}
          p={1}
          // style={{ fontWeight: "bold" }}
          // align="center"
        >
          {" "}
          Shopping Cart
        </Typography>
        <Typography
          component="h5"
          variant="h5"
          // m={1}
          p={1}
          style={{ fontWeight: "bold" }}
          // align="center"
        >
          {" "}
          Order Summary
        </Typography>
        <Divider />
        <Grid container>
          {/* <ListItem> */}
          {/* <ListItemText>
            Total (
            {productCartData &&
              productCartData.reduce((a, c) => a + c.qty, 0)}{" "}
            items) : $
            {productCartData &&
              productCartData.reduce((a, c) => a + c.qty * c.price, 0)}
          </ListItemText>
        </ListItem> */}

          <ListItem>
            <ListItemText>Total Items</ListItemText>

            <ListItemText>
              <Typography
                component="h5"
                variant="h5"
                // m={1}
                style={{ fontWeight: "bold" }}
                // align="center"
              >
                {productPrice ? (
                  productPrice?.reduce((a, c) => a + c.qty, 0)
                ) : (
                  <></>
                )}
              </Typography>
            </ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText> Total Price </ListItemText>
            <ListItemText>
              {" "}
              <Typography
                component="h5"
                variant="h5"
                // m={1}
                sx={{ color: "warning.main" }}
                style={{ fontWeight: "bold" }}
                // align="center"
              >
                Rs.
                {productPrice ? (
                  productPrice.reduce((a, c) => a + c.qty * c.price, 0)
                ) : (
                  <></>
                )}
              </Typography>
            </ListItemText>
          </ListItem>
        </Grid>
      </CardContent>
      <CardActions>
        {" "}
        <RouteGuard>
          <Button
            onClick={checkoutHandler}
            variant="contained"
            color="primary"
            fullWidth
          >
            Proceed To Check Out
          </Button>
        </RouteGuard>
      </CardActions>
      {/* </Card> */}
    </Card>
  );
}

export default CalculateBill;
