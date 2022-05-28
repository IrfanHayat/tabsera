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

function Details({productDetail,addToCartHandler}) {
  
  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
          <CardMedia
            component="img"
            height="14"
            image={productDetail?.imgdata}
            alt="green iguana"
          />
        </Grid>
        <Grid item md={3} xs={12}>
          <List>
            <ListItem>
              <Typography component="h1" variant="h1">
                Title
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>Category: {productDetail?.rname}</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: {productDetail?.rname}</Typography>
            </ListItem>
            <ListItem>
              {/* <Rating value={5} readOnly></Rating> */}
              <Link href="#reviews">
                <Typography>({productDetail?.rating} reviews)</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Typography> Description: {productDetail?.somedata}</Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={3} xs={12}>
          <Card>
            <List>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Price</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>{productDetail?.price}</Typography>
                  </Grid>
                </Grid>
              </ListItem>
              <ListItem>
                <Grid container>
                  <Grid item xs={6}>
                    <Typography>Status</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography>
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
                  onClick={()=>{
                    addToCartHandler(productDetail)
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
