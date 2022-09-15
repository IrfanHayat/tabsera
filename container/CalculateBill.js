import React from "react";
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
import Currency from "./Currency/currency";
function CalculateBill({ productPrice, checkoutHandler }) {
  console.log(productPrice);
  let { t, i18n } = useTranslation();
  return (
    <Grid sx={{ bgcolor: "background.paper" }} item md={12} xs={12}>
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
          {t('checkoutCart.labels.Shopping Cart')}
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
          {t('checkoutCart.labels.Order Summary')}
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
            <ListItemText>{t('checkoutCart.labels.Total Items')}</ListItemText>

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
            <ListItemText> {t('checkoutCart.labels.Total Price')} </ListItemText>
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
                <Currency amount={productPrice ? (
                  productPrice.reduce((a, c) => a + c.qty * c.price, 0)
                ) : (
                  <></>
                )}></Currency>

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
            {t('checkoutCart.buttons.checkout')}
          </Button>
        </RouteGuard>
      </CardActions>
      {/* </Card> */}
    </Grid>
  );
}

export default CalculateBill;
