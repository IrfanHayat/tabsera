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
import FavoriteIcon from "@mui/icons-material/Favorite";
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

  let [skusProduct, setSkusProduct] = useState();
  let [skusFlag, setSkusFlag] = useState(false);
  let [variantOneProduct, setVariantOneProduct] = useState();
  //let [productDetailOne,setProductDetailOne]=useState();
  let [multiProductImage, setMultiProductImage] = useState();

  const viewVariantsProduct = (result) => {
    console.log(result)
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

  useEffect(() => {
    productDetail.product_images?.map((results, index) => {
      setMultiProductImage(results.media_images);
    });
  }, []);

  console.log(productImage)

  return (
    <>
      <Box
        role="presentation"
        onClick={handleClick}
        sx={{ display: "flex", p: 2, bgcolor: "#fafafa" }}
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

      <Grid
        container
        spacing={1}
        maxWidth="xl"
        sx={{ backgroundColor: "#fafafa", pt: 1 }}
      // justifyContent="center"
      >
        <Grid item md={4} xs={12} sx={{ bgcolor: "white" }}>
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
                            width: 450,
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
                            width: "50%",
                            height: "100%",
                          },
                        }}
                      />

                    )
                  )
                  : skusProduct && (

                    skusProduct.sku_images.map(result => (
                      <ReactImageMagnify
                        {...{
                          smallImage: {
                            alt: "Wristwatch by Ted Baker London",
                            isFluidWidth: true,
                            // width: 100,
                            // height: 200,
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
                            width: "50%",
                            height: "100%",
                          },
                        }}
                      />
                    ))


                  )}
              </Carousel>
            </ListItem>
            {console.log(productDetail)}
            <ListItem>

              <Carousel
                // breakPoints={breakPoints}
                disableArrowsOnEnd={true}
                // showArrows={false}
                renderArrow={myArrow}
                pagination={false}
                showEmptySlots={true}
                itemsToShow={4}
              >
                {productDetail &&
                  multiProductImage?.map((results, index) => (
                    <Image
                      onClick={() => {
                        setSkusFlag(false);
                      }}
                      key={index}
                      src={results}
                      alt="shirt"
                      width={100}
                      height={80}
                    ></Image>
                  ))}
              </Carousel>
            </ListItem>
          </List>
        </Grid>

        <Grid
          item
          md={5}
          sm={12}
          xs={12}
          sx={{ px: 2, py: 4, bgcolor: "white" }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontWeight: "bold",
                fontSize: 28,
              }}
            >
              {productDetail?.product_name}
            </Typography>
            <Typography
              sx={{
                fontWeight: "bold",
                // display: "inline",
                color: "success.main",
              }}
            >
              In Stock
            </Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", my: 1 }}>
            <Rating name="size-small" defaultValue={3} size="small" readOnly />
            <Stack spacing={2} direction="row">
              <ShareIcon />
              <FavoriteBorderIcon color="error" />
            </Stack>
          </Box>
          <Box sx={{ display: "flex" }}>
            {skusFlag && skusProduct
              ? skusProduct.attributes.map((result, index) => (
                <Grid container key={index}>
                  {result.attribute_name == "Color" ? (
                    <>
                      <Grid item md={4}>
                        {result.attribute_name}:
                      </Grid>
                      <Grid item md={3}>
                        <ListItemIcon>
                          <Brightness1Icon
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
                <Grid container key={index}>
                  {result.attribute_name == "Color" ? (
                    <>
                      <Grid item md={4}>
                        <Typography> {result.attribute_name}: </Typography>
                      </Grid>
                      <Grid item md={3}>
                        <ListItemIcon>
                          <Brightness1Icon sx={{ color: result.value }} />
                        </ListItemIcon>
                      </Grid>
                    </>
                  ) : (
                    <Typography>
                      {result.attribute_name}: {result.value}{" "}
                    </Typography>
                  )}
                </Grid>
              ))}
          </Box>
          <Divider fullWidth />
          <Divider />
          <Box sx={{ py: 1 }}>
            <Box
              color="warning.main"
              style={{ display: "block", fontSize: 36 }}
            >
              {skusProduct ? <>PKR.{skusProduct.cost}  </> : <></>}
            </Box>

            <Box
              color="neutral"
              style={{ display: "block", textDecoration: "line-through" }}
            >
              {skusProduct ? <>PKR.{skusProduct.original_price}   <Divider /></> : <></>}
            </Box>
          </Box>

          <Grid md={12}>
            <Typography variant="h5">Skus</Typography>

            <Box md={6} sx={{ display: "flex", m: 1 }}>
              <Carousel
                // breakPoints={breakPoints}
                disableArrowsOnEnd={true}
                // showArrows={false}
                renderArrow={myArrow}
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
          <Grid container spacing={1}>

            <Grid item md={6} sm={6}>
              <Button
                fullWidth
                width="300px"
                variant="contained"
                color="info"
                type="submit"
                size="large"
                sx={{
                  background:
                    "linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%)",
                }}
                // href="/shipping_information"
                onClick={() => {
                  skusProduct
                    ? BuyHandler(productDetail, skusProduct)
                    : BuyHandler(productDetail);
                }}
              >
                Buy Now
              </Button>
            </Grid>
            <Grid item md={6} sm={6}>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  background: "linear-gradient(45deg, red 10%, yellow 100%)",
                }}
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
            </Grid>

          </Grid>
        </Grid>
        <Grid sx={{ bgcolor: "#fafafa" }} item md={3} sm={12} xs={12}>
          {" "}
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
            <List>
              <Typography display="inline-block">Service :</Typography>
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
            {/* <Button
              variant="text"
              onClick={() => viewStore(merchantDetail?.merchant_id)}
              // onClick={viewStore}
            >
              Visit Store
            </Button> */}
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
            <Typography display="inline-block">Sold By:</Typography>
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
                  variant="text"
                  onClick={() => viewStore(merchantDetail?.merchant_id)}
                // onClick={viewStore}
                >
                  Visit Store
                </Button>

              </ListItem>
            </List>
          </Box>
          <Divider />
        </Grid>

        <Grid container sx={{ p: 1 }}>
          <Grid item md={9} xs={9} sx={{ background: "white", p: 1 }}>
            <Grid container>{productDetail?.product_desc}</Grid>
            {/* <Grid item md={9} xs={9}>
              <Typography style={{ fontWeight: "bold" }}>Rating :</Typography>
            </Grid> */}
          </Grid>

          <Grid item md={3} xs={12}>
            <Typography style={{ fontWeight: "bold" }}>
              {" "}
              Similar Products :
            </Typography>
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
