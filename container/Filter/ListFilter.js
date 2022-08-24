import React from "react";
import { Box, Typography, Button } from "@mui/material";

function ListFilter({
  showAllProducts,
  showAllMerchantsProduct,
  showAllCategoriesProduct,
}) {
  return (
    <Box>
      <Typography sx={{ display: "inline" }}>List By : </Typography>
      <Button variant="text" onClick={showAllProducts}>
        Products
      </Button>
      <Button variant="text" onClick={showAllMerchantsProduct}>
        Sellers
      </Button>
      <Button variant="text" onClick={showAllCategoriesProduct}>
        Categories
      </Button>
    </Box>
  );
}

export default ListFilter;
