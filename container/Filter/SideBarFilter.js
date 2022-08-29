import React, { useState } from "react";
import { Grid } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import Typography from "@mui/material/Typography";
import FormControlLabel from "@mui/material/FormControlLabel";
import CheckBox from "../../container/Section/CheckBox";
function SideBarFilter({
  categoryProduct,
  parentCategories,
  childrenCategory,
  subCategories,
  brands,
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

    console.log(newFilters);

    let result = brands.filter(
      (result) => result.brand_id == newFilters.brands[0]
    );
    console.log(result);
    //showFilteredResults(newFilters)
    setFilters(newFilters);
  };

  return (
    <Grid
      item
      xs={4}
      md={2}
      sx={{
        bgcolor: "#fafafa",
        p: 1,
        display: "flex",
        flexWrap: "wrap",
        overflow: "hidden",
      }}
    >
      <List dense>
        Related Category
        <ListItem
        // spacing={2}
        // sx={{ p: 1 }}
        // alignItems="flex-start"
        >
          <ListItemText>
            <Typography onClick={() => categoryProduct(parentCategories)}>
              {parentCategories}
            </Typography>
            {subCategories.length > 0 ? childrenCategory(subCategories) : ""}
          </ListItemText>
        </ListItem>
        {/* </List> */}
        {/* <List dense> */}
        <Divider />
        {/* <ListItem> */}
        <ListItem>Brands</ListItem>
        {/* </ListItem> */}
        <ListItem>
          {/* {brands?.map((result, index) => (
                        <FormControlLabel
                            key={index}
                            control={<Checkbox defaultChecked size="small" />}
                            label={result.brand_name}
                        />
                    ))} */}
          <ListItemText sx={{ ml: 1 }}>
            <CheckBox
              size="small"
              list={brands}
              handleFilters={(filters) => handleFilters(filters, "brands")}
            />
          </ListItemText>
        </ListItem>
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
      </List>
    </Grid>
  );
}

export default SideBarFilter;
