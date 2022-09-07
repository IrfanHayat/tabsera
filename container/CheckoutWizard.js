import { Grid, Step, StepLabel, Box, Stepper, Typography } from "@mui/material";
import React from "react";
import useStyles from "../utils/styles";
export default function CheckoutWizard({ activeStep = 0 }) {
  const classes = useStyles();
  return (
    <Box sx={{ width: "100%" }}>
      {/* <Grid item md={12} xs={12} sm={12}> */}
      <Stepper
        activeStep={activeStep}
        // alternativeLabel
        // nonLinear
        sx={{
          mt: 5,
          // maxWidth: "100%",
          // mx: -12,
        }}
      >
        {[
          "Checkout",
          "Shipping Info",
          "Review Order",
          "Pay",
          "Order Complete",
        ].map((step) => (
          <Step
            key={step}
            sx={{
              width: "100%",
            }}
          >
            <StepLabel>{step}</StepLabel>
          </Step>
        ))}
      </Stepper>
      {/* </Grid> */}
    </Box>
  );
}
