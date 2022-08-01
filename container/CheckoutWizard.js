import { Grid, Step, StepLabel, Stepper, Typography } from "@mui/material";
import React from "react";
import useStyles from "../utils/styles";
export default function CheckoutWizard({ activeStep = 0 }) {
  const classes = useStyles();
  return (
    <Grid container maxWidth="xl">
      <Grid item md={12} xs={6} sm={12}>
        <Stepper
          activeStep={activeStep}
          alternativeLabel
          sx={{ mt: 5, width: "100%" }}
        >
          {[
            // "Login",
            "Shipping Information",
            "Place Order",
            "Shipping Method",
            "Order Summary ",
            "Payment Method",
            "Order Success",
          ].map((step) => (
            <Step
              key={step}
              sx={{
                width: "27%",
              }}
            >
              <StepLabel>
                <Typography style={{ fontSize: 12 }}>{step}</Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>
      </Grid>
    </Grid>
  );
}
