import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
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
import { useSelector } from "react-redux";
import { AppBar, Stack } from "@mui/material";
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

  console.log("m s d", merchantStoreDetail);

  console.log(merchantData);
  const viewProduct = (item) => {
    console.log(item);
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
        justifyContent="center"
      >
        <Grid item md={12} xs={12} ml={1}>
          <Typography variant="h6" style={{ fontWeight: "bold" }}>
            Seller Details
          </Typography>
        </Grid>
        <Grid item md={12} xs={12}>
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
        </Grid>
        <Grid item md={12} xs={12}>
          <Card style={{ margin: "10px" }}>
            <AppBar
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                position: "static",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                variant="fullWidth"
                indicatorColor="secondary"
                textColor="inherit"
              >
                <Tab label="All Products" {...a11yProps(0)} />
                <Tab label="Reviews" {...a11yProps(1)} />
              </Tabs>
            </AppBar>

            <TabPanel value={value} index={0}>
              <Grid container>
                {merchantStoreDetail?.map((result) => (
                  <ActionAreaCard
                    product={result}
                    viewProduct={viewProduct}
                  ></ActionAreaCard>
                ))}
              </Grid>
            </TabPanel>
            <TabPanel value={value} index={1}>
              Ratings and Reviews
            </TabPanel>
          </Card>
        </Grid>

        <Grid container spacing={1} sx={{ p: 2 }}>
          <Grid item xs={12} md={12}>
            <Stack direction="row" spacing={2}>
              <Button
                // fullWidth
                variant="contained"
                color="error"
                onClick={() => router.push("/")}
              >
                Back
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default MerchantStore;
