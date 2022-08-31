import React from "react";
import NavSelect from "../Navbar/Components/NavSelect";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import { CircularProgress, Typography } from "@mui/material";
import Button from "@mui/material/Button";

function SortFilter({ data, setFilterData }) {
  const sortData = (type) => {
    var f_data;
    switch (type) {
      case "price_asc":
        {
          f_data = data.slice().sort(function (a, b) {
            return parseFloat(b.productCost) - parseFloat(a.productCost);
          });
          setFilterData(f_data);
        }

        break;
      case "price_desc":
        f_data = data.slice().sort(function (a, b) {
          return parseFloat(a.productCost) - parseFloat(b.productCost);
        });
        setFilterData(f_data);
      case "rating_asc":
        f_data = data.slice().sort(function (a, b) {
          return parseFloat(b.averageRating) - parseFloat(a.averageRating);
        });
        setFilterData(f_data);
        break;
      case "rating_desc":
        f_data = data.slice().sort(function (a, b) {
          return parseFloat(a.averageRating) - parseFloat(b.averageRating);
        });
        setFilterData(f_data);
        break;
      // case 'order_asc':
      //   text = "Today is Sunday";
      //   break;
      // case 'order_desc':
      //   text = "Today is Sunday";
      //   break;
      default:
        "Looking forward to the Weekend";
    }
  };

  const sortingCategories = (
    <div>
      <MenuItem>
        <ListItemText onClick={() => sortData("price_asc")}>
          Price: High-To-Low{" "}
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText onClick={() => sortData("price_desc")}>
          Price: Low-To-High{" "}
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText onClick={() => sortData("rating_asc")}>
          Rating: High-To-Low
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText onClick={() => sortData("rating_desc")}>
          Rating: Low-To-High
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText onClick={() => sortData("order_asc")}>
          Orders: High-To-Low
        </ListItemText>
      </MenuItem>
      <MenuItem>
        <ListItemText onClick={() => sortData("order_desc")}>
          Orders: Low-To-High
        </ListItemText>
      </MenuItem>
    </div>
  );
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        // p: 1,
        // my: 1,
        // bgcolor: "background.paper",
        // borderRadius: 0,
      }}
      // data-aos="fade-down"
    >
      <NavSelect Title="Sort By" Data={sortingCategories} color="black" />
    </Box>
  );
}

export default SortFilter;
