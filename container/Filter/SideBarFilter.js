import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBox from "../../container/Section/CheckBox";
import PriceFilter from "./PriceFilter";
import PageFilter from "./PageFilter";
import styles from "../../styles/sidebarFilters.module.css";
function SideBarFilter({
  categoryProduct,
  parentCategories,
  childrenCategory,
  subCategories,
  brands,
  MinInput,
  MaxInput,
  priceFilter,
  value,
  setDealsData,
  setShowDeals,
  setDiscountData,
  showDiscounts,
  setShowDiscounts,
  setFreeShippingData,
  setShowFreeShipping,
  setShowProduct,
  setShowAllCategoryPro,
  setShowAllMerchantPro,
  setFilterData1,
}) {
  const [Filters, setFilters] = useState({
    brands: [],
    //   price: []
  });

  const handleFilters = (filters, category) => {
    const newFilters = { ...Filters };

    newFilters[category] = filters;

    // if (category === "price") {
    //     let priceValues = handlePrice(filters)
    //     newFilters[category] = priceValues

    // }

    let result = brands.filter(
      (result) => result.brand_id == newFilters.brands[0]
    );
    console.log(result);
    //showFilteredResults(newFilters)
    setFilters(newFilters);
  };
  console.log(Filters);

  return (
    <Grid item className={styles.sideBarFilter}>
      {/* <List dense> */}
      <Typography className={styles.categoryHeading}>
        Related Category
      </Typography>
      <Box className={styles.categories}>
        <Typography
          className={styles.categoryParent}
          onClick={() => categoryProduct(parentCategories)}
        >
          {parentCategories}
        </Typography>
        <Typography className={styles.categoryChild}>
          {subCategories.length > 0 ? childrenCategory(subCategories) : ""}
        </Typography>
      </Box>

      <Divider />

      {/* <Box> */}
      <Typography className={styles.categoryHeading}>Brands</Typography>

      {console.log(brands)}
      <Box className={styles.brandsList}>
        <CheckBox
          // className={styles.brandsList}
          size="small"
          list={brands}
          handleFilters={(filters) => handleFilters(filters, "brands")}
        />
        {/* </Box> */}
      </Box>
      <Divider />
      <PriceFilter
        MinInput={MinInput}
        MaxInput={MaxInput}
        priceFilter={priceFilter}
      ></PriceFilter>
      <Divider />
      <Typography className={styles.categoryHeading}>Other Filters</Typography>
      <PageFilter
        value={value}
        setDealsData={setDealsData}
        setShowDeals={setShowDeals}
        setDiscountData={setDiscountData}
        showDiscounts={showDiscounts}
        setShowDiscounts={setShowDiscounts}
        setFreeShippingData={setFreeShippingData}
        setShowFreeShipping={setShowFreeShipping}
        setShowProduct={setShowProduct}
        setShowAllCategoryPro={setShowAllCategoryPro}
        setShowAllMerchantPro={setShowAllCategoryPro}
        setFilterData={setFilterData1}
      ></PageFilter>
      <Divider />
      {/* <ListItem>
                    <FormControlLabel
                        control={<Checkbox defaultChecked size="small" />}
                        label="Colors"
                    />
                </ListItem>
                <Divider /> */}
      {/* <ListItem>
                    <FormControlLabel
                        control={<Checkbox defaultChecked size="small" />}
                        label="Size"
                    />
                </ListItem>
                <Divider />
                <ListItem>
                    <FormControlLabel
                        control={<Checkbox defaultChecked size="small" />}
                        label="Materials"
                    />
                </ListItem> */}
      {/* </List> */}
    </Grid>
  );
}

export default SideBarFilter;
