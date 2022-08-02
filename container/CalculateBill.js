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
} from "@mui/material";
import { RouteGuard } from "../RouterGuard";
function CalculateBill({ productPrice, checkoutHandler }) {
  return (
    <Grid item md={12} xs={12} sx={{ mt: 3, pt: 1, bgcolor: "white" }}>
      {/* <Card> */}
      <Typography
        component="h5"
        variant="h5"
        style={{ fontWeight: "bold" }}
        align="center"
      >
        {" "}
        Order Summary
      </Typography>

      <List>
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
          <ListItemText>Total Items </ListItemText>

          <ListItemText>
            {productPrice && productPrice.reduce((a, c) => a + c.qty, 0)}{" "}
          </ListItemText>
        </ListItem>

        <ListItem>
          <ListItemText> Total Price </ListItemText>
          <ListItemText>
            {/* Total Price = $ */}$
            {productPrice &&
              productPrice.reduce((a, c) => a + c.qty * c.price, 0)}
          </ListItemText>
        </ListItem>

        <ListItem>
          <RouteGuard>
            <Button
              onClick={checkoutHandler}
              variant="contained"
              color="primary"
              fullWidth
            >
              Check Out
            </Button>
          </RouteGuard>
        </ListItem>
      </List>
      {/* </Card> */}
    </Grid>
  );
}

export default CalculateBill;
