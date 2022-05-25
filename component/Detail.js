import NextLink from 'next/link'
import Image from 'next/image';
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
} from '@material-ui/core';


function Details(props) {
    return (
      <>
      <Grid container spacing={1}>
        <Grid item md={6} xs={12}>
        <CardMedia
          component="img"
          height="14"
          image="/shirt3.jpg"
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
              <Typography>Category: Shirt</Typography>
            </ListItem>
            <ListItem>
              <Typography>Brand: Bonanza</Typography>
            </ListItem>
            <ListItem>
              {/* <Rating value={5} readOnly></Rating> */}
              <Link href="#reviews">
                <Typography>({5} reviews)</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Typography> Description: {"Product Has Value"}</Typography>
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
                    <Typography>${150}</Typography>
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
                  //onClick={addToCartHandler}
                >
                  Add to cart
                </Button>
              </ListItem>
            </List>
          </Card>
        </Grid>
      </Grid>
        </>
    )
}

export default Details


