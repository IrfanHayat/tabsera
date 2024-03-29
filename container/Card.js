import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import Card from "@mui/material/Card";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import { Box } from "@mui/system";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import makeStyles from "@mui/styles/makeStyles";
import { useSpring, animated } from "react-spring";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
// import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Chip from "@mui/material/Chip";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { CardMedia, Button, Grid, AppBar } from "@mui/material";
import Badge from "@mui/material/Badge";
import { result } from "lodash";
import styles from "../styles/card.module.css";
import AddIcon from "@mui/icons-material/Add";
import Currency from "../container/Currency/currency";
export default function ActionAreaCard({
  product,
  viewProduct,
  viewCategory,
  addToCartHandler,
  styledCard,
  productView,
  categoryView,
  cartView,
}) {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });
  const AnimatedTypography = animated(Typography);

  // let height = product.discountPercent ? 350 : 320;
  let display = styledCard ? styledCard : "";
  let displayDesc =
    styledCard?.flexDirection == "row"
      ? {
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        m: 1,

        // justifyContent: "space-between",
        // justifyContent: "space-arounf",
      }
      : { height: 85 };
  let width = styledCard?.flexDirection == "row" ? "400px" : "277px";
  let height = styledCard?.flexDirection == "row" ? "100%" : "393px";

  return (
    <>
      <Card
        // className={styledCard?.flexDirection == "row" ? "" : styles.column}
        className={styles.card1}
        // className={styles.card}
        sx={{
          display: display,
          width: width,
          height: height,
        }}
      >
        {product?.bundleImage && (
          <center className={styles.cargImgBox}>
            <ImageListItem key={product.bundleImage}>
              <CardMedia
                data-aos="fade-up"
                component="img"
                className={styles.cargImg}
                onClick={(e) => viewProduct(product)}
                image={product?.bundleImage}
                alt={product?.bundleName}
              ></CardMedia>
              {/* <Image
              data-aos="fade-up"
              // className={cx(styles.media, mediaStyles.root)}
              src={product?.productImage}
              onClick={(e) => viewProduct(product)}
              alt={product?.productName}
              width={245}
              height={240}
              loading="eager"
              priority
            ></Image> */}
              {/* {product.isfreeShipping ? (
                <ImageListItemBar
                  sx={{ background: "none" }}
                  position="top"
                  actionIcon={
                    <IconButton>
                      <Chip
                        sx={{ height: 20, width: 65 }}
                        icon={<LocalShippingIcon />}
                        label="Free"
                        size="small"
                        color="error"
                      />
                    </IconButton>
                  }
                  actionPosition="right"
                />
              ) : (
                ""
              )} */}
            </ImageListItem>
          </center>
        )}
        {product?.productImage && (
          <center className={styles.cargImgBox}>
            <ImageListItem key={product.productImage}>
              <CardMedia
                data-aos="fade-up"
                component="img"
                onClick={(e) => viewProduct(product)}
                image={product?.productImage}
                alt={product?.productName}
                className={styles.cargImg}
              ></CardMedia>
              {/* <Image
              data-aos="fade-up"
              // className={cx(styles.media, mediaStyles.root)}
              src={product?.productImage}
              onClick={(e) => viewProduct(product)}
              alt={product?.productName}
              width={245}
              height={240}
              loading="eager"
              priority
            ></Image> */}
              {product.isfreeShipping ? (
                <ImageListItemBar
                  sx={{ background: "none" }}
                  position="top"
                  actionIcon={
                    <IconButton>
                      <Chip
                        sx={{ height: 20, width: 65 }}
                        icon={<LocalShippingIcon />}
                        label="Free"
                        size="small"
                        color="error"
                      />
                    </IconButton>
                  }
                  actionPosition="right"
                />
              ) : (
                ""
              )}
            </ImageListItem>
          </center>
        )}
        {product?.category_image && (
          <center className={styles.cargImgBox}>
            <ImageListItem key={product.category_image}>
              <CardMedia
                data-aos="fade-up"
                component="img"
                className={styles.cargImg}
                onClick={(e) => viewProduct(product)}
                image={product?.category_image}
                alt={product?.bundleName}
              ></CardMedia>

              {/* <Image
              // className={cx(styles.media, mediaStyles.root)}
              src={product?.category_image}
              onClick={(e) => viewCategory(product.category_id)}
              alt="shirt"
              width={245}
              height={200}
              // loading="eager"
            ></Image> */}
            </ImageListItem>
          </center>
        )}

        <Box className={styles.cardContent} component="div">
          {/* <Typography variant="h5">{product?.categoryName}</Typography> */}
          <Box sx={{ ...displayDesc }}>
            {product?.category_name && (
              <Typography variant="h5">{product?.category_name}</Typography>
            )}

            <Typography className={styles.prodName}>
              {product?.productName
                ? product?.productName.toUpperCase()
                : product?.bundleName.toUpperCase()}
            </Typography>

            <Box component="div" className={styles.prodRating}>
              <Rating
                // className={styles.Rating}
                name="size-small"
                defaultValue={product?.averageRating}
                size="small"
                // fontSize={24}
                readOnly
              />
              {/* {product.productName ? (
                <AddShoppingCartOutlinedIcon className={styles.btnAddCart} />
              ) : (
                ""
              )} */}
            </Box>

            <Box component="div" className={styles.prodCost}>
              <Box display="flex">
                <Typography className={styles.prodCostValue}>
                  <Currency
                    amount={
                      product?.productCost
                        ? product?.productCost
                        : product?.bundleCost
                    }
                  ></Currency>
                </Typography>
                {product?.discountPercent ? (
                  <Typography
                    className={styles.prodDiscountCost}
                    style={{
                      textDecorationLine: "line-through",
                    }}
                    variant="overline"
                    // component="div"
                    display="inline"
                  >
                    Rs {product.originalPrice}
                  </Typography>
                ) : (
                  <></>
                )}
              </Box>
              <>
                {product?.productName ? (
                  <AddIcon
                    className={styles.btnAddCart}
                    onClick={() => addToCartHandler(product)}
                  />
                ) : (
                  ""
                )}
              </>
            </Box>
          </Box>
          {/* <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
            {product.productName ? (
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%)",
                }}
                size="small"
                key={product.id}
                onClick={() => addToCartHandler(product)}
                endIcon={<AddShoppingCartOutlinedIcon fontSize="small" />}
              >
                Add To Cart
              </Button>
            ) : (
              ""
            )}
          </Box> */}
          {/* {product.productName ? (
            <IconButton
              key={product.id}
              onClick={() => addToCartHandler(product)}
              color="primary"
              aria-label="add to shopping cart"
            >
              <AddShoppingCartOutlinedIcon fontSize="small" />
            </IconButton>
          ) : (
            ""
          )} */}
          {/* </Box> */}
        </Box>
      </Card>
    </>
  );
}
