import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Collapse from "@mui/material/Collapse";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { Grid } from "@mui/material";
import ImageListItemBar from "@mui/material/ImageListItemBar";
// import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import styles from "../../styles/card.module.css";
const DealsAndPromotions = ({ dealsData, viewProduct }) => {
  console.log("Data Deals New", dealsData);
  return (
    <>
      {/* <ActionAreaCard /> */}
      {dealsData.map((result) => (
        <Card
          className={styles.card}
          sx={{
            width: "188px",
            // maxWidth: 280,
            height: "345px",
          }}
          // className={cx(styles.root)}
        >
          {result?.bundleImage && (
            <>
              <ImageListItem key={result.bundleImage}>
                <CardMedia
                  data-aos="fade-up"
                  component="img"
                  className={styles.cargImg}
                  onClick={(e) => viewProduct(result)}
                  image={result?.bundleImage}
                  alt={result?.bundleName}
                ></CardMedia>
                {result?.bundleImage ? (
                  <ImageListItemBar
                    sx={{ background: "none" }}
                    position="top"
                    actionIcon={
                      <IconButton>
                        <Chip
                          sx={{ height: 20, width: 75 }}
                          icon={<LoyaltyIcon />}
                          label="Deals"
                          size="small"
                          color="primary"
                        />
                      </IconButton>
                    }
                    actionPosition="right"
                  />
                ) : (
                  ""
                )}
                {/* <Image
                data-aos="fade-up"
                // className={cx(styles.media, mediaStyles.root)}
                src={result?.resultImage}
                onClick={(e) => viewresult(result)}
                alt={result?.resultName}
                width={245}
                height={240}
                loading="eager"
                priority
              ></Image> */}
                {/* {result.isfreeShipping ? (
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
                )} */}
              </ImageListItem>
            </>
          )}
          {/* {result?.category_image && (
            <Image
              // className={cx(styles.media, mediaStyles.root)}
              src={result?.category_image}
              onClick={(e) => viewCategory(result.category_id)}
              alt="shirt"
              width={245}
              height={200}
            // loading="eager"
            ></Image>
          )} */}

          <Box className={styles.cardContent} component="div">
            {/* <Typography variant="h5">{result?.categoryName}</Typography> */}
            {/* {result?.category_name && (
              <Typography variant="body">{result?.category_name}</Typography>
            )} */}
            {/* <Box sx={{ height: 85 }}>  */}
            <Box component="div" className={styles.prodName}>
              <Typography variant="body1">{result?.bundleName}</Typography>
            </Box>
            <Box component="div" className={styles.prodCost}>
              <Typography variant="subtitle1">
                Rs.{result?.bundleCost}
              </Typography>
            </Box>

            {result.discountPercent ? (
              <Grid className={styles.prodDiscountCost}>
                <Typography
                  variant="overline"
                  component="div"
                  display="inline"
                  style={{ textDecorationLine: "line-through" }}
                >
                  Rs {result.originalPrice}
                </Typography>
                {"   "}
                <Typography variant="overline">
                  -{result.discountPercent}%
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
            {/* <Grid md={3}> */}
            <Box component="div" className={styles.prodRating}>
              <Rating
                name="size-small"
                defaultValue={result?.averageRating}
                size="small"
                // fontSize={24}
                readOnly
              />
              {/* </Grid> */}
            </Box>
            <Box className={styles.btnBox}>
              {result.bundleName ? (
                <Button
                  className={styles.btnAddCart}
                  variant="outlined"
                  key={result.id}
                  onClick={() => addToCartHandler(result)}
                  // endIcon={<AddShoppingCartOutlinedIcon fontSize="small" />}
                >
                  Add To Cart
                </Button>
              ) : (
                ""
              )}
            </Box>

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
      ))}
    </>
  );
};

export default DealsAndPromotions;
