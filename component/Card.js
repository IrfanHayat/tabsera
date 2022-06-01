import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import Image from "next/image";

export default function ActionAreaCard({
  product,
  viewProduct,
  addToCartHandler,
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", margin: "10,19" }}>
      {product.map((item) => (
        <Card sx={{ maxWidth: 345 }}>
          <Image
            src={item.imgdata}
            alt="shirt"
            width={345}
            height={200}
          ></Image>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.rname}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.somedata}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.price}
            </Typography>
          </CardContent>

          <CardActions>
            <Button
              key={item.id}
              onClick={(e) => viewProduct(item)}
              variant="contained"
            >
              View Product
            </Button>
            <Button
              key={item.id}
              onClick={(e) => addToCartHandler(item)}
              variant="contained"
            >
              Add To Cart
            </Button>
          </CardActions>
        </Card>
      ))}
    </div>
  );
}
