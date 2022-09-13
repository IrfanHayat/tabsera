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
import Checkbox from '@mui/material/Checkbox';

import FormGroup from '@mui/material/FormGroup';

function SideBarFilter({
  categoryProduct,
  parentCategories,
  childrenCategory,
  subCategories,
  brands,
  MinInput,
  MaxInput,
  priceFilter,
  handleFilters,
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

  // const handleFilters = (filters, category) => {
  //   const newFilters = { ...Filters };

  //   newFilters[category] = filters;

  //   // if (category === "price") {
  //   //     let priceValues = handlePrice(filters)
  //   //     newFilters[category] = priceValues

  //   // }

  //   let result = brands.filter(
  //     (result) => result.brand_id == newFilters.brands[0]
  //   );
  //   console.log(result[0]);
  //   //showFilteredResults(newFilters)
  //   setFilters(newFilters);
  // };




  return (
    <Box component="div" className={styles.sideBarFilter}>
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
        {/* <Box
          // className={styles.categories}
          sx={{
            display: "flex",
            alignItems: "flex-start",
            flexDirection: "column",
            p: 1,
            m: 1,
            bgcolor: "background.paper",
            borderRadius: 1,
            border: "1px solid black",
          }}
        > */}
        <Typography className={styles.categoryChild}>
          {subCategories.length > 0 ? childrenCategory(subCategories) : ""}
        </Typography>
        {/* </Box> */}
      </Box>

      <Divider />

      {/* <Box> */}
      <Typography className={styles.categoryHeading}>Brands</Typography>

      {console.log(brands)}
      <Box className={styles.brandsList}>
        {/* <CheckBox
          // className={styles.categories}
          size="small"
          list={brands}
          handleFilters={(filters) => handleFilters(filters, "brands")}
        /> */}
        {
          brands.map((brand) =>
            //Store the the student id in the value of each check box

            <div>
              <FormGroup>
                <FormControlLabel control={<Checkbox onChange={handleFilters} name={brand.brand_name} />} label={brand.brand_name} />

              </FormGroup>
            </div>
          )
        }
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
    </Box>
  );
}

export default SideBarFilter;
