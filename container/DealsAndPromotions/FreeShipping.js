import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import Collapse from "@mui/material/Collapse";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
// import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import Chip from "@mui/material/Chip";
import IconButton from "@mui/material/IconButton";

const FreeShipping = ({ freeShippingData, viewProduct }) => {
  console.log("freeShippingData New", freeShippingData);
  return (
    <>
      {console.log(freeShippingData)}
      {/* <ActionAreaCard /> */}
      {freeShippingData.map((result) => (
        <Card

          sx={{
            mx: 0.4,
            my: 2,
            // marginTop: 1,
            // marginBottom: 1,
            padding: 0.5,
            // maxWidth: 300,
            width: 250,
            // maxWidth: 250,
            height: 300,
            ":hover": {
              boxShadow: 5, // theme.shadows[20]
              transform: "scale(1.05)",
              // opacity: 0.5,
              cursor: "pointer",
            },
          }}
        >
          <ImageListItem key={result?.productImage}>
            <Image
              data-aos="fade-up"
              // className={cx(styles.media, mediaStyles.root)}
              src={result?.productImage}
              onClick={(e) => viewProduct(result)}
              alt="shirt"
              width={245}
              height={240}
              loading="eager"
              priority
            ></Image>
            {result.isfreeShipping ? (
              <ImageListItemBar
                sx={{ background: "none" }}
                position="top"
                actionIcon={
                  <IconButton>
                    <Chip
                      sx={{ m: 1, color: "yellow" }}
                      icon={<StarBorderIcon />}
                      label="Free Shipping"
                      size="small"
                      color="success"
                    />
                  </IconButton>
                }
                actionPosition="left"
              />
            ) : (
              ""
            )}
          </ImageListItem>
          <CardMedia
            component="img"
            height="140"
            image={result?.productImage}
            alt={result.productName}
          />

          <CardContent>
            <Typography gutterBottom variant="overline" component="div">
              {result.productName}
            </Typography>

            <Typography gutterBottom variant="overline" component="div">
              Rs {result.productCost}
            </Typography>
            {result.isfreeShipping}
            <Typography gutterBottom variant="overline" component="div">
              {result.isfreeShipping}
            </Typography>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default FreeShipping;
