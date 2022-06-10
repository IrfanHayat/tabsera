import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import { Card, CardActions } from "@mui/material";

import { makeStyles } from "@mui/styles";
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
    // maxWidth: 283,
    // maxHeight: 600,
    margin: 9,
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
  viewCategory,
  addToCartHandler,
}) {
  const styles = useStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });

  return (
    // <Box>
    <Card className={cx(styles.root)}>
      {product?.productImage && (
        <Image
          className={cx(styles.media, mediaStyles.root)}
          src={product?.productImage}
          alt="shirt"
          width={245}
          height={200}
        ></Image>
      )}
       {product?.category_image && (
        <Image
          className={cx(styles.media, mediaStyles.root)}
          src={product?.category_image}
          alt="shirt"
          width={245}
          height={200}
        ></Image>
      )}
       {product?.category_name && (
      <CardContent>
        <TextInfoContent
          // classes={textCardContentStyles}
          
          heading={product.category_name}
          // body={
          //   "That year, collection of songs, review melodies, memories full, this is a long and warm journey"
          // }
        />
      </CardContent>
       )}
      <CardContent>
        <TextInfoContent
          // classes={textCardContentStyles}
          overline={product.categoryName}
          heading={product.productName}
          // body={
          //   "That year, collection of songs, review melodies, memories full, this is a long and warm journey"
          // }
        />
      </CardContent>
      <CardActions>
        {
          product.productName? 
           <IconButton
           key={product.id}
           onClick={(e) => viewProduct(product)}
           color="primary"
           aria-label="add to shopping cart"
         >
           <PreviewOutlinedIcon />
         </IconButton>:''
        }
        
        {
           product?.category_name && (
           <IconButton
          key={product.id}
          onClick={(e) => viewCategory(product.category_id)}
          color="primary"
          aria-label="add to shopping cart"
        >
          <PreviewOutlinedIcon />
        </IconButton>

        )}
        {

product.productName? 
            <IconButton
            key={product.id}
            onClick={(e) => addToCartHandler(product)}
            color="primary"
            aria-label="add to shopping cart"
            >
            <AddShoppingCartIcon />
            </IconButton>:''

        }
        
      </CardActions>
    </Card>
    // </Box>
  );
}
