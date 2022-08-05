import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import result from "../Carousel/lion.jpg";
import { useRouter } from "next/router";
const Common = ({ DealName, address, imagePath }) => {
  let router = useRouter();
  return (
    <>
      <Card
        sx={{
          mx: 0.4,
          my: 2,
          // marginTop: 1,
          // marginBottom: 1,
          padding: 0.5,
          // maxWidth: 300,
          width: 250,
          height: 200,
          ":hover": {
            boxShadow: 5, // theme.shadows[20]
            transform: "scale(1.05)",
            // opacity: 0.5,
            cursor: "pointer",
          },
        }}
        onClick={(e) => router.push(`/${address}`)}
      >
        <CardMedia
          component="img"
          height="140"
          image={imagePath}
          alt="deals & Promotions"
        />

        <CardContent>
          <Typography gutterBottom variant="overline" component="div">
            {DealName}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
};

export default Common;
