import Box from "@mui/system/Box";
import React, { useState } from "react";

import Carousel from "react-elastic-carousel";
import Common from "./Common";
// import Item from "./Item";
// import "./styles.css";
const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 3 },
];
export default function MenuCard({
  heading,
  dealsData,
  discountsData,
  freeShippingData,
}) {
  console.log(dealsData);
  console.log(discountsData);
  console.log(freeShippingData);
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
        enableSwipe={true}
        // enableMouseSwipe={true}
        enableAutoPlay={true}
        // autoPlaySpeed={2000}
        // itemsToShow={2}
        // itemsToShow={3}
        breakPoints={breakPoints}
      >
        <Common
          DealName="Deals"
          address="deals_and_promotions"
          imagePath="/deals.jpg"
        />
        <Common
          DealName="Discounts"
          address="discounts"
          imagePath="/sales.jpg"
        />
        <Common
          DealName="FreeShipping"
          address="is_free_shipping"
          imagePath="/freeshippings.jpg"
        />
        {/* <Common DealName="Coupons" address="coupons" /> */}
      </Carousel>
    </div>
  );
}
