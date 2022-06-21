import { Button, Grid, Typography } from "@mui/material";
import React from "react";
import CheckoutWizard from "../container/CheckoutWizard";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
function ShippingInformation({ checkoutHandler }) {
  return (
    <Grid container>
      <CheckoutWizard activeStep={1} />
      {/* <Grid item md={2}></Grid> */}
      <Grid
        md={12}
        sm={12}
        item
        sx={{ display: "container", justifyContent: "center", margin: 5 }}
      >
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="address"
              control={<Radio />}
              label="Address"
            />
            <FormControlLabel
              value="lockers"
              control={<Radio />}
              label="Locker"
            />
          </RadioGroup>
          <Button
            onClick={checkoutHandler}
            variant="outlined"
            startIcon={<AddIcon />}
          >
            Add Addresss
          </Button>
        </FormControl>
      </Grid>

      <Grid item md={12} sm={12} sx={{ margin: 5 }}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Saved Addresses
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="address1"
              control={<Radio />}
              label="Address1"
            />
            {/* <FormControlLabel
              value="lockers"
              control={<Radio />}
              label="Locker"
            /> */}
          </RadioGroup>
          <Button
            // onClick={checkoutHandler}
            variant="outlined"
            href="/shipping_methods"
            // startIcon={<AddIcon />}
          >
            Continue
          </Button>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default ShippingInformation;
