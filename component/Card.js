import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Button, CardActions } from "@mui/material";
import Image from "next/image";
import { CardMedia } from "@mui/material"
export default function ActionAreaCard({
  product,
  viewProduct,
  addToCartHandler,
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", margin: "10,19" }}>
        
        <Card sx={{ maxWidth: 270 }}>
        <CardMedia
          component="img"
          height="14"
          image={product.productImage}
          alt="green iguana"
          style={{ margin: "5px" }}
        />
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
