import React from "react";
import styles from "../styles/merchantProfile.module.css";
import { Box, Grid } from "@mui/material";
const MerchantProfile = () => {
  return (
    <Grid container>
      {/* <Box className={styles.topbanner}>
        <Box className={styles.mainCategory}>Main Category</Box>
        <Box className={styles.mainCategory}>Shipped on Time</Box>
        <Box className={styles.mainCategory}>Chat</Box>
      </Box> */}
      <Grid className={styles.Ratings} item md={3}>
        Positive Rating
      </Grid>
      <Grid className={styles.Ratings} item md={9}>
        Seller Ratings and Reviews
      </Grid>
    </Grid>
  );
};

export default MerchantProfile;
