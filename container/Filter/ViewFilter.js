import React, { useState } from "react";
import { Grid, Box } from "@mui/material";
import { Typography } from "@mui/material";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
function ViewFilter({ handleView }) {
  const [color, setcolor] = useState(true);
  return (
    <Box sx={{ display: "flex", p: 1 }}>
      <Typography>View :</Typography>
      <GridViewIcon
        color={color ? "primary" : ""}
        onClick={() => {
          setcolor(true), handleView("grid");
        }}
      ></GridViewIcon>
      <ViewListIcon
        // color=
        color={color ? " " : "primary"}
        onClick={() => {
          setcolor(false), handleView("list");
        }}
      ></ViewListIcon>
    </Box>
  );
}

export default ViewFilter;
