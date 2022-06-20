import {
  Button,
  List,
  ListItem,
  ListItemText,
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
function ShippingMethods({ checkoutHandler }) {
  return (
    <Box>
      <CheckoutWizard activeStep={3} />

      <Box sx={{ display: "container", margin: 5 }}>
        <FormControl>
          <FormLabel id="demo-radio-buttons-group-label">
            Shipping Methods
          </FormLabel>
          <RadioGroup
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            <FormControlLabel
              value="address1"
              control={<Radio />}
              label="Overnight"
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
            // startIcon={<AddIcon />}
          >
            Continue
          </Button>
          <Button
            // onClick={checkoutHandler}
            variant="outlined"
            // startIcon={<AddIcon />}
            href="/shipping_information"
          >
            Back
          </Button>
        </FormControl>
      </Box>
      <Box sx={{ display: "container", margin: 5 }}>
        <Typography variant="h5">Shipping Charges</Typography>
        <Box sx={{ display: "inline", margin: 5 }}>
          <List>
            <ListItem>
              <ListItemText>Subtotal</ListItemText>
              {/* <ListItemText>$ 0.0</ListItemText> */}
            </ListItem>
            <ListItem>
              <ListItemText>Shipping Cost</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Subtotal</ListItemText>
            </ListItem>
          </List>
          <Button
            // onClick={checkoutHandler}
            variant="outlined"
            // startIcon={<AddIcon />}
            href="/payment"
          >
            Proced to Payment
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ShippingMethods;
