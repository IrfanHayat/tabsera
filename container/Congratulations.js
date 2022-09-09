import React from "react";
import CheckoutWizard from "../container/CheckoutWizard";
import { Box } from "@mui/system";
import { Grid, Typography } from "@mui/material";
import Stack from "@mui/material/Stack";
import styles from "../styles/congratulations.module.css";
const Congratulations = () => {
  return (
    <>
      <CheckoutWizard activeStep={4} />
      <Box className={styles.congratsMain}>
        <Box
          className={styles.congrats}
          // direction="column"
          sx={
            {
              // display: "flex",
              // width: "100%",
              // maxWidth: 500,
              // m: "auto",
              // //   height: "100vh",
              // minHeight: "50vh",
              // justifyContent: "center",
              // alignItems: "center",
            }
          }
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
                color: "primary.main",
              }}
            >
              Thank You for Your Purchase
            </Box>

            {/* <Box sx={{ color: "text.primary" }}>
            Your Order has been Placed Successfully
          </Box> */}

            <Box sx={{ color: "text.primary" }}>
              Your Order Number is 98980989089
            </Box>

            <Box sx={{ color: "text.primary" }}>
              Please have This Amount Ready on Delivery Date
            </Box>
            <Box
              variant="h1"
              component="h1"
              sx={{
                display: "flex",
                color: "primary.main",
              }}
            >
              Rs. 1000
            </Box>
          </Stack>
        </Box>
        <Box> Your Expected Delivery Dates</Box>
        <Box> Your Expected Delivery Dates</Box>
      </Box>
    </>
  );
};

export default Congratulations;
