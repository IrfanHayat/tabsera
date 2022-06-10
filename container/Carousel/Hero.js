import React from "react";
import { Grid, Typography, Button, Box } from "@mui/material";
import Carousel from "react-elastic-carousel";
import ActionAreaCard from "../Card";
import Image from "next/image";
const Hero = ({ product, heading, content, viewProduct, addToCartHandler }) => {
  return (
    <Box>
      <Grid container spacing={6}>
        <Grid item xs={12} md={12}>
          <Carousel
            // breakPoints={breakPoints}
            // disableArrowsOnEnd={false}
            // showArrows={false}
            pagination={false}
            itemsToShow={1}
          >
            {/* {content} */}

            {/* {product?.map((item) => ( */}
            <Image
              src="/lion.js"
              width={2000}
              height={400}
              // viewProduct={viewProduct}
              // addToCartHandler={addToCartHandler}
            ></Image>
            {/* ))} */}
          </Carousel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
