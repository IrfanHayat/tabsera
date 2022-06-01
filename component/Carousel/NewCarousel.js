import React from "react";
import Carousel from "react-material-ui-carousel";
import { Paper, Button } from "@mui/material";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import Image from "next/image";
function NewCarousel(props) {
  var items = [
    {
      imgdata:
        "https://b.zmtcdn.com/data/pictures/9/18857339/8f53919f1175c08cf0f0371b73704f9b_o2_featured_v2.jpg?output-format=webp",
      name: "Random Name #1",
      description: "Probably the most random thing you have ever seen!",
    },
    {
      imgdata:
        "https://b.zmtcdn.com/data/pictures/chains/1/19708611/10f90d4a69678d98662514d173b29665_o2_featured_v2.jpg",

      name: "Random Name #2",
      description: "Hello World!",
    },
  ];

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
      <Image
        // layout="fill"
        width={1400}
        height={400}
        // style={{ width: "100%", height: "300px" }}
        src={props.item.imgdata}
      ></Image>
      {/* <h2>{props.item.name}</h2>
      <p>{props.item.description}</p> */}
    </Paper>
  );
}

export default NewCarousel;
