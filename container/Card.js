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
        // border: 0,
        bgcolor: "background.paper",
        padding: 0.5,
        width: 200,
        // maxWidth: 280,
        height: 300,
        ":hover": {
          border: 1,
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
            <Image
              data-aos="fade-up"
              // className={cx(styles.media, mediaStyles.root)}
              src={product?.productImage}
              onClick={(e) => viewProduct(product)}
              alt="shirt"
              width={245}
              height={240}
              loading="eager"
              priority
            ></Image>
            {product.isfreeShipping ? (
              <ImageListItemBar
                sx={{ background: "none" }}
                position="top"
                actionIcon={
                  <IconButton>
                    <Chip
                      sx={{ color: "yellow" }}
                      icon={<StarBorderIcon />}
                      label="Free Shipping"
                      size="small"
                      color="success"
                    />
                  </IconButton>
                }
                actionPosition="left"
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
      )
      }
      {
        product?.category_name && (
          <CardContent>
            <Typography variant="body">{product?.category_name}</Typography>
          </CardContent>
        )
      }
      <CardContent>
        {/* <Typography variant="h5">{product?.categoryName}</Typography> */}
        <Typography fontSize="0.9rem" variant="h5" fontWeight={600}>
          {product?.productName}
        </Typography>
        {/* <Typography variant="h5" sx={{ color: "error.main" }}>
          {" "}
          RS. {product?.productCost}
        </Typography> */}

        {/* <Typography fontSize="0.9rem" variant="h5" fontWeight={600}>
          {product?.averageRating}
        </Typography> */}
        <Stack spacing={1}>
          <Rating
            name="size-small"
            defaultValue={product?.averageRating}
            size="small"
            readOnly
          />
        </Stack>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // p: 1,
            // m: 1,
            alignContent: "center",
            bgcolor: "background.paper",
            borderRadius: 1,
          }}
        >
          {/* {product.productName ? (
          <IconButton
            key={product.id}
            onClick={(e) => viewProduct(product)}
            color="primary"
            aria-label="add to shopping cart"
          >
            <PreviewOutlinedIcon />
          </IconButton>
        ) : (
          ""
        )}

        {product?.category_name && (
          <IconButton
            key={product.id}
            onClick={(e) => viewCategory(product.category_id)}
            color="primary"
            aria-label="add to shopping cart"
          >
            <PreviewOutlinedIcon />
          </IconButton>
        )} */}
          <Typography variant="h5" sx={{ color: "error.main", p: 1 }}>
            {" "}
            RS. {product?.productCost}
          </Typography>
          {product.productName ? (
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
          )}
        </Box>
      </CardContent>
    </Card >
    // </Box>
  );
}
