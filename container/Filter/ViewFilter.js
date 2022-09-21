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
        // color=
        color={color ? " " : "warning"}
        onClick={() => {
          setcolor(false), handleView("list");
        }}
      ></GridViewIcon>
      <ViewListIcon
        color={color ? "warning" : ""}
        onClick={() => {
          setcolor(true), handleView("grid");
        }}
      ></ViewListIcon>
    </Box>
  );
}

export default ViewFilter;
