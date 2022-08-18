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
import { AppBar, Stack, Divider } from "@mui/material";
import { useRouter } from "next/router";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import Rating from "@mui/material/Rating";
import ReactImageMagnify from "react-image-magnify";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

const StyledFab = styled(Fab)({
  position: "absolute",
  zIndex: 1,
  top: -30,
  left: 0,
  right: 0,
  margin: "0 auto",
});

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}

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
  productIdRoute,
}) {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));
  let [skusProduct, setSkusProduct] = useState();
  let [skusFlag, setSkusFlag] = useState(false);
  let [variantOneProduct, setVariantOneProduct] = useState();
  //let [productDetailOne,setProductDetailOne]=useState();

  const viewVariantsProduct = (result) => {
    setSkusProduct(result);
    setSkusFlag(true);
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
  console.log("productDetail", productDetail);
  return (
    <>
      <Box
        role="presentation"
        onClick={handleClick}
        sx={{ display: "flex", m: 1 }}
        direction="row"
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            color="inherit"
            onClick={() => router.push("/")}
          >
            Home
          </Link>
          <Link
            underline="hover"
            color="inherit"
            onClick={() =>
              router.push(`/product_detail?productId=${productIdRoute}`)
            }
          >
            Product Detail
          </Link>
          <Typography
            underline="hover"
            color="text.primary"
            href="/material-ui/react-breadcrumbs/"
            aria-current="page"
          >
            {productDetail?.product_name}
          </Typography>
        </Breadcrumbs>




      </Box>
      <Grid sx={{ display: "flex", justifyContent: "center", justifyContent: 'flex-end', paddingRight: "10%" }}>
        <Typography
          sx={{ color: "error.main", alignSelf: "center" }}
          style={{ fontWeight: "bold" }}
        >
          Sold By: {productDetail?.merchant_name}
        </Typography>
        <Button
          variant="text"
          onClick={() => viewStore(merchantDetail?.merchant_id)}
        // onClick={viewStore}



        >
          Visit Store
        </Button>
      </Grid>
      <Grid
        container
        spacing={1}
        maxWidth="xl"
        sx={{ paddingTop: 2 }}
      // justifyContent="center"
      >
        {/* <Grid item md={12} xs={12} ml={1}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Product Details
          </Typography>
        </Grid> */}
        {/* <Grid item md={1} sm={1}></Grid> */}
        <Grid item md={5} xs={12}>
          <Card>
            <List>
              <ListItem sx={{ m: 1 }}>
                <Carousel
                  // breakPoints={breakPoints}
                  //  disableArrowsOnEnd={false}
                  // showArrows={false}
                  // pagination={true}
                  pagination={false}
                  showEmptySlots={true}
                  // itemsToShow={2}
                  showArrows={false}
                >
                  {Object.keys(productDetail).length > 0 && skusFlag == false
                    ? productDetail.product_images[0].media_images.map(
                      (result, index) => (
                        <ReactImageMagnify
                          {...{
                            smallImage: {
                              alt: "Wristwatch by Ted Baker London",
                              // isFluidWidth: true,
                              width: 1200,
                              height: 400,
                              src: result,
                              // sizes:
                              //   "(min-width: 800px) 33.5vw, (min-width: 415px) 50vw, 100vw",
                            },
                            largeImage: {
                              src: result,
                              width: 1200,
                              height: 1800,
                            },

                            enlargedImagePosition: "over",
                            // enlargedImageContainerDimensions: {
                            //   width: "150%",
                            //   height: "150%",
                            // },
                            enlargedImageContainerStyle: {
                              zIndex: "1500",
                            },
                            enlargedImageContainerDimensions: {
                              width: "100%",
                              height: "100%",
                            },
                          }}
                        />
                        // <Image
                        //   key={index}
                        //   //  className={cx(styles.media, mediaStyles.root)}
                        //   src={result}
                        //   alt="shirt"
                        //   // objectFit="contain"
                        //   width={1500}
                        //   height={1000}
                        // ></Image>
                      )
                    )
                    : productImage && (
                      <Image
                        // key={index}
                        //  className={cx(styles.media, mediaStyles.root)}
                        src={productImage[0]}
                        alt="shirt"
                        objectFit="contain"
                        width={1500}
                        height={1000}
                      ></Image>
                    )}
                </Carousel>
              </ListItem>

              <ListItem sx={{ display: "flex", justifyContent: "center" }}>



                <Rating
                  name="size-small"
                  defaultValue={3}
                  // size="small"
                  readOnly
                />

              </ListItem>

            </List>
          </Card>
        </Grid>

        <Grid
          item
          md={6}
          sm={12}
          xs={12}

        // sx={{ display: "flex" }}
        // justifyContent="center"
        // alignItems="center"
        >
          <Card>

            <List>
              <ListItem>
                <ListItemText>
                  <Typography style={{ fontWeight: "bold", fontSize: 28 }}>
                    {productDetail?.product_name}
                  </Typography>
                </ListItemText>
              </ListItem>
              <Divider fullWidth />
              <Grid md={12}>
                <ListItem>
                  <ListItemText md={6}>
                    <Typography style={{ fontWeight: "bold" }}>
                      Category: {productDetail?.category_name}
                    </Typography>
                  </ListItemText>
                  {/* </ListItem> */}
                  {/* <ListItem> */}
                  <ListItemText md={6} sx={{ color: "error.main" }}>
                    <Typography style={{ fontWeight: "bold" }}>
                      PKR.{skusProduct ? skusProduct.cost : price}
                    </Typography>
                  </ListItemText>
                </ListItem>
              </Grid>
              <Grid md={12}>
                <ListItem>

                  {/* </ListItem> */}
                  {/* <ListItem> */}
                  <ListItemText md={6} sx={{ color: "success.main" }}>
                    <Typography style={{ fontWeight: "bold" }}>In Stock</Typography>
                  </ListItemText>
                </ListItem>
              </Grid>
              {/* <ListItem> */}
              {skusProduct
                ? skusProduct.attributes.map((result, index) => (
                  // <List key={index}>
                  <Grid md={12}>
                    <ListItem key={index}>
                      <ListItemText md={6}>
                        <Typography>{result.attribute_name}:  <Typography>{result.value}</Typography>
                        </Typography>
                      </ListItemText>


                    </ListItem>
                  </Grid>
                  // </List>
                ))
                : productAttributes.map((result, index) => (
                  // <List key={index}>
                  <ListItem key={index}>
                    <ListItemText>
                      <Typography style={{ fontWeight: "bold" }}>
                        {result.attribute_name} :{result.value}
                      </Typography>
                    </ListItemText>

                  </ListItem>

                  // </List>
                ))}
              <Divider />
              <Grid md={12}>
                <ListItem >
                  <ListItemText md={6}>
                    <Typography variant="h5" style={{ fontWeight: "bold" }}>
                      Skus
                    </Typography>
                  </ListItemText>
                </ListItem>

                <Box md={6} sx={{ display: "flex", m: 1 }}>
                  <Carousel
                    // breakPoints={breakPoints}
                    disableArrowsOnEnd={true}
                    showArrows={false}
                    pagination={false}
                    showEmptySlots={true}
                    itemsToShow={4}
                  >
                    {productDetail &&
                      productDetail.skus?.map((results, index) => (
                        <Image
                          //  className={cx(styles.media, mediaStyles.root)}
                          onClick={() => {
                            viewVariantsProduct(results);
                          }}
                          key={index}
                          src={results.sku_images[0]}
                          alt="shirt"
                          width={100}
                          height={80}
                        ></Image>
                      ))}
                  </Carousel>
                </Box>
              </Grid>
              <Divider />

              {/* </ListItem> */}
              <ListItem
                sx={{
                  // display: "flex",
                  display: {
                    xs: "none",
                    sm: "none",
                    md: "flex",
                    // display: "flex",
                    justifyContent: "end"
                    // display: "flex",

                    // flexWrap: "wrap",

                    // bgcolor: "#f6f9fc",
                  },
                  // display: "flex",

                }}
              >
                <Stack direction="row" spacing={2}>
                  <Button
                    // fullWidth
                    variant="contained"
                    color="info"
                    type="submit"
                    size="large"
                    // href="/shipping_information"
                    onClick={() => {
                      skusProduct
                        ? BuyHandler(productDetail, skusProduct)
                        : BuyHandler(productDetail);
                    }}
                  >
                    Buy Now
                  </Button>
                  <Button
                    // fullWidth
                    variant="contained"
                    color="warning"
                    onClick={() => {
                      skusProduct
                        ? addToCartHandler(productDetail, skusProduct)
                        : addToCartHandler(productDetail);
                    }}
                    size="large"
                  >
                    Add to cart
                  </Button>
                </Stack>
              </ListItem>
            </List>


          </Card>
        </Grid>
        <Grid item md={1} sm={1}></Grid>

        <Grid container spacing={1} m={1}>
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
                    label="Similar Products"
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
                  Similar Products
                  {/* <List>
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
                  </Stack> */}
                </TabPanel>
              </SwipeableViews>
              {/* <TabPanel value={value} index={2}>
              {merchantDetail?.city}
            </TabPanel> */}
            </Card>
          </Grid>
        </Grid>
        <AppBar
          position="fixed"
          color="inherit"
          bgcolor="#f6f9fc"
          sx={{
            top: "auto",
            bottom: 0,
            display: {
              xs: "flex",
              md: "none",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: "wrap",
              boxShadow: 0,
              bgcolor: "#f6f9fc",
              // sx={{  }}
              // borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
            },
          }}
        >
          <Toolbar>
            <Stack direction="row" spacing={2}>
              <Button
                // fullWidth
                variant="contained"
                color="info"
                type="submit"
                size="large"
                // href="/shipping_information"
                onClick={() => {
                  skusProduct
                    ? BuyHandler(productDetail, skusProduct)
                    : BuyHandler(productDetail);
                }}
              >
                Buy Now
              </Button>
              <Box sx={{ flexGrow: 1 }} />
              <Button
                // fullWidth
                variant="contained"
                color="warning"
                onClick={() => {
                  skusProduct
                    ? addToCartHandler(productDetail, skusProduct)
                    : addToCartHandler(productDetail);
                }}
                size="large"
              >
                Add to cart
              </Button>
            </Stack>
          </Toolbar>
        </AppBar>
      </Grid>
    </>
  );
}

export default Details;
