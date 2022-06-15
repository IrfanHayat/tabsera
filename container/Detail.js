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
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
//import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Image from "next/image";
import React, { useState } from "react";
function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
function Details({
  productDetail,
  productImage,
  productAttributes,
  addToCartHandler,
  price,
}) {
  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  console.log(productDetail);
  return (
    <>
      <Grid container spacing={1}>
        <Grid item md={12} xs={12}>
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
              width={1500}
              height={300}
            ></Image>
          )}
        </Grid>
        <Grid item md={12} xs={12}>
          <List>
            <ListItem>
              <Typography> {productDetail?.product_name}</Typography>
            </ListItem>
            <ListItem>
              <Typography>{productDetail?.category_name}</Typography>
            </ListItem>
            <ListItem>
              {/* <Rating value={5} readOnly></Rating> */}
              <Link href="#reviews">
                <Typography>({productDetail?.totalReviewa} reviews)</Typography>
              </Link>
            </ListItem>
            <ListItem>
              <Typography>
                {" "}
                Description:{productDetail?.product_desc}
              </Typography>
            </ListItem>
          </List>
        </Grid>
        <Grid item md={12} xs={12}>
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
                    {productAttributes &&
                      productAttributes.map(result => (
                        <Typography variant="h6">
                          {result.attribute_name}:{result.value}
                        </Typography>
                      ))}
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="h6">
                      {/* {product.countInStock > 0 ? 'In stock' : 'Unavailable'} */}
                    </Typography>
                  </Grid>
                </Grid>
              </ListItem>
            </List>
          </Card>
        </Grid>
        <Grid item md={12} xs={12}>
          <Card style={{ margin: "10px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
              >
                <Tab label="Description" {...a11yProps(0)} />
                <Tab label="Rating" {...a11yProps(1)} />
                <Tab label="Store" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
              Description
            </TabPanel>
            <TabPanel value={value} index={1}>
              Rating
            </TabPanel>
            <TabPanel value={value} index={2}>
              Store
            </TabPanel>
          </Card>
        </Grid>
        <Grid item md={12} xs={12}>
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

        </Grid>
      </Grid>
    </>
  );
}

export default Details;
