import React from "react";
import { Typography, Box, TextField, Button, Stack } from "@mui/material";
import Item from "../Item/Item";
import RemoveIcon from "@mui/icons-material/Remove";
import styles from "../../styles/priceFilter.module.css";
function PriceFilter({ MinInput, MaxInput, priceFilter }) {
  return (
    <Box
      spacing={2}
      // sx={{ display: "flex", flexWrap: "wrap" }}
      className={styles.pricefilter}
    >
      <Typography className={styles.categoryHeading}>Price</Typography>
      <Box
        // sx={{ display: "flex", flexWrap: "wrap" }}
        className={styles.pricefields}
      >
        <TextField
          className={styles.textField}
          // sx={{ width: 70 }}
          id="filled-basic"
          label="MIN"
          // variant="filled"
          inputRef={MinInput}
          name={"minPrice"}
          size="small"
        />
        <Box sx={{ pt: 2 }}>
          <RemoveIcon />
        </Box>

        <TextField
          className={styles.textField}
          id="filled-basic"
          label="MAX"
          inputRef={MaxInput}
          name={"maxPrice"}
          size="small"
        />

        {/* <Box sx={{ p: 0.5 }}> */}
        <Button
          className={styles.button}
          variant="contained"
          onClick={priceFilter}
        >
          OK
        </Button>
        {/* </Box> */}
      </Box>
    </Box>
  );
}

export default PriceFilter;
