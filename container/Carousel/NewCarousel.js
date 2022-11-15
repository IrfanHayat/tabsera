import React, { useState } from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import ActionAreaCard from "../Card";
import Image from "next/image";
function NewCarousel({
  product,
  heading,
  content,
  viewProduct,
  addToCartHandler,
  viewCategory,
}) {
  var items = product;
  let [productView, setProuctView] = useState(false);
  let [categoryView, setCategoryView] = useState(false);
  let [cartView, setCartView] = useState(false);
  const [rtl, setrtl] = useState(false);


  return (
    <Carousel
      animation="slide"
      swipe
      interval={1000}
      NextIcon={<ArrowRightIcon />}
      PrevIcon={<ArrowLeftIcon />}
    >
      {product?.map((item, index) => (
        //   <Image
        //   // layout="fill"
        //   width={2000}
        //   // object-fit="cover"
        //   objectFit="contain"
        //   height={500}
        //   // style={{ width: "100%", height: "300px" }}
        //   src={props?.item?.productImage}
        // ></Image>
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
  );
}

function Item(props) {
  return (
    <Paper>
      {props?.item?.productImage && (
        <Image
          // layout="fill"
          width={2000}
          // object-fit="cover"
          objectFit="contain"
          height={500}
          // style={{ width: "100%", height: "300px" }}
          src={props?.item?.productImage}
        ></Image>
      )}
      {/* <h2>{props.item.name}</h2>
      <p>{props.item.description}</p> */}
    </Paper>
  );
}

export default NewCarousel;
