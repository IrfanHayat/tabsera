import React, { useState, useEffect } from 'react'
import Card from "@mui/material/Card";
import styles1 from "../../styles/card.module.css";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import { CardMedia } from "@mui/material";
import Box from "@mui/material/Box";
import { getRelatedProduct } from "../../slice/productSlice";
import { useSelector, useDispatch } from "react-redux";
import Typography from "@mui/material/Typography";
import Rating from "@mui/material/Rating";
import Currency from "../Currency/currency";
import AddIcon from "@mui/icons-material/Add";
function RelatedProducts({ categoryId, viewProduct, addToCartHandler }) {

  let [relatedProduct, setRelatedProduct] = useState([]);
  let dispatch = useDispatch();

  useEffect(async () => {

    let related_product = await dispatch(getRelatedProduct(categoryId))
    setRelatedProduct(related_product.payload)

  }, [categoryId])

  useEffect(() => {
    // console.log("2", categoryId)


  }, [categoryId])

  return (
    <> {relatedProduct.length > 0 ? relatedProduct?.map(result => (
      <Box sx={{ display: "flex", margin: 2 }}>
        <Card
          // className={styledCard?.flexDirection == "row" ? "" : styles.column}
          // className={styles1.card1}
          // className={styles.card}
          sx={{

            width: "14vw",
            height: "100%",
          }}
        >    {result?.productImage && (
          <>
            <center className={styles1.cargImgBox}>
              <ImageListItem key={result.productImage}>
                <CardMedia
                  data-aos="fade-up"
                  component="img"
                  onClick={(e) => viewProduct(result)}
                  image={result?.productImage}
                  alt={result?.productName}
                  className={styles1.cargImg}
                ></CardMedia>
                {/* <Image
                    data-aos="fade-up"
                    // className={cx(styles1.media, mediaStyles1.root)}
                    src={product?.productImage}
                    onClick={(e) => viewProduct(product)}
                    alt={product?.productName}
                    width={245}
                    height={240}
                    loading="eager"
                    priority
                  ></Image> */}

              </ImageListItem>

            </center>
            <Box className={styles1.cardContent} component="div">
              {/* <Typography variant="h5">{product?.categoryName}</Typography> */}
              <Box >


                <Typography className={styles1.prodName}>
                  {result?.productName}
                </Typography>

                <Box component="div" className={styles1.prodRating}>
                  <Rating
                    // className={styles1.Rating}
                    name="size-small"
                    defaultValue={result?.averageRating}
                    size="small"
                    // fontSize={24}
                    readOnly
                  />
                  {/* {product.productName ? (
              <AddShoppingCartOutlinedIcon className={styles1.btnAddCart} />
            ) : (
              ""
            )} */}
                </Box>

                <Box component="div" className={styles1.prodCost}>
                  <Box display="flex">
                    <Typography className={styles1.prodCostValue}>
                      <Currency
                        amount={
                          result?.productCost
                        }
                      ></Currency>
                    </Typography>
                    {/* {product?.discountPercent ? (
                            <Typography
                              className={styles1.prodDiscountCost}
                              style={{
                                textDecorationLine: "line-through",
                              }}
                              variant="overline"
                              // component="div"
                              display="inline"
                            >
                              Rs {product.originalPrice}
                            </Typography>
                          ) : (
                            <></>
                          )} */}
                  </Box>
                  <>
                    {result?.productName ? (
                      <AddIcon
                        className={styles1.btnAddCart}
                        onClick={() => addToCartHandler(result)}
                      />
                    ) : (
                      ""
                    )}
                  </>
                </Box>
              </Box>
              {/* <Box sx={{ mb: 3, display: "flex", alignItems: "center" }}>
          {product.productName ? (
            <Button
              variant="contained"
              sx={{
                background:
                  "linear-gradient(90deg, #020024 0%, #090979 35%, #00d4ff 100%)",
              }}
              size="small"
              key={product.id}
              onClick={() => addToCartHandler(product)}
              endIcon={<AddShoppingCartOutlinedIcon fontSize="small" />}
            >
              Add To Cart
            </Button>
          ) : (
            ""
          )}
        </Box> */}
              {/* {product.productName ? (
          <IconButton
            key={product.id}
            onClick={() => addToCartHandler(product)}
            color="primary"
            aria-label="add to shopping cart"
          >
            <AddShoppingCartOutlinedIcon fontSize="small" />
          </IconButton>
        ) : (
          ""
        )} */}
              {/* </Box> */}
            </Box>
          </>
        )}
        </Card>


      </Box>
    )) : <></>}</>
  )
}

export default RelatedProducts