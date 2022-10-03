import React, { useState, useEffect } from "react";
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
import Carousel, { consts } from "react-elastic-carousel";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { AppBar, Stack, Divider, ListItemIcon } from "@mui/material";
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
import Brightness1Icon from "@mui/icons-material/Brightness1";
import AddBoxOutlinedIcon from "@mui/icons-material/AddBoxOutlined";
import IndeterminateCheckBoxOutlinedIcon from "@mui/icons-material/IndeterminateCheckBoxOutlined";
import SettingsBackupRestoreIcon from "@mui/icons-material/SettingsBackupRestore";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ShareIcon from "@mui/icons-material/Share";
import styles from "../styles/pdp.module.css";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SquareIcon from "@mui/icons-material/Square";
import { useTranslation } from "react-i18next";
import Currency from "./Currency/currency";
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
  handleAddToCart,
  handleDecreaseCart,
  productIdRoute,
}) {
  let { t, i18n } = useTranslation();
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  function myArrow({ type, onClick, isEdge }) {
    const pointer =
      type === consts.PREV ? <ArrowBackIosNewIcon /> : <ArrowForwardIosIcon />;
    return (
      <Button onClick={onClick} disabled={isEdge}>
        {pointer}
      </Button>
    );
  }
  // handling tabs for reviews and description
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // ---------------------------------------------------------/
  let [skusProduct, setSkusProduct] = useState();
  let [skusFlag, setSkusFlag] = useState(false);
  let [variantOneProduct, setVariantOneProduct] = useState();
  //let [productDetailOne,setProductDetailOne]=useState();
  let [multiProductImage, setMultiProductImage] = useState();
  const [isActiveImg, setisActiveImg] = useState(false);
  const viewVariantsProduct = (result) => {
    console.log(result);
    setSkusProduct(result);
    setSkusFlag(true);
  };

  // const theme = useTheme();
  // const [value, setValue] = useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  // };
  // const handleChangeIndex = (index) => {
  //   setValue(index);
  // };
  let router = useRouter();
  console.log("productDetail", productDetail);

  // useEffect(() => {
  //   productDetail.skus?.map((results, index) => {
  //     console.log(results.skus);
  //     // setMultiProductImage(results.media_images);
  //   });
  // }, [productDetail]);

  useEffect(() => {
    productDetail.skus?.map((results, index) => {
      console.log(results.skus);
      //     // setMultiProductImage(results.media_images);
    });
    productDetail.product_images?.map((results, index) => {
      console.log(results.media_images);
      setMultiProductImage(results.media_images);
    });
  }, [productDetail]);

  console.log(productImage);

  return (
    <>
      {/* <Box
        role="presentation"
        onClick={handleClick}
        sx={{ display: "flex", p: 2 }}
        direction="row"
        className={styles.breadcrumbs}
      >
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            underline="hover"
            // color="inherit"
            onClick={() => router.push("/")}
          >
            Home
          </Link>
          <Link
            underline="hover"
          // color="inherit"
          // onClick={() =>
          //   router.push(`/product_detail?productId=${productIdRoute}`)
          // }
          >
            {productDetail?.category_name}
          </Link>
          <Typography
            underline="hover"
            // color="text.primary"
            href="/material-ui/react-breadcrumbs/"
            aria-current="page"
          >
            {productDetail?.product_name}
          </Typography>
        </Breadcrumbs>
      </Box> */}

      <Grid
        container
        // spacing={1}
        maxWidth="xl"
      // sx={{ backgroundColor: "#fafafa" }}
      // justifyContent="center"
      >
        <Grid
          item
          md={6}
          xs={12}
          className={styles.produtctImagesBox}
        // sx={{ bgcolor: "white" }}
        >
          <Carousel
            // breakPoints={breakPoints}
            //  disableArrowsOnEnd={false}
            showArrows={false}
            // pagination={true}
            pagination={false}
            showEmptySlots={true}
          // itemsToShow={2}
          // showArrows={false}
          >
            <Box className={styles.carouelImage}>
              {Object.keys(productDetail).length > 0 && skusFlag == false
                ? productDetail.product_images[0].media_images.map(
                  (result, index) => (
                    <ReactImageMagnify
                      {...{
                        smallImage: {
                          alt: "Product Image",
                          isFluidWidth: true,
                          // width: " 336px",
                          // height: "330px",
                          src: result,
                          sizes:
                            "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
                          // srcSet: this.state.currentImage.fluid.srcSet,
                        },
                        largeImage: {
                          src: result,
                          // srcSet: this.state.currentImage.fluid.srcSet,
                          width: 600,
                          height: 800,
                        },

                        enlargedImagePosition: "over",

                        isHintEnabled: true,
                        shouldHideHintAfterFirstActivation: false,
                      }}
                    />
                  )
                )
                : skusProduct &&
                skusProduct.sku_images.map((result) => (
                  // <Box className={styles.carouelImage}>
                  <ReactImageMagnify
                    {...{
                      smallImage: {
                        alt: "Product Image",
                        isFluidWidth: true,
                        src: result,
                        sizes:
                          "(max-width: 480px) 100vw, (max-width: 1200px) 30vw, 360px",
                        // srcSet: this.state.currentImage.fluid.srcSet,
                      },
                      largeImage: {
                        src: result,
                        // srcSet: this.state.currentImage.fluid.srcSet,
                        width: 600,
                        height: 800,
                      },
                      // enlargedImageStyle: {
                      //   objectFit: "contain",
                      // },
                      enlargedImagePosition: "over",

                      isHintEnabled: true,
                      shouldHideHintAfterFirstActivation: false,
                    }}
                  />
                  // </Box>
                ))}
            </Box>
          </Carousel>
          {/* </ListItem> */}
          {/* <Divider /> */}
          {console.log(multiProductImage)}
          <Box className={styles.produtctImages}>
            <Carousel
              // breakPoints={breakPoints}
              disableArrowsOnEnd={true}
              showArrows={false}
              renderArrow={myArrow}
              pagination={false}
              showEmptySlots={true}
              itemsToShow={6}
            >
              {multiProductImage &&
                multiProductImage?.map((results, index) => (
                  <Box
                    // sx={{ border: }}
                    className={styles.selectimg}
                  // border={isActiveImg ? "1px solid blue" : " "}
                  >
                    <Image
                      onClick={() => {
                        setSkusFlag(false);
                        setisActiveImg(true);
                      }}
                      objectFit="contain"
                      // style={{borderColor:"red", border:"5px"}}
                      key={index}
                      src={results}
                      alt="shirt"
                      width={"70px"}
                      height={"70px"}
                    ></Image>
                  </Box>
                ))}
            </Carousel>
          </Box>
          {/* </List> */}
        </Grid>

        <Grid item md={6} sm={12} xs={12} className={styles.prodDetailsDiv}>
          <Box className={styles.prodDetails}>
            <Typography className={styles.prodName}>
              {productDetail?.product_name}
            </Typography>
            {/* <Typography
              sx={{
                fontWeight: "bold",
                // display: "inline",
                color: "success.main",
              }}
            >
              In Stock
            </Typography> */}
          </Box>
          <Box sx={{ display: "flex", my: 1 }}>
            <Typography> Rated :</Typography>

            <Rating name="size-small" defaultValue={3} size="small" readOnly />
            {/* <Stack spacing={2} direction="row">
              <ShareIcon />
              <FavoriteBorderIcon color="error" />
            </Stack> */}
          </Box>
          {/* <Divider fullWidth /> */}

          <Box sx={{ py: 1 }}>
            <Box className={styles.prodCost}>
              {skusProduct ? (
                <>
                  <Currency amount={skusProduct.cost}></Currency>{" "}
                </>
              ) : (
                <>
                  <Currency amount={price}></Currency>
                </>
              )}
            </Box>

            <Box
              color="neutral"
              style={{ display: "block" }}
            >
              {skusProduct?.original_price ? <>PKR.{skusProduct.original_price}</> : <></>}
            </Box>
          </Box>

          {/* <Divider /> */}

          <Box sx={{ display: "flex", flexDirection: "column" }}>
            {skusFlag && skusProduct
              ? skusProduct.attributes.map((result, index) => (
                <Grid container key={index}>
                  {result.attribute_name == "Color" ? (
                    <>
                      <Grid item xs={2}>
                        {result.attribute_name}:
                      </Grid>
                      <Grid item md={3}>
                        <ListItemIcon>
                          <SquareIcon
                            sx={{
                              // position: "relative",
                              // top: 6,
                              // left: 5,
                              color: result.value,
                            }}
                          />
                        </ListItemIcon>
                      </Grid>
                    </>
                  ) : (
                    <Typography style={{ fontWeight: "bold" }}>
                      {result.attribute_name}: {result.value}{" "}
                    </Typography>
                  )}
                </Grid>
              ))
              : productAttributes.map((result, index) => (
                <Grid
                  container
                  // sx={{ display: "flex", flexDirection: "column" }}
                  key={index}
                >
                  {result.attribute_name == "Color" ? (
                    <>
                      <Grid item xs={2}>
                        <Typography> {result.attribute_name}: </Typography>
                      </Grid>
                      <Grid item md={3}>
                        <ListItemIcon>
                          <SquareIcon sx={{ color: result.value }} />
                        </ListItemIcon>
                      </Grid>
                    </>
                  ) : (
                    // <Box display="flex">
                    <Typography>
                      {result.attribute_name}: {result.value}{" "}
                    </Typography>
                    // </Box>
                  )}
                </Grid>
              ))}
          </Box>
          <Grid md={12}>
            <Divider />
            <Typography variant="subtitle2">
              {" "}
              {t("PDP.labels.variants")} :
            </Typography>

            <Box md={6} sx={{ display: "flex", m: 1 }}>
              <Carousel
                // breakPoints={breakPoints}
                disableArrowsOnEnd={true}
                showArrows={false}
                renderArrow={myArrow}
                pagination={false}
                showEmptySlots={true}
                itemsToShow={6}
              >
                {productDetail &&
                  productDetail.skus?.map((results, index) => (
                    <Box
                      className={styles.selectimg}
                    // border={isActiveImg ? "1px solid blue" : " "}
                    >
                      <Image
                        //  className={cx(styles.media, mediaStyles.root)}
                        onClick={() => {
                          viewVariantsProduct(results);
                        }}
                        objectFit="contain"
                        key={index}
                        src={results.sku_images[0]}
                        alt="shirt"
                        width={"70px"}
                        height={"70px"}
                      ></Image>
                    </Box>
                  ))}
              </Carousel>
            </Box>
            <Divider />
          </Grid>
          {/* <Box sx={{ display: "flex", p: 1, direction: "column" }}>
            <Grid container>
              <Grid display="flex" alignItems="center">
                <Typography>Quantity : </Typography>
              </Grid>

              <Grid display="flex" justifyContent="center" alignItems="center">
                <IconButton

                  aria-label="reduce item"
                  size="large"
                  variant="contained"
                  color="error"

                >
                  <IndeterminateCheckBoxOutlinedIcon />
                </IconButton>

                <Typography className="count" align="center">
                  0
                </Typography>

                <IconButton
                  aria-label="increase item"
                  size="large"
                  variant="contained"
                  color="success"

                >
                  <AddBoxOutlinedIcon />
                </IconButton>
              </Grid>

            </Grid>
          </Box> */}
          <Box
            // container
            spacing={1}
            sx={{
              mt: 2,
              display: {
                xs: "none",
                md: "flex",
                // justifyContent: "center",
                alignItems: "center",
                // flexWrap: "wrap",
                // boxShadow: 0,
                // bgcolor: "#f6f9fc",
                // sx={{  }}
                // borderBottom: (theme) => `1px solid ${theme.palette.divider}`,
              },
            }}
          >
            {/* <Grid item md={6} sm={6}> */}
            <Button
              // type="submit"
              variant="contained"
              className={styles.buyNowbtn}
              onClick={() => {
                skusProduct
                  ? BuyHandler(productDetail, skusProduct)
                  : BuyHandler(productDetail);
              }}
            >
              {t("PDP.buttons.buyNow")}
            </Button>
            {/* </Grid> */}
            {/* <Grid item md={6} sm={6}> */}
            <Button
              // color="warning"
              variant="plain"
              className={styles.addToCartbtn}
              onClick={() => {
                skusProduct
                  ? addToCartHandler(productDetail, skusProduct)
                  : addToCartHandler(productDetail);
              }}
            >
              {t("PDP.buttons.cart")}
            </Button>
            {/* </Grid> */}
          </Box>

          {/* <Typography variant="subtitle2" display="inline-block">
            Sold By:
          </Typography> */}
          <Box className={styles.merchantName}>
            <Typography variant="subtitle2">Sold By: </Typography> {"  "}
            <Typography variant="subtitle2" style={{ fontSize: 18, ml: 5 }}>
              {" "}
              {productDetail?.merchant_name}
            </Typography>
          </Box>
          <Button
            className={styles.visitStorebtn}
            variant="text"
            onClick={() =>
              viewStore(productDetail?.category_id, merchantDetail?.merchant_id)
            }
          // onClick={viewStore}
          >
            {t("PDP.labels.store")}
          </Button>
        </Grid>
        {/* <Grid sx={{ bgcolor: "#fafafa" }} item md={2} sm={12} xs={12}>
          <Box
            sx={{
              pl: 1,
              display: "flex",

              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <List>
              <Typography variant="subtitle2" display="inline-block">
                Service :
              </Typography>
              <ListItem>
                <ListItemIcon>
                  <SettingsBackupRestoreIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>7 Days Returns</ListItemText>
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <NotInterestedIcon fontSize="small" />{" "}
                </ListItemIcon>
                <ListItemText>Warranty Not Available</ListItemText>
              </ListItem>
            </List>
          </Box>
          <Divider />
          <Box
            sx={{
              p: 1,
              display: "flex",
              // justifyContent: "center",
              // justifyContent: "flex-end",
              // paddingRight: "10%",
              // flexWrap: "noWrap",
              alignItems: "flex-start",
              flexDirection: "column",
            }}
          >
            <Typography variant="subtitle2" display="inline-block">
              Sold By:
            </Typography>
            <List>
              <ListItem>
                <Typography
                  // sx={{ color: "error.main" }}
                  style={{ fontSize: 24 }}
                >
                  {productDetail?.merchant_name}
                </Typography>
              </ListItem>
              <ListItem>
                <Button
                  className={styles.visitStorebtn}
                  variant="text"
                  onClick={() =>
                    viewStore(
                      productDetail?.category_id,
                      merchantDetail?.merchant_id
                    )
                  }
                // onClick={viewStore}
                >
                  {t("PDP.labels.store")}
                </Button>
              </ListItem>
            </List>
          </Box>
          <Divider />
        </Grid> */}

        <Grid container>
          <Box className={styles.tabsMain}>
            <Box className={styles.tabs}>
              <Tabs
                // textColor="warning.dark"
                textColor="inherit"
                // indicatorColor="inherit"
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab
                  className={styles.tabsName}
                  label={t("PDP.labels.des")}
                  {...a11yProps(0)}
                />
                <Tab
                  className={styles.tabsName}
                  label="Review"
                  {...a11yProps(1)}
                />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              <Typography>desc {productDetail?.product_desc}</Typography>
            </TabPanel>
            <TabPanel value={value} index={1}>
              <Typography> rating and reviews</Typography>
            </TabPanel>
          </Box>

          {/* <Grid item md={9} xs={9}>
            <Grid>
              <Typography className={styles.ratings}>
                {t("PDP.labels.des")}
              </Typography>
              <List className={styles.ratingsDesc}>
                <ListItem>
                  <Typography> {productDetail?.product_desc}</Typography>
                </ListItem>
              </List>
            </Grid> 

           </Grid> */}

          <Grid
            item
            md={12}
            xs={12}
            pl={3}
            style={{ display: "flex", bgcolor: "red" }}
          >
            <Typography style={{ fontWeight: "bold", bgcolor: "red", marginLeft: "37px" }}>
              {" "}
              {t("PDP.labels.similar")} :
            </Typography>
          </Grid>
        </Grid>
        {/* <Grid container>
          <Grid item md={9} xs={9}>
            <Grid>
              <Typography
                className={styles.ratings}
                sx={{ fontSize: "1rem", fontWeight: "bold", marginLeft: "33px" }}
              >
                {t("PDP.labels.similar")}
              </Typography>
              <List className={styles.ratingsDesc}>
                <ListItem>
                  <Typography> rating and reviews</Typography>
                </ListItem>
              </List>
            </Grid>
     
          </Grid>
        </Grid> */}
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
                width="300px"
                variant="contained"
                color="info"
                type="submit"
                size="large"
                // sx={{
                //   background:
                //     "linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%)",
                // }}
                // href="/shipping_information"
                className={styles.buyNowbtnSM}
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
                className={styles.addToCartbtnSM}
                variant="contained"
                // sx={{
                //   background: "linear-gradient(45deg, red 10%, yellow 100%)",
                // }}
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
