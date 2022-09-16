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
import styles from "../styles/shippingMethods.module.css";
import InfoIcon from "@mui/icons-material/Info";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import PaymentIcon from "@mui/icons-material/Payment";
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
        <Grid item md={12} xs={12}>
          <Box className={styles.shippingMethods}>
            <Box className={styles.shippingHeading}>
              <InfoIcon className={styles.Icon} />
              <Typography
                className={styles.shippingHeading}
                // variant="h6"
                style={{ fontWeight: "bold" }}
              >
                {t("shippingInfo.ShippingAdress.label.shippingInformation")}
              </Typography>
            </Box>

            <Box className={styles.infoList}>
              <AccountCircleIcon className={styles.infoIcon} />
              <Typography>
                {userData.first_name} {userData.last_name}
              </Typography>
            </Box>

            <Box className={styles.infoList}>
              <PhoneIcon className={styles.infoIcon} />

              {localStorage.getItem("mobileNumber") ? (
                <Typography>{localStorage.getItem("mobileNumber")}</Typography>
              ) : (
                <ListItemText>{"3215890184"}</ListItemText>
              )}
            </Box>

            {userData.email ? (
              <Box className={styles.infoList}>
                <EmailIcon className={styles.infoIcon} />

                <Typography>{userData.email}</Typography>
              </Box>
            ) : (
              <Box className={styles.infoList}>
                <EmailIcon className={styles.infoIcon} />
                <Typography>{"test@gmail.com"}</Typography>
              </Box>
            )}

            <Box className={styles.infoList}>
              <DomainAddOutlinedIcon className={styles.infoIcon} />

              {shippementData ? (
                <Typography>
                  {shippementData?.address_label_name} {shippementData?.address}
                  ," ",{shippementData?.city},{shippementData?.state},
                  {shippementData?.country}
                </Typography>
              ) : (
                <></>
              )}
            </Box>
          </Box>
        </Grid>

        <Grid item md={12} xs={12} className={styles.shippingMethods}>
          <Box className={styles.shippingHeading}>
            <LocalShippingIcon className={styles.Icon} />
            <Typography style={{ fontWeight: "bold" }}>
              {t("shippingInfo.ShippingAdress.label.shippingMethods")}
            </Typography>
          </Box>

          <RadioGroup
            // row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
            // value={labelValue}
          >
            <Box className={styles.shippingBoxDivMain}>
              {shipmentMethodData &&
                shipmentMethodData.map((result) => (
                  <Box className={styles.shippingAddress}>
                    <Box className={styles.addressLabelDiv}>
                      <Image
                        // className={cx(styles.media, mediaStyles.root)}
                        src={result.shipping_method_icon_url}
                        // onClick={(e) => viewCategory(product.category_id)}
                        alt={"Shipping"}
                        width={70}
                        height={70}
                        objectFit="contain"
                      ></Image>

                      <FormControlLabel
                        key={result.shipping_method_id}
                        value={result.shipping_method_id}
                        control={
                          <Radio onChange={() => handleChange(result)} />
                        }
                        label={<></>}
                        onClick={() => setRadioCheck(true)}
                      />
                    </Box>
                    <Typography>{result.shipping_method_name}</Typography>
                  </Box>
                ))}
            </Box>
          </RadioGroup>
          {/* </Box> */}
          {/* </ListItem>
            </List> */}
          {/* </FormControl> */}
        </Grid>

        <Grid item md={12} xs={12} className={styles.shippingMethods}>
          <Box className={styles.shippingHeading}>
            <PaymentIcon className={styles.Icon} />
            <Typography style={{ fontWeight: "bold" }}>
              {t("shippingInfo.ShippingAdress.label.charges.shippingCharges")}
            </Typography>
          </Box>

          {/* <Box sx={{ display: "inline", margin: 5 }}> */}
          <Grid container sx={{ pl: 2 }}>
            <ListItem>
              <Grid item xs={3}>
                {t("shippingInfo.ShippingAdress.label.charges.subTotal")}
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
                {t("shippingInfo.ShippingAdress.label.charges.shippingcost")}
              </Grid>
              <Grid item xs={3}>
                {shippingCharges ? shippingCharges : 0}
              </Grid>
              <Grid item xs={6}></Grid>
            </ListItem>
            <ListItem>
              <Grid item xs={3}>
                {t("shippingInfo.ShippingAdress.label.charges.totalCost")}{" "}
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
              {t("shippingInfo.ShippingAdress.button.reviewOrder")}
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
