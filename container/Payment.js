import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "./CheckoutWizard";
import useStyles from "../utils/styles";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export default function Payment({
  submitHandler,
  paymentMethod,
  setPaymentMethod,
}) {
  const classes = useStyles();

  return (
    <Grid container>
      <CheckoutWizard activeStep={5}></CheckoutWizard>
      <Grid item sx={{ margin: 5 }}>
        <form onSubmit={submitHandler}>
          <Typography component="h4" variant="h4">
            Payment Method
          </Typography>
          <List>
            <ListItem>
              <FormControl component="fieldset">
                <RadioGroup
                  aria-label="Payment Method"
                  name="paymentMethod"
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <FormControlLabel
                    label="PayPal"
                    value="PayPal"
                    control={<Radio />}
                  ></FormControlLabel>
                  <FormControlLabel
                    label="Stripe"
                    value="Stripe"
                    control={<Radio />}
                  ></FormControlLabel>
                  <FormControlLabel
                    label="Cash"
                    value="Cash"
                    control={<Radio />}
                  ></FormControlLabel>
                </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="submit"
                variant="contained"
                color="primary"
              >
                Continue
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="button"
                variant="contained"
                onClick={() => router.push("/shipping")}
              >
                Back
              </Button>
            </ListItem>
          </List>
        </form>
      </Grid>
    </Grid>
  );
}
