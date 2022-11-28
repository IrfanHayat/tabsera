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
import Checkbox from "@mui/material/Checkbox";
import CheckBoxFilter from '../../container/Filter/CheckBoxFilter'
import FormGroup from "@mui/material/FormGroup";
import Collapse1 from '../Collapse';
import { useCallback } from "react";

function SideBarFilter({
  categoryProduct,
  parentCategories,
  categoryParentProduct1,
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
  handleFiltersBrand
}) {
  const [Filters, setFilters] = useState({
    brands: [],
    //   price: []
  });
  const [open, setOpen] = useState(false)
  const handleCollapse = useCallback(() => {

    setOpen(!open);

  }, [open])

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

  //   //showFilteredResults(newFilters)
  //   setFilters(newFilters);
  // };

  return (
    <Box component="div" className={styles.sideBarFilter}>
      {/* <List dense> */}

      <Collapse1 name="Category">
        <List component='li' disablePadding>
          <Grid className={styles.categoryHeading}>
            Related Category
          </Grid>
          <Box >
            <Typography
              className={styles.categoryParent}
              onClick={() => categoryParentProduct1(parentCategories)}
            >
              {parentCategories}
            </Typography>

            <Typography className={styles.categoryChild}>
              {subCategories.length > 0 ? childrenCategory(subCategories) : <></>}
            </Typography>

          </Box>
        </List>
      </Collapse1>


      <Divider />


      <CheckBoxFilter data={brands} handleFilters={filters => handleFiltersBrand(filters, "brands")} />
      <Divider />

      <Collapse1 name="Price">
        <PriceFilter
          MinInput={MinInput}
          MaxInput={MaxInput}
          priceFilter={priceFilter}
        ></PriceFilter>
      </Collapse1>
      <Divider />
      <Collapse1 name="Other Filters">

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
      </Collapse1>
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
