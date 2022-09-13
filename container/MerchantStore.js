import React, { useState, useRef } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Card, ListItemIcon } from "@mui/material";
import Button from "@mui/material/Button";
import styled from "@mui/styles/styled";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
//import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Image from "next/image";
import Carousel from "react-elastic-carousel";
import styles from "../styles/merchantStore.module.css";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useSelector } from "react-redux";
import {
  AppBar,
  CardContent,
  CardMedia,
  Stack,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import ActionAreaCard from "./Card";
import { result } from "lodash";
import MerchantSideBarFilter from "./Filter/MerchantSideBarFilter";
import { useTranslation } from "react-i18next";
import banner from "../public/banner.jpg";
import Rating from "@mui/material/Rating";
import Avatar from "@mui/material/Avatar";
import MerchantProfile from "./MerchantProfile";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function MerchantStore({ merchantStoreDetail }) {
  const { merchantData } = useSelector((state) => state.merchant);
  console.log("MD-------------->", merchantStoreDetail);
  const MaxInput = useRef(null);
  const MinInput = useRef(null);
  const [parentCategories, setParentCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [catId, setCatId] = useState();
  let { t, i18n } = useTranslation();
  // const [merchant, setmerchant] = useState();
  // console.log(merchantStoreDetail);
  // useEffect(() => {
  //   setmerchant(merchantData);
  // }, [input]);

  const children = (subCategories) => {
    return (
      <Box sx={{ display: "flex", flexDirection: "column", ml: 2 }}>
        <Grid>
          {subCategories.map((result, index) => (
            <List
              onClick={() => categoryProduct(result.category_name)}
              key={index}
            >
              {result.category_name}
            </List>
          ))}
        </Grid>
        {/* {
          subCategories?.map(result => {
            <List>
              <ListItem>
                {"Hello"}
              </ListItem>
            </List>
          })

        } */}
      </Box>
    );
  };

  // useEffect(async () => {
  //   let result = await dispatch(getCategory());
  //   let results = result?.payload.filter(
  //     (result) => result.category_id == catId
  //   );

  //   results?.map((category) => {
  //     setParentCategories(category.category_name);

  //     setSubCategories(category.child);
  //   });
  // }, []);

  // useEffect(async () => {
  //   let result = await dispatch(getCategoryBrand());
  //   let results = result?.payload.filter(
  //     (result) => result.category_id == catId
  //   );
  //   console.log(results);
  //   results.map((category) => {
  //     console.log(category)
  //     setBrands(category.brands);
  //   });
  // }, []);

  const priceFilter = () => {
    let max = MaxInput.current.value;
    let min = MinInput.current.value;
    console.log(typeof max);
    console.log(typeof min);
    let result = productDataWithCategoryId.filter(
      (result) =>
        parseInt(result.productCost) >= parseInt(min) &&
        parseInt(result.productCost) <= parseInt(max)
    );
    setFilterProduct(result);
    setFlag(true);
  };

  function categoryProduct(name) {
    console.log(name);
    let result = productDataWithCategoryId.filter(
      (category) => category.categoryName == name
    );
    console.log(result);
    setFilterProduct(result);
  }

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  let router = useRouter();

  const viewProduct = (item) => {
    router.push({
      pathname: `/product_detail`,
      query: { productId: item.productId },
    });
  };

  return (
    <>
      <Grid
        container
        // spacing={1}
        // sx={{ paddingTop: 2 }}
        // justifyContent="center"
      >
        <Grid item md={12} xs={12} ml={1} className={styles.merchantBanner}>
          <Box
            className={styles.merchantBannerImg}
            sx={{ backgroundColor: "orange" }}
          >
            {/* <Typography sx={{ bgcolor: "red" }}>
              {" "}
              Name: {merchantData.merchant_name}
            </Typography> */}
            {/* <CardMedia
              className={styles.merchantImg}
              component="img"
              image="../public/banner.jpg"
              // sx={{ width: 251, height: 251, bgcolor: "red  " }}
              alt=" Logo here"
            /> */}
          </Box>
          {/* <Typography className={styles.merchantName}>
            {" "}
            Name: {merchantData.merchant_name}
          </Typography> */}
          <Box className={styles.merchantBannerInfo}>
            {" "}
            {/* <Typography className={styles.merchantName}>
              Name : {merchantData.merchant_name}
            </Typography> */}
            <List dense>
              <ListItem className={styles.merchantBannerInfoDesc}>
                <Rating
                  name="read-only"
                  value={4.5}
                  precision={0.5}
                  readOnly
                  size="small"
                  sx={{ ml: 1 }}
                />
              </ListItem>
              {/* <Typography className={styles.merchantBannerInfoDesc}> */}
              <ListItem className={styles.merchantBannerInfoDesc}>
                {/* <ListItemIcon> */}
                <LocationOnIcon fontSize="small" />
                {/* </ListItemIcon> */}
                <ListItemText sx={{ ml: 1 }}>
                  Merchant City : {merchantData.city}
                </ListItemText>
              </ListItem>
              <ListItem className={styles.merchantBannerInfoDesc}>
                {" "}
                <LoyaltyIcon fontSize="small" />
                <ListItemText sx={{ ml: 1 }}>
                  Member Since : {merchantData?.created_date}
                </ListItemText>
              </ListItem>
            </List>
          </Box>
        </Grid>
        <CardMedia
          className={styles.merchantImg}
          component="img"
          image="../public/banner.jpg"
          // sx={{ width: 251, height: 251, bgcolor: "red  " }}
          alt=" Logo here"
        />
        {/* <Box className={styles.merchantImg}>
          <Image
            src="/banner.jpg"
            onClick={(e) => viewProduct(product)}
            // alt={product?.productName}
            width={"100%"}
            height={"100%"}
            style={{ borderRadius: "50%" }}
            objectFit="contain"
          ></Image>
        </Box> */}
        <Typography className={styles.merchantName}>
          {" "}
          {merchantData.merchant_name}
        </Typography>
        {/* <Grid item md={12} xs={12}>
          <Box>
            {" "}
            <List>
              <ListItem> Name : {merchantData.merchant_name}</ListItem>
            </List>
            <List>
              <ListItem>Location : {merchantData.city} </ListItem>
            </List>
            <List>
              <ListItem>Joined Tabsera : {merchantData?.created_date}</ListItem>
            </List>
            <List>
              <ListItem>
                Seller Rating : {merchantStoreDetail?.averageRating}
              </ListItem>
            </List>
          </Box>
        </Grid> */}
        <Grid item md={12} xs={12}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              // variant="fullWidth"
              sx={{ pl: 3 }}
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab
                style={{ fontWeight: "bold" }}
                label={t("Merchants.Tabs.Home")}
                {...a11yProps(0)}
              />
              <Tab
                style={{ fontWeight: "bold" }}
                label={t("Merchants.Tabs.All Products")}
                {...a11yProps(1)}
              />
              <Tab
                style={{ fontWeight: "bold" }}
                label={t("Merchants.Tabs.Profile")}
                {...a11yProps(2)}
              />
              {/* <Box>hi</Box> */}
            </Tabs>

            <TabPanel value={value} index={0}>
              <Grid container backgroundColor="white">
                Home
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Grid sx={{ display: "flex" }}>
                <>
                  <MerchantSideBarFilter
                    MinInput={MinInput}
                    MaxInput={MaxInput}
                    priceFilter={priceFilter}
                    categoryProduct={categoryProduct}
                    parentCategories={parentCategories}
                    childrenCategory={children}
                    subCategories={subCategories}
                    brands={brands}
                  ></MerchantSideBarFilter>
                </>
                <>
                  {" "}
                  {merchantStoreDetail &&
                    merchantStoreDetail?.map((result) => (
                      <ActionAreaCard
                        product={result}
                        viewProduct={viewProduct}
                      ></ActionAreaCard>
                    ))}
                </>
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
              <MerchantProfile />
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default MerchantStore;
