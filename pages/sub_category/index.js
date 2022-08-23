import React, { useState, useMemo, useEffect } from "react";
import ActionAreaCard from "../../container/Card";
import { getProductWithCategoryId } from "../../slice/categorySlice";
import { useRouter, withRouter } from "next/router";
import { addToBasket } from "../../slice/basketSlice";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { Divider, List } from "@mui/material";
import {
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText

} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import GridViewIcon from '@mui/icons-material/GridView';
import ViewListIcon from '@mui/icons-material/ViewList';
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled, useTheme, alpha } from "@mui/material/styles";
import TextField from '@mui/material/TextField';
import SortFilter from "../../container/Filter/SortFilter";
import ListFilter from "../../container/Filter/ListFilter";
import PageFilter from "../../container/Filter/PageFilter";
import ViewFilter from "../../container/Filter/viewFilter";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  // padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));







function SubCategory() {
  const { productDataWithCategoryId } = useSelector((state) => state.category);
  const router = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState([true, false]);
  const [styled, setStyled] = React.useState({ display: "flex", flexDirection: 'column' })
  const [filterData, setFilterData] = useState();


  const viewProduct = (item) => {
    router.push({
      pathname: "/product_detail",
      query: { productId: item.productId },
    });
  };
  const handleChange1 = (event) => {
    setChecked([event.target.checked, event.target.checked]);
  };

  const handleChange2 = (event) => {
    setChecked([event.target.checked, checked[1]]);
  };

  const handleChange3 = (event) => {
    setChecked([checked[0], event.target.checked]);
  };

  //   const viewCategory = (item) => {
  //     router.push({
  //       pathname: "/sub_category",
  //       query: { sub_category: item },
  //     });
  //   };
  const getData = (id) => {
    dispatch(getProductWithCategoryId(id));
  };

  console.log(productDataWithCategoryId)

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
      <List>
        <ListItem>
          Child1
        </ListItem>
      </List>
      <List>
        <ListItem>
          Child2
        </ListItem>
      </List>
    </Box>
  );
  useMemo(() => {
    let id = router?.query?.sub_category;

    getData(id);
  }, []);

  const addToCartHandler = (product) => {
    dispatch(addToBasket(product));
    router.push("/cart");
  };

  const handleView = (view) => {
    let style;
    let styleCard;
    if (view == 'grid') {
      style = { display: "flex", flexDirection: 'column' }

      setStyled(style)

    } else {
      style = { display: "flex", flexDirection: 'row', justifyContent: 'flex-start' }
      setStyled(style)

    }

  }

  return (
    <Grid container xs={12} sx={{ mt: 2, background: "white", minWidth: "100%" }} spacing={2}>
      <Grid item xs={3}>
        <Item sx={{ minHeight: "100vh", border: 0, boxShadow: 0 }}>
          <List dense>

            Related Category

            <ListItem
              // spacing={2}
              // sx={{ p: 1 }}
              // alignItems="flex-start"
              sx={{
                ":hover": {
                  // border: 1,
                  // boxShadow: 1, // theme.shadows[20]
                  transform: "scale(1.05)",
                  // opacity: 0.5,
                  color: "primary.main",
                  cursor: "pointer",
                },
              }}

            >
              <ListItemIcon>
                {/* <Image
        // src={result.category_image}
        width={50}
        height={30}
      ></Image> */}
              </ListItemIcon>
              <ListItemText >
                Parent Category
                {children}
              </ListItemText>
            </ListItem>



          </List>

        </Item>
        <Divider></Divider>
        <Item><FormGroup>

        </FormGroup></Item>
        <Divider></Divider>
        <Item sx={{ border: 0, boxShadow: 0 }}>
          <FormControlLabel control={<Checkbox defaultChecked />} label="Colors" />

        </Item>
        <Divider></Divider>
        <Item sx={{ border: 0, boxShadow: 0 }}><FormControlLabel control={<Checkbox defaultChecked />} label="Size" /></Item>
        <Divider></Divider>
        <Item sx={{ border: 0, boxShadow: 0 }}><FormControlLabel control={<Checkbox defaultChecked />} label="Materials" /></Item>
      </Grid>
      <Grid item xs={9} >
        <Item sx={{ minHeight: "100vh" }}>
          <Grid sx={12}>
            <Grid item xs={12}>
              <Item sx={{ minHeight: "10vh", border: 0, boxShadow: 0 }}>
                <Grid md={12} sx={{ display: "flex" }}>
                  <Grid item md={2} sx={{ minHeight: 5, border: 0, boxShadow: 0 }}>
                    <Item sx={{ display: "flex", border: 0, boxShadow: 0 }}>
                      <Typography sx={{ mt: 2 }}>Price</Typography>

                      <TextField sx={{ width: 100 }} id="filled-basic" label="MIN" variant="filled" />
                      <Typography sx={{ mt: 2 }} >-</Typography>

                      <TextField sx={{ width: 100 }} id="filled-basic" label="MAX" variant="filled" />
                    </Item>
                  </Grid>

                  <Grid item md={4}>
                    <Item sx={{ border: 0, boxShadow: 0 }}><ListFilter></ListFilter></Item>
                  </Grid>
                  <Grid item md={6}>
                    <Item sx={{ border: 0, boxShadow: 0 }}><PageFilter></PageFilter></Item>
                  </Grid>
                  <Grid item md={1}>
                    <Item sx={{ border: 0, boxShadow: 0, justifyContent: "end" }}> <SortFilter data={productDataWithCategoryId} setFilterData={setFilterData}></SortFilter></Item>
                  </Grid>
                </Grid>

                <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <ViewFilter handleView={handleView}></ViewFilter>
                </Grid>


              </Item>
            </Grid>
            <Grid item xs={12} sx={styled}>
              <Item sx={{ minHeight: "90vh" }}>
                {productDataWithCategoryId &&
                  productDataWithCategoryId?.map((item) => (
                    <ActionAreaCard
                      key={item}
                      product={item}
                      viewProduct={viewProduct}
                      addToCartHandler={addToCartHandler}
                      // viewCategory={viewCategory}
                      styledCard={styled}
                    ></ActionAreaCard>
                  ))}

              </Item>
            </Grid>
          </Grid>
        </Item >
      </Grid >


    </Grid >

  );
}

export default SubCategory;
