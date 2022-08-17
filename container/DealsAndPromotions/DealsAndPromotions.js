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
const DealsAndPromotions = ({ dealsData, viewProduct }) => {
  console.log("Data Deals New", dealsData);
  return (
    <>
      {/* <ActionAreaCard /> */}
      {dealsData.map((result) => (
        <Card
          onClick={(e) => viewProduct(result)}
          sx={{
            mx: 0.4,
            my: 2,
            // marginTop: 1,
            // marginBottom: 1,
            padding: 0.5,
            // maxWidth: 300,
            width: 250,
            // maxWidth: 250,
            height: 350,
            ":hover": {
              boxShadow: 5, // theme.shadows[20]
              transform: "scale(1.05)",
              // opacity: 0.5,
              cursor: "pointer",
            },
          }}
        >
          <ImageListItem key={result?.bundleImage}>
            <Image
              data-aos="fade-up"
              // className={cx(styles.media, mediaStyles.root)}
              src={result?.bundleImage}
              onClick={(e) => viewProduct(result)}
              alt={result?.bundleName}
              width={245}
              height={240}
              loading="eager"
              priority
            ></Image>

            <ImageListItemBar
              sx={{ background: "none" }}
              position="top"
              actionIcon={
                <IconButton>
                  <Chip
                    sx={{ m: 1, color: "yellow" }}
                    icon={<StarBorderIcon />}
                    label="Deals"
                    size="small"
                    color="success"
                  />
                </IconButton>
              }
              actionPosition="left"
            />

          </ImageListItem>


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
