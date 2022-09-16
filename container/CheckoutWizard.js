import { Grid, Step, StepLabel, Box, Stepper, Typography } from "@mui/material";
import React from "react";

import { useTranslation } from "react-i18next";
export default function CheckoutWizard({ activeStep = 0 }) {
  let { t, i18n } = useTranslation();

  return (
    <Grid

      sx={{ alignContent: "start", justifyContent: "start", mt: 5 }}
    >
      <Box sx={{ width: "100%", alignContent: "center", justifyContent: "center" }}>
        {/* <Grid item md={12} xs={12} sm={12}> */}
        <Stepper
          activeStep={activeStep}
        //alternativeLabel

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
