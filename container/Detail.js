import {
  Grid,
  Link,
  List,
  ListItem,
  Typography,
  Card,
  CardMedia,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import Image from "next/image";

function Details({ productDetail,productImage, productAttributes,addToCartHandler,price }) {
 console.log(productDetail)
  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          {/* <CardMedia
            component="img"
            height="14"
            image={productDetail?.productImage}
            alt="green iguana"
            style={{ margin: "5px" }}
          /> */}
          {productImage && (
        <Image
        //  className={cx(styles.media, mediaStyles.root)}
          src={productImage[0]}
          alt="shirt"
          width={700}
          height={300}
        ></Image>
      )}
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h4">
                Title
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {productDetail?.category_name}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {productDetail?.product_name}</Typography>
            </ListItem>
            <ListItem>
              {/* <Rating value={5} readOnly></Rating> */}
              <Link href="#reviews">
                <Typography>({productDetail?.totalReviewa} reviews)</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Typography> Description:{productDetail?.product_desc}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card style={{ margin: "10px" }}>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h6">Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">{price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                     {
                     productAttributes &&  productAttributes.map(result=>(
                        <Typography variant="h6">{result.attribute_name}:{result.value}</Typography>
                     ))  
                    } 
                    
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      {/* {product.countInStock > 0 ? 'In stock' : 'Unavailable'} */}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    addToCartHandler(productDetail);
                  }}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}

export default Details;
