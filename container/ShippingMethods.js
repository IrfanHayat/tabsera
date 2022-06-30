import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import CheckoutWizard from "../container/CheckoutWizard";
import AddIcon from "@mui/icons-material/Add";
import Card from "@mui/material/Card";

import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import DomainAddOutlinedIcon from "@mui/icons-material/DomainAddOutlined";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
function ShippingMethods({
  classes,
  shipmentMethodData,
  checkoutHandler,
  handleChange,
  shippementData,
  userData,
  productPrice,
  shippingCharges,
}) {
  return (
    <>
      <CheckoutWizard activeStep={3} />
      <Grid container mt={5} justifyContent={"center"}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", p: 2 }}>
              <Typography variant="h6" component="h2">
                Shipping Information
              </Typography>

              {/* {productDetail?.merchant_name} */}
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AccountCircleIcon />
                    {/* {userData.first_name} {userData.last_name} */}
                  </ListItemIcon>
                  <ListItemText>
                    {/* <AccountCircleIcon /> */}
                    {userData.first_name} {userData.last_name}
                  </ListItemText>
                </ListItem>
              </List>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <PhoneIcon />{" "}
                  </ListItemIcon>
                </ListItem>
              </List>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText>{userData.email}</ListItemText>
                </ListItem>
              </List>

              <List>
                <ListItem>
                  <ListItemIcon>
                    <DomainAddOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText> {shippementData?.address}</ListItemText>
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AddLocationAltOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {shippementData?.city},{shippementData?.state},
                    {shippementData?.country}
                  </ListItemText>
                </ListItem>
              </List>
            </Box>
            {/* <TabPanel value={value} index={2}>
              {merchantDetail?.city}
            </TabPanel> */}
          </Card>
        </Grid>

        <Grid item md={9} sm={12}>
          <Card className={classes.section}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                p: 2,
              }}
            >
              <FormControl>
                <Typography variant="h6" component="h2">
                  Shipping Methods
                </Typography>

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

                  {shipmentMethodData &&
                    shipmentMethodData.map((result) => (
                      <FormControlLabel
                        key={result.shipping_method_id}
                        value={result.shipping_method_id}
                        control={
                          <Radio onChange={() => handleChange(result)} />
                        }
                        label={result.shipping_method_name}
                      />
                    ))}
                </RadioGroup>
              </FormControl>
            </Box>
          </Card>
        </Grid>

        <Grid item md={9} sm={12}>
          <Card className={classes.section}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                p: 2,
              }}
            >
              <Typography variant="h6">Shipping Charges</Typography>
              {/* <Box sx={{ display: "inline", margin: 5 }}> */}
              <List>
                <ListItem>
                  <ListItemText>
                    Subtotal{" "}
                    {productPrice &&
                      productPrice.reduce((a, c) => a + c.qty * c.price, 0)}
                  </ListItemText>
                  {/* <ListItemText>$ 0.0</ListItemText> */}
                </ListItem>
                <ListItem>
                  <ListItemText>Shipping Cost {shippingCharges}</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Subtotal{" "}
                    {productPrice && shippingCharges
                      ? productPrice.reduce((a, c) => a + c.qty * c.price, 0) +
                        shippingCharges
                      : productPrice.reduce((a, c) => a + c.qty * c.price, 0)}
                  </ListItemText>
                </ListItem>
              </List>
              <Button
                onClick={checkoutHandler}
                variant="outlined"
                // startIcon={<AddIcon />}
              >
                Proced to Payment
              </Button>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default ShippingMethods;
