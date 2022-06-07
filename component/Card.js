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
    
        <Card sx={{ maxWidth: 345 }}>
          <Image
            src={product.productImage}
            alt="shirt"
            width={345}
            height={200}
          ></Image>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {product.productName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.categoryName}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.productCost}
            </Typography>
          </CardContent>

          <CardActions>
            <Button
              key={product.id}
              onClick={(e) => viewProduct(product)}
              variant="contained"
            >
              View Product
            </Button>
            <Button
              key={product.id}
              onClick={(e) => addToCartHandler(product)}
              variant="contained"
            >
              Add To Cart
            </Button>
          </CardActions>
        </Card>
    
    </div>
  );
}
