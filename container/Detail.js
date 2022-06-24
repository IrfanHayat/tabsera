import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardMedia,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
//import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Image from "next/image";
import React, { useState } from "react";
import Carousel from "react-elastic-carousel";
//import NavBar from "./NavBar";

import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import IconButton from "@mui/material/IconButton";
import ShareIcon from "@mui/icons-material/Share";
import { useEffect } from "react";
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

  return (
    <>
      <Grid container spacing={1} sx={{ paddingTop: 2 }} justifyContent="center" >
    
        <Grid item md={6} xs={12}>
          {/* <CardMedia
            component="img"
            height="14"
            image={productDetail?.productImage}
            alt="green iguana"
            style={{ margin: "5px" }}
          /> */}
          <Typography variant="h6">Product Details</Typography>

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
       
      </Grid>

      <Grid container spacing={1}>
        <Grid item md={3}></Grid>
        <Grid item md={3} sm={6}>
          <ListItemText sx={{ fontWeight: "bold" }}>
            {productDetail?.product_name}{" "}
          </ListItemText>
        </Grid>
        <Grid item md={2} sm={3}></Grid>
        <Grid item md={4} sm={6}>
          <ListItemText sx={{ fontWeight: "bold" }}>
            Rs.{skusProduct ? skusProduct.cost : price}
          </ListItemText>
        </Grid>
      </Grid>

      <Grid container spacing={1}>
        {/* <ListItem>   </ListItem> */}
        <Grid item md={3}></Grid>
        <Grid item md={3}>
          <ListItemText sx={{ color: "error.main" }}>
            {productDetail?.category_name}{" "}
          </ListItemText>
        </Grid>
        <Grid item md={2}></Grid>
        <Grid item md={4}>
          <ListItemText sx={{ color: "success.main" }}>In Stock</ListItemText>
        </Grid>
      </Grid>

      {/* ---------------------------------------------------------------------------------------- */}

      <Grid container spacing={1}>
        <Grid item md={3}></Grid>
        <Grid item md={3}>
          <ListItemText>Sold By: {productDetail?.merchant_name}</ListItemText>
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
            disableArrowsOnEnd={false}
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

      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
          <Card style={{ margin: "10px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab label="Description" {...a11yProps(0)} />
                <Tab label="Rating" {...a11yProps(1)} />
                <Tab label="Store" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              {productDetail?.product_desc}
            </TabPanel>
            <TabPanel value={value} index={1}>
              Rating
            </TabPanel>
            <TabPanel value={value} index={2}>
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
            </TabPanel>
            {/* <TabPanel value={value} index={2}>
              {merchantDetail?.city}
            </TabPanel> */}
          </Card>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={6} md={6}>
            <Item>
              {" "}
              <ListItem>
                <Button
                  fullWidth
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
              </ListItem>
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              {" "}
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                 // href="/shipping_information"
                  onClick={() => {
                    skusProduct
                      ? BuyHandler(productDetail, skusProduct)
                      : BuyHandler(productDetail);
                  }}
                >
                  Buy Now
                </Button>
              </ListItem>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Details;
