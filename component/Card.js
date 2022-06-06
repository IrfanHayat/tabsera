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
      <Card sx={{ maxWidth: 270 }}>
        <Image
          src={product.imgdata}
          alt="shirt"
          width={270}
          height={160}
        ></Image>
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
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
            variant="contained"
            size="small"
            style={{ fontSize: "10px" }}
          >
            View Product
          </Button>
          <Button
            key={product.id}
            onClick={(e) => addToCartHandler(product)}
            variant="contained"
            // color="success"
            // labelStyle={{ fontSize: 15 }}
            style={{ fontSize: "10px" }}
            size="small"
          >
            Add To Cart
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}
