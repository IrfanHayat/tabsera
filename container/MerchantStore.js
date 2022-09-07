import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import { Card } from "@mui/material";
import Button from "@mui/material/Button";
import styled from "@mui/styles/styled";
import Paper from "@mui/material/Paper";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
//import Typography from '@mui/material/Typography';
import Box from "@mui/material/Box";
import Image from "next/image";
import Carousel from "react-elastic-carousel";
import styles from "../styles/merchantStore.module.css";
import { useSelector } from "react-redux";
import {
  AppBar,
  CardContent,
  CardMedia,
  Stack,
  IconButton,
} from "@mui/material";
import { useRouter } from "next/router";
import ActionAreaCard from "./Card";
import { result } from "lodash";
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
function MerchantStore({ merchantStoreDetail }) {
  const { merchantData } = useSelector((state) => state.merchant);
  // const [merchant, setmerchant] = useState();
  // console.log(merchantStoreDetail);
  // useEffect(() => {
  //   setmerchant(merchantData);
  // }, [input]);
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
  let router = useRouter();

  const viewProduct = (item) => {
    router.push({
      pathname: `/product_detail`,
      query: { productId: item.productId },
    });
  };

  return (
    <>
      <Grid
        container
        spacing={1}
        sx={{ paddingTop: 2 }}
        // justifyContent="center"
      >
        <Grid item md={12} xs={12} ml={1} sx={{ backgroundColor: "orange" }}>
          <Card display="flex" sx={{ width: "40%", m: 0.5, p: 1 }}>
            <CardMedia component="img" sx={{ width: 251 }} alt=" Logo here" />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent
              // sx={{ display: "flex", justifyContent: "space-between" }}
              >
                <Typography component="div" variant="h5">
                  Name: {merchantData.merchant_name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  From: {merchantData.city}
                </Typography>
              </CardContent>
            </Box>
          </Card>
        </Grid>
        {/* <Grid item md={12} xs={12}>
          <Box>
            {" "}
            <List>
              <ListItem> Name : {merchantData.merchant_name}</ListItem>
            </List>
            <List>
              <ListItem>Location : {merchantData.city} </ListItem>
            </List>
            <List>
              <ListItem>Joined Tabsera : {merchantData?.created_date}</ListItem>
            </List>
            <List>
              <ListItem>
                Seller Rating : {merchantStoreDetail?.averageRating}
              </ListItem>
            </List>
          </Box>
        </Grid> */}
        <Grid item md={12} xs={12}>
          <Box>
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
              // variant="fullWidth"

              indicatorColor="primary"
              textColor="primary"
            >
              <Tab
                style={{ fontWeight: "bold" }}
                label="Home Page"
                {...a11yProps(0)}
              />
              <Tab
                style={{ fontWeight: "bold" }}
                label="All Products"
                {...a11yProps(1)}
              />
              <Tab
                style={{ fontWeight: "bold" }}
                label="Profile"
                {...a11yProps(2)}
              />
              {/* <Box>hi</Box> */}
            </Tabs>

            <TabPanel value={value} index={0}>
              <Grid container backgroundColor="white">
                Home
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              All Products
              {merchantStoreDetail &&
                merchantStoreDetail?.map((result) => (
                  <ActionAreaCard
                    product={result}
                    viewProduct={viewProduct}
                  ></ActionAreaCard>
                ))}
            </TabPanel>
            <TabPanel value={value} index={2}>
              Profile
            </TabPanel>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}

export default MerchantStore;
