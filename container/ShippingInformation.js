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
import Divider from "@mui/material";
function ShippingInformation({
  checkoutHandler,
  shippementAddress,
  handleChange,
  checkoutHandler1,
}) {
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

  // React.useEffect(() => {
  //   // setButtonKey(buttonKey);
  // }, [buttonKey]);
  return (
    <>
      <CheckoutWizard activeStep={1} />
      <Grid container mt={5} sx={{ mx: "5rem" }}>
        {/* <Grid item md={2}></Grid> */}
        <Grid
          md={12}
          sm={12}
          item
          sx={{ display: "container", justifyContent: "center" }}
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
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
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
              onClick={checkoutHandler1}
              variant="outlined"
              // buttonKey={buttonKey}
              // href="/shipping"
              startIcon={<AddIcon />}
              // label=" Add Addresss"
            >
              {buttonText}
            </Button>
          </FormControl>
        </Grid>

        {buttonKey === 1 ? (
          <Grid item md={3} sm={3} mt={5}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Address Label :
              </FormLabel>

              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                // value={labelValue}
                onChange={handleChange}
              >
                {/* <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                >
                  <BusinessIcon/>
                  <FormControlLabel/> */}
                {/* <BusinessIcon /> */}
                {shippementAddress &&
                  shippementAddress.map((result) =>
                    result.address_default_billing === true ? (
                      <FormControlLabel
                        value={result.address_id}
                        control={<Radio />}
                        label={result.address}
                      />
                    ) : (
                      ""
                    )
                  )}
              </RadioGroup>

              <Divider />

              <Button
                onClick={checkoutHandler}
                variant="outlined"
                // href="/shipping_methods"
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
    </>
  );
}

export default ShippingInformation;
