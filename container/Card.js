import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import { Card, CardActions, Typography } from "@mui/material";

import { makeStyles } from "@mui/styles";
import TextInfoContent from "@mui-treasury/components/content/textInfo";
import { useFourThreeCardMediaStyles } from "@mui-treasury/styles/cardMedia/fourThree";
import { useN04TextInfoContentStyles } from "@mui-treasury/styles/textInfoContent/n04";
import { useOverShadowStyles } from "@mui-treasury/styles/shadow/over";
import cx from "clsx";
import IconButton from "@mui/material/IconButton";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import PreviewOutlinedIcon from "@mui/icons-material/PreviewOutlined";
import { CardMedia } from '@mui/material';

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
  productView,
  categoryView,
  cartView,
}) {
  const styles = useStyles();
  const textCardContentStyles = useN04TextInfoContentStyles();
  const mediaStyles = useFourThreeCardMediaStyles();
  const shadowStyles = useOverShadowStyles({ inactive: true });

  return (
    // <Box>
    <Card
      sx={{
        mx: 0.4,
        my: 2,
        // marginTop: 1,
        // marginBottom: 1,
        padding: 0.5,
        maxWidth: 300,
        height: 310,
        ":hover": {
          boxShadow: 5, // theme.shadows[20]
          transform: "scale(1.05)",
          // opacity: 0.5,
          cursor: "pointer",
        },
      }}
      // className={cx(styles.root)}
    >
      {product?.productImage && (
        <>
        {console.log(product?.productImage)}
        <Image
          // className={cx(styles.media, mediaStyles.root)}
          src={product?.productImage}
          onClick={(e) => viewProduct(product)}
          alt="shirt"
          width={245}
          height={200}
          // loading="eager"
        ></Image>
        </>
      )}
      {product?.category_image && (
        <Image
          // className={cx(styles.media, mediaStyles.root)}
          src={product?.category_image}
          onClick={(e) => viewCategory(product.category_id)}
          alt="shirt"
          width={245}
          height={200}
          // loading="eager"
        ></Image>
      )}
      {product?.category_name && (
        <CardContent>
          <Typography variant="overline">{product.category_name}</Typography>
        </CardContent>
      )}
      <CardContent>
        <Typography variant="overline">{product.categoryName}</Typography>
        <Typography variant="h5">{product.productName}</Typography>
      </CardContent>
      {/* <CardActions>
        {product.productName ? (
          <IconButton
            key={product.id}
            onClick={(e) => viewProduct(product)}
            color="primary"
            aria-label="add to shopping cart"
          >
            <PreviewOutlinedIcon />
          </IconButton>
        ) : (
          ""
        )}

        {product?.category_name && (
          <IconButton
            key={product.id}
            onClick={(e) => viewCategory(product.category_id)}
            color="primary"
            aria-label="add to shopping cart"
          >
            <PreviewOutlinedIcon />
          </IconButton>
        )}
        {product.productName ? (
          <IconButton
            key={product.id}
            onClick={(e) => addToCartHandler(product)}
            color="primary"
            aria-label="add to shopping cart"
          >
            <AddShoppingCartIcon />
          </IconButton>
        ) : (
          ""
        )}
      </CardActions> */}
    </Card>
    // </Box>
  );
}
