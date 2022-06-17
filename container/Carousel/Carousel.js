import React,{useState} from "react";
import Carousel from "react-elastic-carousel";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ActionAreaCard from "../Card";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

export default function CarouselApp({
  product,
  heading,
  content,
  viewProduct,
  addToCartHandler,
  viewCategory
}) {
  //console.log("Hellow");
  //console.log(product);
  let [productView,setProuctView]=useState(false)
  let [categoryView,setCategoryView]=useState(false)
  let [cartView,setCartView]=useState(false)
  return (
    <div>
      <Typography variant="h5">{heading}</Typography>

      <Carousel
        breakPoints={breakPoints}
        // disableArrowsOnEnd={false}
        // showArrows={false}
        pagination={false}
        showEmptySlots={true}
        // itemsToShow={2}
      >
        {/* {content} */}

        {product && product.map((item) => (
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
      <Button
        href="/all_products"
        variant="outlined"
        style={{ fontSize: "10px" }}
        size="small"
      >
        View All
      </Button>
    </div>
  );
}
