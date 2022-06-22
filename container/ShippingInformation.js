import { Button, Divider, Grid, Typography } from "@mui/material";
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
  const [buttonKey, setButtonKey] = React.useState(1);
  let buttonText;

  if (buttonKey === 1) {
    buttonText = "Address";
  } else {
    buttonText = "Locker";
  }
  // const handleChange = (event) => {
  //   setButtonKey(event.target.value);
  // };

  console.log(buttonKey);
  // React.useEffect(() => {
  //   // setButtonKey(buttonKey);
  // }, [buttonKey]);
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
              onClick={() => setButtonKey(1)}
              value="address"
              // buttonKey={1}
              // onChange={handleChange}
              control={<Radio />}
              label="Address"
            />
            <FormControlLabel
              // buttonKey={2}
              onClick={() => setButtonKey(2)}
              // onClick={setButtonKey(2)}
              value="lockers"
              // onChange={handleChange}
              control={<Radio />}
              label="Locker"
            />
          </RadioGroup>
          <Button
            onClick={checkoutHandler}
            variant="outlined"
            // buttonKey={buttonKey}
            startIcon={<AddIcon />}
            // label=" Add Addresss"
          >
            {buttonText}
          </Button>
        </FormControl>
      </Grid>

      {buttonKey === 1 ? (
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
            <Divider />

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
      ) : (
        ""
      )}
    </Grid>
  );
}

export default ShippingInformation;
