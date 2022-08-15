import React, { useState } from "react";
import Carousel from "react-elastic-carousel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ActionAreaCard from "../Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Link from "@mui/material/Link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import DoubleArrowIcon from "@mui/icons-material/DoubleArrow";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 5 },
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
  const [rtl, setrtl] = useState(false);
  console.log(product);
  return (
    <Box
      // container
      // spacing={1}

      style={{ width: "100%" }}
      sx={{
        bgcolor: "background.paper",
        mt: 2,
        // p: 2,
        // height: "500px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // p: 1,
          m: 1,
          // flexWrap: "wrap",
          // bgcolor: "background.paper",
          borderRadius: 1,
        }}
      >
        <Box
          sx={{
            mx: 5,
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            fontSize: "1.1rem",
            fontWeight: "600",
          }}
        >
          {heading}
        </Box>

        <Box
          component="div"
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            // display: "inline",
            mx: 5,
            // flexWrap: "wrap",
            // mx: 5,
            // my: 2,
          }}
        >
          <Button
            // dir="rtl"
            variant="text"
            href="/all_products"
            underline="none"
            size="small"
            sx={{ fontSize: "0.70rem", fontWeight: "600" }}
            // style={{ fontWeight: "bold" }}
            // dir="rtl"
            // endIcon={<DoubleArrowIcon />}
          >
            View All {">>"}
          </Button>
        </Box>
      </Box>

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
        // enableAutoPlay={true}
        // autoPlaySpeed={2000}
        // itemsToShow={2}
      >
        {product?.map((item, index) => (
          <ActionAreaCard
            key={index}
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
    </Box>
  );
}
