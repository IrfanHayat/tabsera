import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import ActionAreaCard from "../../container/Card";
import Menu from "../../container/Menu";
import Footer from "../../container/Footer";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.secondary,
}));

export default function Product() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid>
        <Grid item xs={12} md={12}>
          <Menu />
        </Grid>

         <Grid item xs={12} md={12}>
          <Item>
            <Footer></Footer>
          </Item>
        </Grid>
      </Grid>
    </Box>
  );
}
