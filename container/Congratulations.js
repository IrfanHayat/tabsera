import React from "react";
import CheckoutWizard from "../container/CheckoutWizard";
import { Box } from "@mui/system";
import { Grid, Typography, Divider } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Stack from "@mui/material/Stack";
import styles from "../styles/congratulations.module.css";
import { useRouter } from "next/router";
import { Button } from "antd";
import Currency from "./Currency/currency";
const Congratulations = ({ orderNo, amount, shipCharges, shipCode, intelParcelMessage, shipParcel }) => {
  let router = useRouter();

  return (
    <>
      <CheckoutWizard activeStep={4} />
      <Box className={styles.congratsMain}>
        <Box className={styles.congrats}>
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
              Thank You for Your Purchase..
            </Box>

            {/* <Box sx={{ color: "text.primary" }}>
            Your Order has been Placed Successfully
          </Box> */}

            <Box>
              Your Order Number is{" "}
              <Typography
                sx={{
                  color: "text.primary",
                  fontWeight: "bold",
                  display: "inline",
                }}
              >
                <Typography sx={{ color: "primary.main" }}>
                  {orderNo}
                </Typography>
                <Typography>
                  {intelParcelMessage ? intelParcelMessage : <></>}
                  {shipCode ? <Box>Tracking Number<Typography sx={{ color: "primary.main" }}>{shipCode}</Typography></Box> : <>...........</>}
                </Typography>
                {/* 
                <Typography>
                  {shipParcel ? <>Shipping Parcel:{shipParcel}</> : <></>}
                </Typography> */}
              </Typography>
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
              <Currency amount={amount}></Currency>
            </Box>
          </Stack>
          <Box className={styles.orderdetails}>
            {" "}
            Your Expected Delivery Dates
            <Box className={styles.estimateTime}>Estimated Time : </Box>
          </Box>
          {/* <Box className={styles.orderSumamry}> */}
          <Accordion className={styles.orderSumamry}>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              {" "}
              <Typography variant="subtitle1"> Order Summary</Typography>
            </AccordionSummary>{" "}
            <AccordionDetails>
              <Box className={styles.amount}>
                <Typography> Subtotal</Typography>
                <Typography>{amount}</Typography>
              </Box>
              <Box className={styles.amount}>
                <Typography> Shipping Fee</Typography>
                <Typography>{shipCharges}</Typography>
              </Box>
              <Divider />
              <Box className={styles.total}>
                <Typography variant="subtitle2"> Total</Typography>
                <Typography>{parseInt(amount) + parseInt(shipCharges)}</Typography>
              </Box>
            </AccordionDetails>
          </Accordion>{" "}
          {/* </Box> */}
          <Button
            onClick={() => router.push("/")}
            className={styles.continueShoppingbtn}
          >
            Continue Shopping
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default Congratulations;
