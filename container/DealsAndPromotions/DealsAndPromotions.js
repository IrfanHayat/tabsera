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
const DealsAndPromotions = ({ dealsData, viewProduct }) => {
  console.log("Data Deals New", dealsData);
  return (
    <>
      {/* <ActionAreaCard /> */}
      {dealsData.map((result) => (
        <Card
          sx={{
            m: 0.7,
            // display: "flex",
            // mx: 0.4,
            // my: 2,
            // marginTop: 1,
            // marginBottom: 1,
            boxShadow: 0,
            borderRadius: 0,
            // border: 1,
            // borderColor: "#9E9E9E ",
            bgcolor: "background.paper",
            padding: 0.5,
            width: 212,
            // maxWidth: 280,
            height: 285,
            ":hover": {
              border: 1,
              borderColor: "#9E9E9E ",
              boxShadow: 1, // theme.shadows[20]
              transform: "scale(1)",
              // opacity: 0.5,

              cursor: "pointer",
            },
          }}
        // className={cx(styles.root)}
        >
          {result?.bundleImage && (
            <>
              <ImageListItem key={result.bundleImage}>
                <CardMedia
                  // component="img"
                  data-aos="fade-up"
                  component="img"
                  // height="194"
                  onClick={(e) => viewProduct(result)}
                  image={result?.bundleImage}
                  alt={result?.bundleName}
                  sx={{
                    top: 0,
                    width: "100%",
                    height: 170,
                    objectFit: "cover",
                    // position: "absolute",
                    // maxHeight: { xs: 233, md: 167 },
                    // maxWidth: { xs: 350, md: 250 },
                  }}
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

          <Box sx={{ mx: 1 }}>
            {/* <Typography variant="h5">{result?.categoryName}</Typography> */}
            {/* {result?.category_name && (
              <Typography variant="body">{result?.category_name}</Typography>
            )} */}
            {/* <Box sx={{ height: 85 }}>  */}
            <Typography
              fontSize="0.9rem"
              variant="h5"
              fontWeight={600}
              // display="inline"
              noWrap
            >
              {result?.bundleName}
            </Typography>

            <Typography
              fontSize="1rem"
              variant="h5"
              fontWeight={600}
              sx={{ color: "warning.dark" }}
            >
              {" "}
              RS. {result?.bundleCost}
            </Typography>
            {result.discountPercent ? (
              <>
                <Typography
                  fontSize="0.7rem"
                  style={{ textDecorationLine: "line-through" }}
                >
                  Rs {result.originalPrice}
                </Typography>
                {"   "}
                <Typography fontSize="0.7rem">
                  - {result.discountPercent} %
                </Typography>
              </>
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
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Rating
                name="size-small"
                defaultValue={result?.averageRating}
                size="small"
                // fontSize={24}
                readOnly
              />
              {/* </Grid> */}
              {/* </Box> */}
              {result.bundleName ? (
                <Button
                  variant="contained"
                  sx={{
                    background:
                      "linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%)",
                  }}
                  size="small"
                  key={result.id}
                  onClick={() => addToCartHandler(result)}
                  endIcon={<AddShoppingCartOutlinedIcon fontSize="small" />}
                >
                  {" "}
                  {/* Add To Cart */}
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
