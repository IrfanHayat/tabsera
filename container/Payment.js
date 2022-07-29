import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "./CheckoutWizard";
import useStyles from "../utils/styles";
import { useRouter } from "next/router";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import {
  Box,
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
  cartTotalAmount,
  handleCloseBar,
  openBar,
  status,
}) {
  const classes = useStyles();
  let router = useRouter();

  // const [loginSccess, setLginSccess] = React.useState(false);
  const [radioCheck, setRadioCheck] = useState(false);

  return (
    <Grid container>
      <CheckoutWizard activeStep={5}></CheckoutWizard>
      <Grid item sx={{ margin: 5 }}>
        <form>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Payment Method
          </Typography>
          <List>
            <ListItem>
              <FormControl component="fieldset">
                <RadioGroup
                  // row
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
                      <Box sx={{ display: "flex", p: 2 }}>
                        <Image
                          // className={cx(styles.media, mediaStyles.root)}
                          src={result?.payment_method_icon}
                          onClick={(e) => viewCategory(product.category_id)}
                          alt="shirt"
                          width={45}
                          height={20}
                        ></Image>
                        <FormControlLabel
                          key={result.payment_method_id}
                          value={result.payment_method_id}
                          control={
                            <Radio
                              onChange={() => handleChange(result)}
                            ></Radio>
                          }
                          label={result.parent_payment_method}
                          sx={{ ml: 1 }}
                          onClick={() => setRadioCheck(true)}
                        />
                      </Box>
                    ))}
                </RadioGroup>
              </FormControl>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <Stack direction="row" spacing={2}>
                {/* <ListItem> */}
                <Button
                  // fullWidth
                  type="button"
                  variant="contained"
                  color="primary"
                  onClick={() => submitHandler(cartTotalAmount)}
                  disabled={radioCheck ? "" : "disabled"}
                >
                  Continue
                </Button>
                {/* </ListItem>/ */}
                {/* <ListItem> */}
              </Stack>
            </ListItem>
          </List>
          {/* </ListItem> */}
        </form>
      </Grid>
      {console.log(status)}
      {status?.resultCode === 5000 ? (
        <Snackbar
          open={openBar}
          autoHideDuration={2000}
          onClose={handleCloseBar}
          anchorOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
        >
          <Alert
            onClose={handleCloseBar}
            severity="error"
            sx={{ width: "100%" }}
          >
            {status?.message}
          </Alert>
        </Snackbar>
      ) : (
        <Snackbar
          open={openBar}
          autoHideDuration={6000}
          onClose={handleCloseBar}
          anchorOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
        >
          <Alert
            onClose={handleCloseBar}
            severity="success"
            sx={{ width: "100%" }}
          >
            {status?.message}
          </Alert>
        </Snackbar>
      )}
    </Grid>
  );
}
