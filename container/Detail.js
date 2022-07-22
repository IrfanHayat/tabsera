import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import Button from "@mui/material/Button";
import styled from "@mui/styles/styled";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
//import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import SwipeableViews from "react-swipeable-views";
import Image from "next/image";
import Carousel from "react-elastic-carousel";
import { AppBar, Stack } from "@mui/material";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function Details({
  viewProduct,
  productDetail,
  merchantDetail,
  productImage,
  productAttributes,
  addToCartHandler,
  checkoutHandler,
  BuyHandler,
  price,
  viewStore,
}) {
 
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  let [skusProduct, setSkusProduct] = useState();
  let [variantOneProduct, setVariantOneProduct] = useState();
  //let [productDetailOne,setProductDetailOne]=useState();

  const viewVariantsProduct = (result) => {
    setSkusProduct(result);
  };

  const theme = useTheme();
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleChangeIndex = (index) => {
    setValue(index);
  };
  let router = useRouter();
  
  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ paddingTop: 2 }}
        justifyContent="center"
      >
        <Grid item md={12} xs={12} ml={1}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Product Details
          </Typography>
        </Grid>

        <Grid item md={6} xs={12}>
          <Carousel
            // breakPoints={breakPoints}
            //  disableArrowsOnEnd={false}
            // showArrows={false}
            // pagination={true}
            pagination={false}
            // showEmptySlots={true}
            // itemsToShow={2}
            showArrows={false}
          >
            {skusProduct
              ? skusProduct.sku_images.map((result) => (
                  <Image
                    //  className={cx(styles.media, mediaStyles.root)}
                    src={result}
                    alt="shirt"
                    width={1500}
                    height={500}
                  ></Image>
                ))
              : productImage && (
                  <Image
                    //  className={cx(styles.media, mediaStyles.root)}
                    src={productImage[0]}
                    alt="shirt"
                    width={1500}
                    height={500}
                  ></Image>
                )}
          </Carousel>
        </Grid>

        <Grid container spacing={1}>
          <Grid item md={3}></Grid>
          <Grid item md={3} sm={6}>
            <ListItemText>
              <Typography style={{ fontWeight: "bold" }}>
                {productDetail?.product_name}
              </Typography>{" "}
            </ListItemText>
          </Grid>
          <Grid item md={2} sm={3}></Grid>
          <Grid item md={4} sm={6}>
            <ListItemText>
              <Typography style={{ fontWeight: "bold" }}>
                Rs.{skusProduct ? skusProduct.cost : price}
              </Typography>
            </ListItemText>
          </Grid>
        </Grid>

        <Grid container spacing={1}>
          {/* <ListItem>   </ListItem> */}
          <Grid item md={3}></Grid>
          <Grid item md={3}>
            <ListItemText sx={{ color: "error.main" }}>
              <Typography style={{ fontWeight: "bold" }}>
                {productDetail?.category_name}{" "}
              </Typography>
            </ListItemText>
          </Grid>
          <Grid item md={2}></Grid>
          <Grid item md={4}>
            <ListItemText sx={{ color: "success.main" }}>
              <Typography style={{ fontWeight: "bold" }}>In Stock</Typography>
            </ListItemText>
          </Grid>
        </Grid>

        {/* ---------------------------------------------------------------------------------------- */}

        <Grid container spacing={1}>
          <Grid item md={3}></Grid>
          <Grid item md={3}>
            <ListItemText sx={{ color: "primary.main" }}>
              <Typography style={{ fontWeight: "bold" }}>
                Sold By: {productDetail?.merchant_name}
              </Typography>
            </ListItemText>
          </Grid>
          <Grid item md={2}></Grid>
          <Grid item md={4}></Grid>

          {/* <ListItem>
            <Typography> Sold By:{productDetail?.merchant_name}</Typography>
          </ListItem> */}
        </Grid>
        {/* <Grid item md={3}></Grid> */}
        {/* </Grid> */}

        <Grid container spacing={1}>
          {/* <Grid item md={6} xs={6}>
          <ListItem>
            <Typography> {productDetail?.product_name}</Typography>
          </ListItem>
        </Grid>
        <Grid item md={6} xs={6}>
          <ListItem>
            <Typography>Rs.{skusProduct ? skusProduct.cost : price}</Typography>
          </ListItem>
        </Grid>
        <Grid item md={6} xs={6}>
          <ListItem>
            <Typography>{productDetail?.category_name}</Typography>
          </ListItem>
        </Grid>
        <Grid item md={6} xs={6}>
          <ListItem>
            <Typography>out of stock</Typography>
          </ListItem>
        </Grid> */}
          {/* <Grid item md={6} xs={6}>
          <ListItem>
            <Typography> Sold By:{productDetail?.merchant_name}</Typography>
          </ListItem>
        </Grid> */}

          {/* <Grid item md={12} xs={12}> */}
          {/* <Card style={{ margin: "10px" }}>
            <List>
              <ListItem> */}
          {/* <Grid container spacing={1}> */}
          <Grid item md={3}></Grid>

          <Grid item xs={6} md={3}>
            {skusProduct
              ? skusProduct.attributes.map((result) => (
                  <Typography>
                    {result.attribute_name}:{result.value}
                  </Typography>
                ))
              : productAttributes.map((result) => (
                  <Typography>
                    {result.attribute_name}:{result.value}
                  </Typography>
                ))}
          </Grid>

          <Grid item xs={12} md={6}>
            <Carousel
              // breakPoints={breakPoints}
              disableArrowsOnEnd={true}
              // showArrows={false}
              pagination={false}
              // showEmptySlots={true}
              itemsToShow={4}
            >
              {productDetail &&
                productDetail.skus?.map((results) => (
                  <Image
                    //  className={cx(styles.media, mediaStyles.root)}
                    onClick={() => {
                      viewVariantsProduct(results);
                    }}
                    src={results.sku_images[0]}
                    alt="shirt"
                    width={100}
                    height={100}
                  ></Image>
                ))}
            </Carousel>
          </Grid>
        </Grid>

        <Grid container spacing={1} style={{ marginTop: "40px" }}>
          <Grid item md={12} xs={12}>
            <Card>
              <AppBar
                sx={{
                  borderBottom: 1,
                  borderColor: "divider",
                  position: "static",
                }}
              >
                {/* <AppBar></AppBar> */}
                <Tabs
                  value={value}
                  onChange={handleChange}
                  aria-label="full width tabs example"
                  variant="fullWidth"
                  indicatorColor="secondary"
                  // textColor="secondary"
                  textColor="inherit"
                >
                  <Tab
                    label="Description"
                    style={{ fontWeight: "bold" }}
                    {...a11yProps(0)}
                  />
                  <Tab
                    label="Rating"
                    style={{ fontWeight: "bold" }}
                    {...a11yProps(1)}
                  />
                  <Tab
                    label="Store"
                    style={{ fontWeight: "bold" }}
                    {...a11yProps(2)}
                  />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={value}
                onChangeIndex={handleChangeIndex}
              >
                <TabPanel value={value} index={0} dir={theme.direction}>
                  {productDetail?.product_desc}
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  Rating
                </TabPanel>
                <TabPanel value={value} index={2} dir={theme.direction}>
                  {/* {productDetail?.merchant_name} */}
                  <List>
                    <ListItem>Name : {merchantDetail?.merchant_name}</ListItem>
                  </List>
                  <List>
                    <ListItem>Location : {merchantDetail?.city}</ListItem>
                  </List>
                  <List>
                    <ListItem>
                      Joined Tabsera : {merchantDetail?.created_date}
                    </ListItem>
                  </List>
                  <List>
                    <ListItem>Seller Rating :</ListItem>
                    
                  </List>
                  <Stack>
                    <Button
                      variant="text"
                      onClick={() => viewStore(merchantDetail?.merchant_id)}
                      // onClick={viewStore}
                    >
                      Visit Store
                    </Button>
                  </Stack>
                </TabPanel>
              </SwipeableViews>
              {/* <TabPanel value={value} index={2}>
              {merchantDetail?.city}
            </TabPanel> */}
            </Card>
          </Grid>

          <Grid container spacing={1} sx={{ p: 2 }}>
            <Grid item xs={12} md={12}>
              {/* <Item> */} {/* <ListItem> */}
              <Stack direction="row" spacing={2}>
                <Button
                  // fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    skusProduct
                      ? addToCartHandler(productDetail, skusProduct)
                      : addToCartHandler(productDetail);
                  }}
                >
                  Add to cart
                </Button>
                {/* </ListItem> */}
                {/* </Item> */}
                {/* </Grid> */}
                {/* <Grid item xs={6} md={6}> */}
                {/* <Item> */} {/* <ListItem> */}
                <Button
                  // fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  // href="/shipping_information"
                  onClick={() => {
                    skusProduct
                      ? BuyHandler(productDetail, skusProduct)
                      : BuyHandler(productDetail);
                  }}
                  // onClick={() => {
                  //   skusProduct
                  //     ? BuyHandler(productDetail, skusProduct)
                  //     : BuyHandler(productDetail);
                  // }}
                >
                  Buy Now
                </Button>
                <Button
                  // fullWidth
                  variant="contained"
                  color="error"
                  onClick={() => router.push("/")}
                >
                  Back
                </Button>
              </Stack>
              {/* </ListItem> */}
              {/* </Item> */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Details;
