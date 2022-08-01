import React from "react";
import CheckoutWizard from "../container/CheckoutWizard";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
const Congratulations = () => {
  return (
    <>
      <CheckoutWizard activeStep={6} />
      <Box
        direction="column"
        sx={{
          display: "flex",

          width: "100%",
          maxWidth: 500,
          m: "auto",
          //   height: "100vh",
          minHeight: "50vh",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          direction="column"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <Box
            variant="h1"
            component="h1"
            sx={{
              display: "flex",
              color: "success.main",
            }}
          >
            Congratulations...!!
          </Box>

          <Box sx={{ color: "text.primary" }}>
            Your Order has been Placed Successfully
          </Box>
        </Stack>
      </Box>
    </>
  );
};

export default Congratulations;
