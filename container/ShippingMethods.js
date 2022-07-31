import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
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
import { useRouter } from "next/router";
import { RouteGuard } from "../RouterGuard";
import localStorage from "localStorage";

function ShippingMethods({
  classes,
  shipmentMethodData,
  checkoutHandler,
  handleChange,
  shippementData,
  userData,
  productPrice,
  shippingCharges,
  shippementLockerData
}) {
  let router = useRouter();
  const [radioCheck, setRadioCheck] = useState(false);

  return (
    <>
      <CheckoutWizard activeStep={3} />
      <Grid container mt={5} justifyContent={"center"}>
        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", p: 2 }}>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
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
                {/* </List> */}

                <List>
                  <ListItem>
                    <ListItemIcon>
                      <PhoneIcon />

                    </ListItemIcon>
                    {localStorage.getItem("mobileNumber") ? <ListItemText>{localStorage.getItem("mobileNumber")}</ListItemText> : <ListItemText>{"3215890184"}</ListItemText>}
                  </ListItem>
                </List>
                {userData.email ? (
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText>{userData.email}</ListItemText>
                    </ListItem>
                  </List>
                ) : (
                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <EmailIcon />
                      </ListItemIcon>
                      <ListItemText>{"test@gmail.com"}</ListItemText>
                    </ListItem>
                  </List>
                )}

                {/* <List> */}
                <ListItem>
                  <ListItemIcon>
                    <DomainAddOutlinedIcon />
                  </ListItemIcon>
                  {console.log(shippementLockerData)}
                  {shippementLockerData ?
                    <ListItemText>{shippementLockerData?.locker_address} </ListItemText> : <ListItemText>{shippementData?.address_label_name} {shippementData?.address}," ",{shippementData?.city},{shippementData?.state},
                      {shippementData?.country}</ListItemText>}
                </ListItem>
                {/* </List> */}
                {/* <List> */}
                {/* <ListItem>
                  <ListItemIcon>
                    <AddLocationAltOutlinedIcon />
                  </ListItemIcon>
                  <ListItemText>
                    
                  </ListItemText>
                </ListItem> */}
              </List>
            </Box>
            {/* <TabPanel value={value} index={2}>
              {merchantDetail?.city}
            </TabPanel> */}
          </Card>
        </Grid>

        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", p: 2 }}>
              <FormControl>
                <Typography variant="h6" style={{ fontWeight: "bold" }}>
                  Shipping Methods
                </Typography>

                <List>
                  <ListItem sx={{ display: "flex" }}>
                    <RadioGroup
                      // row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    // value={labelValue}
                    >
                      {shipmentMethodData &&
                        shipmentMethodData.map((result) => (
                          <FormControlLabel
                            key={result.shipping_method_id}
                            value={result.shipping_method_id}
                            control={
                              <Radio onChange={() => handleChange(result)} />
                            }
                            label={result.shipping_method_name}
                            onClick={() => setRadioCheck(true)}
                          />
                        ))}
                    </RadioGroup>
                  </ListItem>
                </List>
              </FormControl>
            </Box>
          </Card>
        </Grid>

        <Grid item md={9} xs={12}>
          <Card className={classes.section}>
            <Box sx={{ borderBottom: 1, borderColor: "divider", p: 2 }}>
              <Typography variant="h6" style={{ fontWeight: "bold" }}>
                Shipping Charges
              </Typography>
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
                      ? productPrice?.reduce((a, c) => a + c.qty * c.price, 0) +
                      shippingCharges
                      : productPrice?.reduce((a, c) => a + c.qty * c.price, 0)}
                  </ListItemText>
                </ListItem>
              </List>
              <Stack direction="row" spacing={2}>
                <Button
                  onClick={checkoutHandler}
                  variant="contained"
                  color="primary"
                  disabled={radioCheck ? "" : "disabled"}
                // startIcon={<AddIcon />}
                >
                  Continue to Place Order
                </Button>
                <Button
                  // fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => router.push("/shipping_information")}
                >
                  Back
                </Button>
              </Stack>
            </Box>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default ShippingMethods;
