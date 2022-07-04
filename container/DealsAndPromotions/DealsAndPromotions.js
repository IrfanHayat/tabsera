import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
const DealsAndPromotions = ({ dealsData }) => {
  console.log("Data Deals New", dealsData);
  return (
    <>
      {dealsData.map((result) => (
        <Card
          sx={{
            mx: 0.4,
            my: 2,
            // marginTop: 1,
            // marginBottom: 1,
            padding: 0.5,
            // maxWidth: 300,
            maxWidth: 250,
            height: 250,
            ":hover": {
              boxShadow: 5, // theme.shadows[20]
              transform: "scale(1.05)",
              // opacity: 0.5,
              cursor: "pointer",
            },
          }}
        >
          <CardMedia
            component="img"
            height="140"
            image={result?.bundleImage}
            alt="green iguana"
          />

          <CardContent>
            <Typography gutterBottom variant="overline" component="div">
              {result.bundleName}
            </Typography>
            <Typography gutterBottom variant="overline" component="div">
              {result.bundleCost}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default DealsAndPromotions;
