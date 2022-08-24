import React from "react";
import { Typography, Box, TextField, Button, Stack } from "@mui/material";
import Item from "../Item/Item";
import RemoveIcon from "@mui/icons-material/Remove";
import IconButton from "@mui/material/IconButton";
import SendIcon from "@mui/icons-material/Send";
function PriceFilter({ MinInput, MaxInput, priceFilter }) {
  return (
    <Box spacing={2} sx={{ display: "flex", flexWrap: "wrap" }}>
      <>
        <Typography sx={{ mt: 1, mr: 0.5 }}>Price</Typography>

        <TextField
          id="filled-basic"
          label="MIN"
          variant="filled"
          inputRef={MinInput}
          name={"minPrice"}
          size="small"
          InputProps={{
            style: { width: 60, height: 40 },
          }}
        />
        <Box sx={{ pt: 1 }}>
          <RemoveIcon />
        </Box>

        <TextField
          id="filled-basic"
          label="MAX"
          variant="filled"
          inputRef={MaxInput}
          name={"maxPrice"}
          size="small"
          InputProps={{
            style: { width: 60, height: 40 },
          }}
        />
      </>
      <Box>
        <IconButton>
          <SendIcon onClick={priceFilter} color="primary" />
        </IconButton>
        {/* <Button
          variant="contained"
          onClick={priceFilter}
          size="small"
          InputProps={{
            style: { width: 40, height: 40 },
          }}
        >
          OK
        </Button> */}
      </Box>
    </Box>
  );
}

export default PriceFilter;
