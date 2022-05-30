import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
//import CardMedia from '@mui/material/CardMedia';
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Detail from "../component/Detail";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CardActions from "@mui/material/CardActions";
export default function ActionAreaCard({ product, viewProduct }) {
  return (
    <Box style={{ display: "flex", flexWrap: "wrap" }}>
      {product.map((item) => (
        <Card>
          {/* <CardActionArea> */}
          <Image
            src={item.imgdata}
            alt="shirt"
            width={100}
            height={300}
          ></Image>
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.rname}
            </Typography>
            <Typography color="text.secondary">{item.somedata}</Typography>
            <Typography color="text.secondary">{item.price}</Typography>
          </CardContent>
          <CardActions>
            {/* <Typography color="text.secondary"> */}
            <Button key={item.id} onClick={(e) => viewProduct(item)}>
              View Product
            </Button>
          </CardActions>
          {/* </Typography> */}
          {/* </CardActionArea> */}
        </Card>
      ))}
    </Box>
  );
}
