import {
  Button,
  Divider,
  Grid,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CheckoutWizard from "../container/CheckoutWizard";
import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useRouter } from "next/router";
import { useState } from "react";
import List from "@mui/material/List";
//import Divider from "@mui/material";
function ShippingInformation({
  checkoutHandler,
  shippementAddress,
  handleChange,
  checkoutHandler1,
}) {
  const [buttonKey, setButtonKey] = React.useState(1);
  let router = useRouter();

  let buttonText;

  if (buttonKey === 1) {
    buttonText = "Address";
  } else {
    buttonText = "Locker";
  }

  const [radioCheck, setRadioCheck] = useState(false);
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
              variant="contained"
              color="primary"
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
              <FormLabel style={{ fontWeight: "bold" }}>
                Shipping Addresses
              </FormLabel>

              <List>
                <ListItem sx={{ display: "flex", p: 1, m: 1 }}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    // value={labelValue}
                    onChange={handleChange}
                  >
                    {shippementAddress &&
                      shippementAddress.map((result) =>
                        result.address_default_billing === false ? (
                          <FormControlLabel
                            value={result.address_id}
                            control={<Radio />}
                            label={result.address}
                            onClick={() => setRadioCheck(true)}
                          />
                        ) : (
                          ""
                        )
                      )}
                  </RadioGroup>
                </ListItem>
              </List>
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={checkoutHandler}
                  variant="contained"
                  color="primary"
                  disabled={radioCheck ? "" : "disabled"}
                  // href="/shipping_methods"
                  // startIcon={<AddIcon />}
                >
                  Continue
                </Button>

                <Button
                  // fullWidth
                  variant="contained"
                  color="error"
                  onClick={() =>
                    router.push(
                      `/product_detail?productId=${localStorage.getItem(
                        "productId"
                      )}`
                    )
                  }
                >
                  Back
                </Button>
              </Stack>
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
