import { Grid, Step, StepLabel, Box, Stepper, Typography } from "@mui/material";
import React from "react";
import useStyles from "../utils/styles";
import { useTranslation } from "react-i18next";
export default function CheckoutWizard({ activeStep = 0 }) {
  let { t, i18n } = useTranslation();
  const classes = useStyles();
  return (
    <Grid
      container
      sx={{ alignContent: "center", justifyContent: "center", mt: 5, mx: 5 }}
    >
      <Box sx={{ width: "100%" }}>
        {/* <Grid item md={12} xs={12} sm={12}> */}
        <Stepper
          activeStep={activeStep}
        // alternativeLabel
        // nonLinear
        // sx={{
        //   m: 5,
        //   // maxWidth: "100%",
        //   // mx: -12,
        // }}
        >
          {[
            t('stepper.checkout'),
            t('stepper.shippingInfo'),
            t('stepper.reviewOrder'),
            t('stepper.pay'),
            t('stepper.orderComplete'),
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
    </Grid>
  );
}
