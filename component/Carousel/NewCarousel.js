import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Image from "next/image";
function NewCarousel({product}) {
  var items = product

  return (
    <Carousel
      animation="slide"
      swipe
      interval={1000}
      NextIcon={<ArrowRightIcon />}
      PrevIcon={<ArrowLeftIcon />}
    >
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  );
}

function Item(props) {
  return (
    <Paper>
       {props?.item.productImage && (
      <Image
        // layout="fill"
        width={1400}
        height={400}
        // style={{ width: "100%", height: "300px" }}
        src={props?.item.productImage}
      ></Image>
       )}
      {/* <h2>{props.item.name}</h2>
      <p>{props.item.description}</p> */}
    </Paper>
  );
}

export default NewCarousel;
