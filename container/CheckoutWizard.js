import { Grid, Step, StepLabel, Stepper } from "@mui/material";
import React from "react";
import useStyles from "../utils/styles";
export default function CheckoutWizard({ activeStep = 0 }) {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item md={12} xs={6} sm={12}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ mt: 5, width: "100%" }}
        >
          {[
            "Login",
            "Shipping Information",
            "Shipping Address",
            "Shipping Methods",
            "Payment Method",
            "Place Order",
          ].map((step) => (
            <Step key={step} sx={{ width: "35%" }}>
              <StepLabel>{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
  );
}
