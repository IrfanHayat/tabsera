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

function Details({ productDetail, addToCartHandler }) {
  console.log(productDetail)
  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <CardMedia
            component="img"
            height="14"
            image={productDetail?.productImage}
            alt="green iguana"
            style={{ margin: "5px" }}
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h4">
                Title
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {productDetail?.categoryName}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {productDetail?.productName}</Typography>
            </ListItem>
            <ListItem>
              {/* <Rating value={5} readOnly></Rating> */}
              <Link href="#reviews">
                <Typography>({productDetail?.totalReviewa} reviews)</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Typography> Description:</Typography>
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
                    <Typography variant="h6">{productDetail?.productCost}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography variant="h6">Status</Typography>
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
