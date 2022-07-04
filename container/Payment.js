import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "./CheckoutWizard";
import useStyles from "../utils/styles";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Stack,
  Typography,
} from "@mui/material";
import Image from "next/image";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function Payment({
  submitHandler,
  paymentMethod,
  setPaymentMethod,
  handleChange,
  cartTotalAmount
}) {
  const classes = useStyles();
  let router = useRouter();
  const [openBar, setOpenBar] = React.useState(false);
  // const [loginSccess, setLginSccess] = React.useState(false);

  const handleClickBar = () => {
    setOpenBar(true);
  };

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBar(false);
  };
  return (
    <Grid container>
      <CheckoutWizard activeStep={5}></CheckoutWizard>
      <Grid item sx={{ margin: 5 }}>
        <form>
          <Typography component="h4" variant="h6">
            Payment Method
          </Typography>
          <List>
            <ListItem>
              <FormControl component="fieldset">
                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  // value={labelValue}
                >
                  {/* <FormControlLabel
            value="female"
            control={<Radio />}
            label="Female"
          >
            <BusinessIcon/>
            <FormControlLabel/> */}
                  {/* <BusinessIcon /> */}

                  {paymentMethod &&
                    paymentMethod.map((result) => (
                      <><Image
                        // className={cx(styles.media, mediaStyles.root)}
                        src={result?.payment_method_icon}
                        onClick={(e) => viewCategory(product.category_id)}
                        alt="shirt"
                        width={45}
                        height={20}
                      ></Image><FormControlLabel
                          key={result.payment_method_id}
                          value={result.payment_method_id}
                          control={<Radio onChange={() => handleChange(result)} ></Radio>}
                          label={result.parent_payment_method} /></>
                    ))}
                </RadioGroup>
              </FormControl>
            </ListItem>
          </List>
          <Stack direction="row" spacing={2}>
            {/* <ListItem> */}
            <Button
              // fullWidth
              type="button"
              variant="contained"
              color="primary"
              onClick={()=>submitHandler(cartTotalAmount)}
            >
              Continue
            </Button>
            {/* </ListItem>/ */}
            {/* <ListItem> */}
            <Button
              // fullWidth
              type="button"
              color="error"
              variant="contained"
              onClick={() => router.push("/shipping")}
            >
              Back
            </Button>
          </Stack>
          {/* </ListItem> */}
        </form>
      </Grid>
      <Snackbar open={openBar} autoHideDuration={6000} onClose={handleCloseBar}>
        <Alert
          onClose={handleCloseBar}
          severity="success"
          sx={{ width: "100%" }}
        >
          Payment SuccessFully!
        </Alert>
      </Snackbar>
    </Grid>
  );
}
