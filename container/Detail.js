import {
  Grid,
  Link,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardMedia,
  Button,
  TextField,
  CircularProgress,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
//import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Image from "next/image";
import React, { useState } from "react";
import Carousel from "react-elastic-carousel";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 550, itemsToShow: 2 },
  { width: 768, itemsToShow: 3 },
  { width: 1200, itemsToShow: 4 },
];

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
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

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
        <Grid item md={3}></Grid>

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
              width={1500}
              height={500}
            ></Image>
          )}
        </Grid>
        <Grid item md={3}></Grid>
      </Grid>

      <Grid container spacing={1}>
        {/* <Grid item md={3}></Grid> */}
        <Grid item md={12}>
          <ListItem>
            <ListItemText sx={{ fontWeight: "bold" }}>
              {productDetail?.product_name}{" "}
            </ListItemText>

            <ListItemText sx={{ fontWeight: "bold" }}>Rs.{price}</ListItemText>
          </ListItem>

          <ListItem>
            <ListItemText sx={{ color: "error.main" }}>
              {" "}
              {productDetail?.category_name}{" "}
            </ListItemText>
            <ListItemText sx={{ color: "success.main" }}>
              out of stock
            </ListItemText>
          </ListItem>
        </Grid>
        {/* <Grid item md={3}></Grid> */}
      </Grid>

      <Grid container spacing={1}>
        {/* <Grid item md={6} xs={6}>

          <ListItem>
            <Typography> {productDetail?.product_name}</Typography>
          </ListItem>
        </Grid>
        <Grid item md={6} xs={6}>
          <ListItem>
            <Typography>Rs.{price}</Typography>
          </ListItem>
        </Grid> */}
        {/* <Grid item md={6} xs={6}>
          <ListItem>
            <Typography>{productDetail?.category_name}</Typography>
          </ListItem>
        </Grid>
        <Grid item md={6} xs={6}>
          <ListItem>
            <Typography>out of stock</Typography>
          </ListItem>
        </Grid>
        <Grid item md={6} xs={6}>
          <ListItem>
            <Typography> Sold By:{productDetail?.merchant_name}</Typography>
          </ListItem>
        </Grid> */}

        <Grid item md={12} xs={12}>
          {/* <Card style={{ margin: "10px" }}>
            <List>
              <ListItem> */}
          <Grid container>
            <Grid item xs={6} md={6}>
              {productAttributes &&
                productAttributes.map((result) => (
                  <Typography>
                    {result.attribute_name}:{result.value}
                  </Typography>
                ))}
            </Grid>

            <Grid item xs={6} md={6}>
              <Carousel
                // breakPoints={breakPoints}
                disableArrowsOnEnd={false}
                // showArrows={false}
                pagination={false}
                // showEmptySlots={true}
                itemsToShow={2}
              >
                {productImage &&
                  productImage.map((result) => (
                    <Image
                      //  className={cx(styles.media, mediaStyles.root)}
                      src={result}
                      alt="shirt"
                      width={200}
                      height={300}
                    ></Image>
                  ))}
              </Carousel>
            </Grid>
          </Grid>
          {/* </ListItem>
            </List>
          </Card> */}
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
              {productDetail?.product_desc}
            </TabPanel>
            <TabPanel value={value} index={1}>
              Rating
            </TabPanel>
            <TabPanel value={value} index={2}>
              Store
            </TabPanel>
          </Card>
        </Grid>

        <Grid container spacing={1}>
          <Grid item xs={6} md={6}>
            <Item>
              {" "}
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
            </Item>
          </Grid>
          <Grid item xs={6} md={6}>
            <Item>
              {" "}
              <ListItem>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => {
                    addToCartHandler(productDetail);
                  }}
                >
                  Buy Now
                </Button>
              </ListItem>
            </Item>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default Details;
