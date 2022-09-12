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
import AddIcon from "@mui/icons-material/Add";

import ImageListItemBar from "@mui/material/ImageListItemBar";
// import IconButton from "@mui/material/IconButton";
import Rating from "@mui/material/Rating";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";
import LoyaltyIcon from "@mui/icons-material/Loyalty";
import styles from "../../styles/card.module.css";
const DealsAndPromotions = ({ dealsData, viewProduct, styledCard }) => {
  console.log("Data Deals New", dealsData);
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

  let width = styledCard?.flexDirection == "row" ? "100%" : "277px";
  let height = styledCard?.flexDirection == "row" ? "100%" : "393px";

  return (
    <>
      {/* <ActionAreaCard /> */}
      {dealsData.map((result) => (
        <Card
          className={styles.card1}
          sx={{
            display: display,
            width: width,
            height: height,
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
            <Box sx={{ ...displayDesc }}>
              <Typography className={styles.prodName}>
                {result?.bundleName}
              </Typography>
              <Box component="div" className={styles.prodRating}>
                <Rating
                  // className={styles.Rating}
                  name="size-small"
                  defaultValue={result?.averageRating}
                  size="small"
                  // fontSize={24}
                  readOnly
                />
                {/* </Grid> */}
                {/* </Box> */}
                {/* <Box className={styles.btnBox}> */}
                {/* {result.bundleName ? (
                <Button
                  className={styles.btnAddCart}
                  variant="outlined"
                  key={result.id}
                  onClick={() => addToCartHandler(result)}
                  // endIcon={<AddShoppingCartOutlinedIcon fontSize="small" />}
                >
                  <AddShoppingCartOutlinedIcon />
                </Button>
              ) : (
                ""
              )} */}
              </Box>
              <Box component="div" className={styles.prodCost}>
                <Box display="flex">
                  <Typography className={styles.prodCostValue}>
                    Rs.{result?.bundleCost}
                  </Typography>

                  {result.discountPercent ? (
                    <Typography
                      className={styles.prodDiscountCost}
                      variant="overline"
                      component="div"
                      display="inline"
                      style={{ textDecorationLine: "line-through" }}
                    >
                      Rs {result.originalPrice}
                    </Typography>
                  ) : (
                    // <Typography variant="overline">
                    //   -{result.discountPercent}%
                    // </Typography>
                    <></>
                  )}
                </Box>
                <>
                  {" "}
                  <>
                    {result.bundleName ? (
                      <AddIcon
                        className={styles.btnAddCart}
                        onClick={() => addToCartHandler(result)}
                      />
                    ) : (
                      // <Button
                      //   className={styles.btnAddCart}
                      //   variant="outlined"
                      //   key={result.id}
                      //   onClick={() => addToCartHandler(result)}
                      //   // endIcon={<AddShoppingCartOutlinedIcon fontSize="small" />}
                      // >
                      //   <AddShoppingCartOutlinedIcon />
                      // </Button>
                      ""
                    )}
                  </>
                </>
              </Box>
            </Box>
            {/* <Box component="div" className={styles.prodRating}>
              <Rating
                className={styles.Rating}
                name="size-small"
                defaultValue={result?.averageRating}
                size="small"
                // fontSize={24}
                readOnly
              />

              {result.bundleName ? (
                <Button
                  className={styles.btnAddCart}
                  variant="outlined"
                  key={result.id}
                  onClick={() => addToCartHandler(result)}
                  // endIcon={<AddShoppingCartOutlinedIcon fontSize="small" />}
                >
                  <AddShoppingCartOutlinedIcon />
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
      ))}
    </>
  );
};

export default DealsAndPromotions;
