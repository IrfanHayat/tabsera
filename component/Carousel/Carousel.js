import React from "react";
import Carousel from "react-elastic-carousel";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Image from "next/image";
// import ProductCard from "../Card";
import  ActionAreaCard from '../Card'

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 2 },
];

// function ProductCard({ product, viewProduct, addToCartHandler }) {

//   return (
//     <Card sx={{ maxWidth: 345 }}>
//       <Image
//         src={product.imgdata}
//         alt={product.rname}
//         width={345}
//         height={200}
//       />
//       <CardContent>
//         <Typography gutterBottom variant="h5" component="div">
//           {product.rname}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {product.somedata}
//         </Typography>
//         <Typography variant="body2" color="text.secondary">
//           {product.price}
//         </Typography>
//       </CardContent>

//       <CardActions>
//         <Button
//           key={product.id}
//           onClick={(e) => viewProduct(product)}
//           variant="outlined"
//         >
//           View Product
//         </Button>
//         <Button
//           key={product.id}
//           onClick={(e) => addToCartHandler(product)}
//           variant="outlined"
//         >
//           Add To Cart
//         </Button>
//       </CardActions>
//     </Card>
//   );
// }

function CarouselItem({ product, addToCartHandler, viewProduct }) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <Image
        src={product.imgdata}
        alt={product.rname}
        width={345}
        height={200}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {product.rname}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.somedata}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.price}
        </Typography>
      </CardContent>

      <CardActions>
        <Button
          key={product.id}
          onClick={(e) => viewProduct(product)}
          variant="outlined"
        >
          View Product
        </Button>
        <Button
          key={product.id}
          onClick={(e) => addToCartHandler(product)}
          variant="outlined"
        >
          Add To Cart
        </Button>
      </CardActions>
    </Card>
  );
}

export default function CarouselApp({
  product,
  heading,
  content,
  viewProduct,
  addToCartHandler,
}) {
  console.log("Hellow");
  console.log(product);
  return (
    <div>
      <Typography variant="h3">{heading}</Typography>

      <Carousel breakPoints={breakPoints}>
        {/* {content} */}
       
         {product.map((item) => (
        <ActionAreaCard
          product={item}
          viewProduct={viewProduct}
          addToCartHandler={addToCartHandler}
        ></ActionAreaCard>)) }

      
      </Carousel>
      <Button variant="outlined">View All</Button>
    </div>
  );
}

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);
