import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";

function ListFilter({
  setBtnKey,
  btnKey,
  showAllProducts,
  showAllMerchantsProduct,
  showAllCategoriesProduct,
}) {
  return (
    <Box>
      <Typography sx={{ display: "inline" }}>List By : </Typography>
      <Button
        // variant={currentButtonVariant}
        // onClick={() => {
        //   showAllProducts(), handleButtonVariantChange();
        // }}
        variant={btnKey == 1 ? "outlined" : "text"}
        onClick={() => {
          setBtnKey(1), showAllProducts();
        }}
      >
        All Products
      </Button>
      <Button
        variant={btnKey == 2 ? "outlined" : "text"}
        onClick={() => {
          setBtnKey(2), showAllMerchantsProduct();
        }}
      >
        Sellers
      </Button>
      <Button
        variant={btnKey == 3 ? "outlined" : "text"}
        onClick={() => {
          setBtnKey(3), showAllCategoriesProduct();
        }}
      >
        Categories
      </Button>
    </Box>
  );
}

export default ListFilter;
