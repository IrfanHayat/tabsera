import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "./CheckoutWizard";
import useStyles from "../utils/styles";
import { useRouter } from "next/router";

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

export default function Payment({
  submitHandler,
  paymentMethod,
  setPaymentMethod,
  handleChange,
}) {
  const classes = useStyles();
  let router = useRouter();

  return (
    <Grid container>
      <CheckoutWizard activeStep={5}></CheckoutWizard>
      <Grid item sx={{ margin: 5 }}>
        <form onSubmit={submitHandler}>
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
                      <FormControlLabel
                        key={result.payment_method_id}
                        value={result.payment_method_id}
                        control={
                          <Radio onChange={() => handleChange(result)} />
                        }
                        label={result.parent_payment_method}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
            </ListItem>
          </List>
          <Stack direction="row" spacing={2}>
            {/* <ListItem> */}
            <Button
              // fullWidth
              type="submit"
              variant="contained"
              color="primary"
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
    </Grid>
  );
}
