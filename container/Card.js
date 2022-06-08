import * as React from "react";
// import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
// import Card from "../components/Card/Card";
import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  CardMedia,
  TextField,
  CircularProgress,
  Button,
  CardActionArea,
  CardActions,
} from "@mui/material";

import { makeStyles } from "@material-ui/core/styles";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree";
import { useN04TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n04";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import cx from "clsx";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";

const useStyles = makeStyles(() => ({
  root: {
    maxWidth: 283,
    // maxHeight: 600,
    margin: "auto",
    borderRadius: 12,
    padding: 12,
  },
  media: {
    borderRadius: 6,
  },
}));

export default function ActionAreaCard({
  product,
  viewProduct,
  addToCartHandler,
}) {
  const styles = useStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });

  return (
    // <div style={{ display: "flex", flexWrap: "wrap", margin: "10,19" }}>
    <Card
      // sx={{ maxWidth: 230, maxHeight: 600 }}
      className={cx(styles.root, shadowStyles.root)}
    >
      {product?.productImage && (
        <Image
          className={cx(styles.media, mediaStyles.root)}
          src={product?.productImage}
          alt="shirt"
          width={245}
          height={200}
        ></Image>
        // <CardMedia
        //   component="img"
        //   // className={cx(styles.media, mediaStyles.root)}
        //   // height="14"
        //   image={product?.productImage}
        //   width={215}
        //   height={200}
        //   style={{ margin: "5px" }}
        // />
      )}
      {/* <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {product.productName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.categoryName}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {product.productCost}
        </Typography>
      </CardContent> */}

      <CardContent>
        <TextInfoContent
          classes={textCardContentStyles}
          overline={product.categoryName}
          heading={product.productName}
          // body={
          //   "That year, collection of songs, review melodies, memories full, this is a long and warm journey"
          // }
        />
      </CardContent>

      <CardActions>
        {/* <Button
          key={product.id}
          onClick={(e) => viewProduct(product)}
          variant="contained"
          size="small"
          style={{ fontSize: "10px" }}
          color="primary"
        >
          View Product
        </Button> */}
        {/* <Button
          key={product.id}
          onClick={(e) => addToCartHandler(product)}
          variant="contained"
          color="primary"
          // labelStyle={{ fontSize: 15 }}
          style={{ fontSize: "10px" }}
          size="small"
        >
          Add To Cart
        </Button> */}

        <IconButton
          key={product.id}
          onClick={(e) => viewProduct(product)}
          color="primary"
          aria-label="add to shopping cart"
        >
          <PreviewOutlinedIcon />
        </IconButton>
        <IconButton
          key={product.id}
          onClick={(e) => addToCartHandler(product)}
          color="primary"
          aria-label="add to shopping cart"
        >
          <AddShoppingCartIcon />
        </IconButton>
      </CardActions>
    </Card>
    // </div>
  );
}
