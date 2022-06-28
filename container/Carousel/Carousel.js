import React, { useState } from "react";
import Carousel from "react-elastic-carousel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ActionAreaCard from "../Card";
import { Box } from "@mui/material";

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
    <Box
      sx={{
        bgcolor: "#fafafa",
        my: 2,
      }}
    >
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
        }}
      >
        <Box
          component="div"
          sx={{
            display: "inline",
            mx: 5,
            my: 2,
            // bgcolor: (theme) =>
            //   theme.palette.mode === "dark" ? "#101010" : "#fff",
            color: (theme) =>
              theme.palette.mode === "dark" ? "grey.300" : "grey.800",
            // border: "1px solid",
            borderColor: (theme) =>
              theme.palette.mode === "dark" ? "grey.800" : "grey.300",
            // borderRadius: 2,
            fontSize: "1.5rem",
            fontWeight: "700",
          }}
        >
          {/* <Typography sx={{ marginLeft: 5 }} variant="h5"> */}
          {heading}
          {/* </Typography> */}
        </Box>
        {/* <Box
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "space-between",
          }}
        ></Box> */}
        <Box
          component="div"
          sx={{
            display: "inline",
            mx: 5,
            my: 2,
          }}
        >
          <Button
            href="/all_products"
            variant="outlined"
            sx={{
              fontSize: "14px",
              // bgcolor: "white",
              color: "blue",

              ":hover": {
                bgcolor: "blue",
                color: "white",
              },
            }}
            size="small"
          >
            View All
          </Button>
        </Box>
      </div>

      {/* <Box
        component="div"
        sx={{
          display: "inline",
          p: 1,
          m: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      > */}
      {/* <Typography sx={{ marginLeft: 5 }} variant="h5">
        {heading}
      </Typography> */}
      {/* </Box> */}
      {/* <Box
        component="div"
        sx={{
          display: "inline",
          p: 1,
          m: 1,
          bgcolor: (theme) =>
            theme.palette.mode === "dark" ? "#101010" : "#fff",
          color: (theme) =>
            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
          border: "1px solid",
          borderColor: (theme) =>
            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        }}
      > */}
      {/* <Button
        href="/all_products"
        variant="outlined"
        style={{ fontSize: "10px" }}
        size="small"
      >
        View All
      </Button> */}
      {/* </Box> */}
      <Carousel
        breakPoints={breakPoints}
        // disableArrowsOnEnd={false}
        // showArrows={false}
        pagination={false}
        showEmptySlots={true}
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
    </Box>
  );
}
