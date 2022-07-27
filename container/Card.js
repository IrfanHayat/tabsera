import * as React from "react";
import CardContent from "@mui/material/CardContent";
import Image from "next/image";
import Card from "@mui/material/Card";

import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";

import makeStyles from "@mui/styles/makeStyles";

export default function ActionAreaCard({
  product,
  viewProduct,
  viewCategory,
  addToCartHandler,
  productView,
  categoryView,
  cartView,
}) {
  return (
    // <Box>
    <Card
      onClick={(e) => viewProduct(product)}
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
          <Image
            // className={cx(styles.media, mediaStyles.root)}
            src={product?.productImage}
            // onClick={(e) => viewProduct(product)}
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
          <Typography variant="overline">{product?.category_name}</Typography>
        </CardContent>
      )}
      <CardContent>
        <Typography variant="overline">{product?.categoryName}</Typography>
        <Typography fontSize="1.3rem">{product?.productName}</Typography>
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
