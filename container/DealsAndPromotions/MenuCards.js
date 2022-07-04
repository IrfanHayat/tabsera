import { Box } from "@mui/system";
import React, { useState } from "react";
import ReactDOM from "react-dom";
import Carousel from "react-elastic-carousel";
import Common from "./Common";
// import Item from "./Item";
// import "./styles.css";

export default function MenuCard({ heading }) {
  return (
    <div className="carousel-wrapper">
      <Box
        sx={{
          mx: 4,
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
      <Carousel
        // disableArrowsOnEnd={false}
        showArrows={false}
        pagination={false}
        showEmptySlots={true}
        itemsToScroll={1}
        focusOnSelect={true}
        // enableSwipe={true}
        // enableMouseSwipe={true}
        enableAutoPlay={true}
        // autoPlaySpeed={2000}
        // itemsToShow={2}
        itemsToShow={4}
      >
        <Common DealName="Deals" />
        <Common DealName="Discounts" />
        <Common DealName="FreeShipping" />
        <Common DealName="Coupons" />
      </Carousel>
    </div>
  );
}
