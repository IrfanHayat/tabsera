import React, { useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";

function ListFilter({
  setBtnKey,
  btnKey,
  showAllProducts,
  showAllMerchantsProduct,
  showAllCategoriesProduct,
}) {
  let { t, i18n } = useTranslation();

  return (

    <Box>
      <Typography sx={{ display: "inline" }}> {t('Filter.ListFilter.title')} : </Typography>
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
        {t('Filter.ListFilter.All Products')}
      </Button>
      <Button
        variant={btnKey == 2 ? "outlined" : "text"}
        onClick={() => {
          setBtnKey(2), showAllMerchantsProduct();
        }}
      >
        {t('Filter.ListFilter.Sellers')}
      </Button>
      <Button
        variant={btnKey == 3 ? "outlined" : "text"}
        onClick={() => {
          setBtnKey(3), showAllCategoriesProduct();
        }}
      >
        {t('Filter.ListFilter.Categories')}
      </Button>
    </Box>
  );
}

export default ListFilter;
