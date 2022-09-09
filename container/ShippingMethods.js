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
import Image from "next/image";
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
import { useTranslation } from "react-i18next";

function ShippingMethods({
  classes,
  shipmentMethodData,
  checkoutHandler,
  handleChange,
  shippementData,
  userData,
  productPrice,
  shippingCharges,
  shippementLockerData,
}) {
  let router = useRouter();
  const [radioCheck, setRadioCheck] = useState(false);
  let { t, i18n } = useTranslation();

  return (
    <>
      <Grid container justifyContent={"center"}>
        <Grid
          item
          md={12}
          xs={12}
          sx={{ bgcolor: "background.paper", mt: 0.2 }}
        >
          <Box sx={{ borderBottom: 1, borderColor: "divider", p: 2 }}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {t('shippingInfo.ShippingAdress.label.shippingInformation')}
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

              {/* <List> */}
              <ListItem>
                <ListItemIcon>
                  <PhoneIcon />
                </ListItemIcon>
                {localStorage.getItem("mobileNumber") ? (
                  <ListItemText>
                    {localStorage.getItem("mobileNumber")}
                  </ListItemText>
                ) : (
                  <ListItemText>{"3215890184"}</ListItemText>
                )}
              </ListItem>
              {/* </List> */}
              {userData.email ? (
                // <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText>{userData.email}</ListItemText>
                </ListItem>
              ) : (
                // </List>
                // <List>
                <ListItem>
                  <ListItemIcon>
                    <EmailIcon />
                  </ListItemIcon>
                  <ListItemText>{"test@gmail.com"}</ListItemText>
                </ListItem>
                // </List>
              )}

              {/* <List> */}
              <ListItem>
                <ListItemIcon>
                  <DomainAddOutlinedIcon />
                </ListItemIcon>
                {console.log(shippementLockerData)}
                {shippementLockerData ? (
                  <ListItemText>
                    {shippementLockerData?.locker_address}{" "}
                  </ListItemText>
                ) : (
                  <ListItemText>
                    {shippementData?.address_label_name}{" "}
                    {shippementData?.address}," ",{shippementData?.city},
                    {shippementData?.state},{shippementData?.country}
                  </ListItemText>
                )}
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
        </Grid>

        <Grid item md={12} xs={12} sx={{ bgcolor: "background.paper" }}>
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {t('shippingInfo.ShippingAdress.label.shippingMethods')}
            </Typography>
          </Box>
          <FormControl>
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
                        label={
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Image
                              // className={cx(styles.media, mediaStyles.root)}
                              src={result.shipping_method_icon_url}
                              // onClick={(e) => viewCategory(product.category_id)}
                              alt={"Shipping"}
                              width={50}
                              height={30}
                              objectFit="contain"
                            ></Image>
                            <Typography
                              sx={{
                                p: 1,
                              }}
                            >
                              {result.shipping_method_name}
                            </Typography>
                          </Box>
                        }
                        onClick={() => setRadioCheck(true)}
                        sx={{ ml: 1 }}
                      />
                    ))}
                </RadioGroup>
              </ListItem>
            </List>
          </FormControl>
        </Grid>

        <Grid
          item
          md={12}
          xs={12}
          sx={{ bgcolor: "background.paper", mt: 0.2 }}
        >
          <Box sx={{ p: 2 }}>
            <Typography variant="h6" style={{ fontWeight: "bold" }}>
              {t('shippingInfo.ShippingAdress.label.charges.shippingCharges')}
            </Typography>
          </Box>

          {/* <Box sx={{ display: "inline", margin: 5 }}> */}
          <Grid container sx={{ pl: 2 }}>
            <ListItem>
              <Grid item xs={3}>
                {t('shippingInfo.ShippingAdress.label.charges.subTotal')}
              </Grid>
              <Grid item xs={3}>
                {productPrice &&
                  productPrice.reduce((a, c) => a + c.qty * c.price, 0)}
              </Grid>
              <Grid item xs={6}></Grid>
              {/* <ListItemText>$ 0.0</ListItemText> */}
            </ListItem>
            <ListItem>
              <Grid item xs={3}>
                {t('shippingInfo.ShippingAdress.label.charges.shippingcost')}
              </Grid>
              <Grid item xs={3}>
                {shippingCharges ? shippingCharges : 0}
              </Grid>
              <Grid item xs={6}></Grid>
            </ListItem>
            <ListItem>
              <Grid item xs={3}>
                {t('shippingInfo.ShippingAdress.label.charges.totalCost')}{" "}
              </Grid>
              <Grid item xs={3}>
                {productPrice && shippingCharges
                  ? productPrice?.reduce((a, c) => a + c.qty * c.price, 0) +
                  shippingCharges
                  : productPrice?.reduce((a, c) => a + c.qty * c.price, 0)}
              </Grid>
              <Grid item xs={6}></Grid>
            </ListItem>
          </Grid>
          <ListItem>
            <Button
              onClick={checkoutHandler}
              variant="contained"
              color="primary"
              disabled={radioCheck ? "" : "disabled"}
            // startIcon={<AddIcon />}
            >
              {t('shippingInfo.ShippingAdress.button.reviewOrder')}
            </Button>
          </ListItem>
          {/* <Button
                // fullWidth
                variant="contained"
                color="error"
                onClick={() => router.push("/cart")}
              >
                Back
              </Button> */}
        </Grid>
      </Grid>
    </>
  );
}

export default ShippingMethods;
