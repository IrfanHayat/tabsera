import React from "react";
import { Typography, Box, TextField, Button, Stack } from "@mui/material";
import Item from "../Item/Item";
import RemoveIcon from "@mui/icons-material/Remove";
function PriceFilter({ MinInput, MaxInput, priceFilter }) {
  return (
    <Box spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
      <>
        <Typography sx={{ mt: 2 }}>Price</Typography>

        <TextField
          sx={{ width: 70 }}
          id="filled-basic"
          label="MIN"
          variant="filled"
          inputRef={MinInput}
          name={"minPrice"}
          size="small"
        />
        <Box sx={{ pt: 1 }}>
          <RemoveIcon />
        </Box>

        <TextField
          sx={{ width: 70 }}
          id="filled-basic"
          label="MAX"
          variant="filled"
          inputRef={MaxInput}
          name={"maxPrice"}
          size="small"
        />
      </>
      <Box sx={{ p: 0.5 }}>
        <Button
          variant="contained"
          style={{ height: 40, width: "10px" }}
          onClick={priceFilter}
          size="small"
        >
          OK
        </Button>
      </Box>
    </Box>
  );
}

export default PriceFilter;
