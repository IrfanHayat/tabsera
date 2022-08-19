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
import { CardMedia, Button, Grid } from "@mui/material";
import { result } from "lodash";
export default function ActionAreaCard({
  product,
  viewProduct,
  viewCategory,
  addToCartHandler,
  productView,
  categoryView,
  cartView,
}) {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
  });
  const AnimatedTypography = animated(Typography);
  console.log("freee", product);
  let height = product.discountPercent ? "57vh" : "57vh";
  return (
    // <Box>

    <Card
      sx={{
        m: 1,
        // mx: 0.4,
        // my: 2,
        // marginTop: 1,
        // marginBottom: 1,
        boxShadow: 0,
        borderRadius: 2,
        // border: 1,
        // borderColor: "#9E9E9E ",
        bgcolor: "background.paper",
        // padding: 0.5,
        width: 250,
        // maxWidth: 280,
        height: { height },
        ":hover": {
          border: 1,
          borderColor: "#9E9E9E ",
          boxShadow: 1, // theme.shadows[20]
          transform: "scale(1.05)",
          // opacity: 0.5,

          cursor: "pointer",
        },
      }}
    // className={cx(styles.root)}
    >
      {product?.productImage && (
        <>
          <ImageListItem key={product.productImage}>
            <CardMedia
              // component="img"
              data-aos="fade-up"
              component="img"
              // height="194"
              onClick={(e) => viewProduct(product)}
              image={product?.productImage}
              alt={product?.productName}
              sx={{
                top: 0,
                width: "100%",
                height: 200,
                objectFit: "cover",
                // position: "absolute",
                // maxHeight: { xs: 233, md: 167 },
                // maxWidth: { xs: 350, md: 250 },
              }}
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
                      // sx={{ color: "yellow" }}
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
        </>
      )}
      {product?.category_image && (
        <Image
          // className={cx(styles.media, mediaStyles.root)}
          src={product?.category_image}
          onClick={(e) => viewCategory(product.category_id)}
          alt="shirt"
          width={245}
          height={200}
        // loading="eager"
        ></Image>
      )}

      <Grid md={12} sx={{ m: 0.5 }}>
        {/* <Typography variant="h5">{product?.categoryName}</Typography> */}
        {product?.category_name && (
          <Typography variant="body">{product?.category_name}</Typography>
        )}

        <Typography
          fontSize="0.9rem"
          variant="h5"
          fontWeight={600}
          // display="inline"
          noWrap
        >
          {product?.productName}
        </Typography>

        <Typography
          fontSize="1rem"
          variant="h5"
          fontWeight={600}
          sx={{ color: "warning.dark" }}
        >
          {" "}
          RS. {product?.productCost}
        </Typography>
        {product.discountPercent ? (
          <Grid sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography
              fontSize="0.7rem"


              style={{ textDecorationLine: "line-through" }}
            >
              Rs {product.originalPrice}
            </Typography>
            {"   "}
            <Typography fontSize="0.7rem">
              - {product.discountPercent} %
            </Typography>
          </Grid>
        ) : (
          <></>
        )}
        {/* <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // p: 1,
            // m: 1,
            alignContent: "center",
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        > */}
        <Grid md={3}>
          <Rating
            name="size-small"
            defaultValue={product?.averageRating}
            size="small"
            // fontSize={24}
            readOnly
          />
        </Grid>
        <Grid md={6}>
          {product.productName ? (
            <Button
              variant="contained"
              size="small"

              key={product.id}
              onClick={() => addToCartHandler(product)}
              endIcon={<AddShoppingCartOutlinedIcon fontSize="small" />}
            >
              {" "}
              Add To Cart
            </Button>
          ) : (
            ""
          )}
        </Grid>

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
      </Grid>
    </Card>
    // </Box>
  );
}
