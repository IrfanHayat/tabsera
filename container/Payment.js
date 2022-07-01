import React, { useContext, useEffect, useState } from "react";
import CheckoutWizard from "./CheckoutWizard";
import useStyles from "../utils/styles";
import {
  Button,
  FormControl,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";

export default function Payment({
  submitHandler,
  paymentMethod,
  setPaymentMethod,
  handleChange
}) {
  const classes = useStyles();

  return (
    <Grid container>
      <CheckoutWizard activeStep={4}></CheckoutWizard>
      <Grid item sx={{ margin: 5 }}>
        <form >
          <Typography component="h4" variant="h4">
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
         
          {paymentMethod && paymentMethod.map(result => (
            
            <FormControlLabel
              key={result.payment_method_id}
              value={result.payment_method_id}
              control={<Radio  onChange={()=>handleChange(result)}/>}
              label={result.parent_payment_method}
            />

            ))}
        
        </RadioGroup>
              </FormControl>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="button"
                variant="contained"
                color="primary"
                onClick={()=>submitHandler()}  
              >
                Continue
              </Button>
            </ListItem>
            <ListItem>
              <Button
                fullWidth
                type="button"
                variant="contained"
                onClick={() => router.push("/shipping")}
              >
                Back
              </Button>
            </ListItem>
          </List>
        </form>
      </Grid>
    </Grid>
  );
}
