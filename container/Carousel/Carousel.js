import React, { useState } from "react";
import Carousel from "react-elastic-carousel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ActionAreaCard from "../Card";
import { Box, Grid } from "@mui/material";
import Link from "@mui/material/Link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 4 },
  { width: 1200, itemsToShow: 5 },
];

export default function CarouselApp({
  product,
  heading,
  content,
  viewProduct,
  addToCartHandler,
  viewCategory,
}) {
  let [productView, setProuctView] = useState(false);
  let [categoryView, setCategoryView] = useState(false);
  let [cartView, setCartView] = useState(false);
  return (
    <Grid
      container
      // spacing={1}
      sx={{
        bgcolor: "#f6f9fc",
        // my: 1,
        height: "400px",
      }}
    >
      <Grid item md={6}>
        <Box
          sx={{
            ml: 7,
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            fontSize: "1.3rem",
            fontWeight: "700",
          }}
        >
          {heading}
        </Box>
      </Grid>

      <Grid item md={6} textAlign="right">
        <Box
          component="div"
          sx={{
            // display: "inline",
            mr: 6,
            // mx: 5,
            // my: 2,
          }}
        >
          <Button
            variant="text"
            href="/all_products"
            underline="none"
            size="small"
            endIcon={<KeyboardArrowRightIcon />}
          >
            View All
          </Button>
        </Box>
      </Grid>
      {/* <Grid md={12} sm={12}> */}
      <Carousel
        breakPoints={breakPoints}
        // disableArrowsOnEnd={false}
        showArrows={true}
        pagination={false}
        showEmptySlots={true}
        itemsToScroll={1}
        focusOnSelect={true}
        // enableSwipe={true}
        // enableMouseSwipe={true}
        enableAutoPlay={true}
        // autoPlaySpeed={2000}
        // itemsToShow={2}
      >
        {/* {content} */}

        {product &&
          product.map((item) => (
            <ActionAreaCard
              product={item}
              viewProduct={viewProduct}
              addToCartHandler={addToCartHandler}
              viewCategory={viewCategory}
              productView={productView}
              categoryView={categoryView}
              cartView={cartView}
            ></ActionAreaCard>
          ))}
      </Carousel>
      {/* </Grid> */}
    </Grid>
  );
}
