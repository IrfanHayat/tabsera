import React, { useState, useMemo, useRef, useEffect } from "react";

import ActionAreaCard from "../../container/Card";
import { getProductWithCategoryId, getCategoryBrand, getCategory } from "../../slice/categorySlice";
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
  ListItemText,
} from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import makeStyles from "@mui/styles/makeStyles";
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled, useTheme, alpha } from "@mui/material/styles";
import TextField from "@mui/material/TextField";
import SortFilter from "../../container/Filter/SortFilter";
import ListFilter from "../../container/Filter/ListFilter";
import PageFilter from "../../container/Filter/PageFilter";
import ViewFilter from "../../container/Filter/viewFilter";
import Button from "@mui/material/Button";
import PriceFilter from "../../container/Filter/PriceFilter";

const useStyles = makeStyles({
  flexGrow: {
    flex: '1',
  },
  button: {
    backgroundColor: '#3c52b2',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#fff',
      color: '#3c52b2',
    },
  }
})


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
  const [styled, setStyled] = React.useState({
    display: "flex",
    flexDirection: "column",
  });
  const [filterData, setFilterData] = useState();

  const classes = useStyles()
  const MaxInput = useRef(null);
  const MinInput = useRef(null);
  const [filterPrice, setFilterPrice] = useState([])
  const [flag, setFlag] = useState(false)
  const [brands, setBrands] = useState([])
  const [subCategories, setSubCategories] = useState([])
  const [parentCategories, setParentCategories] = useState([])

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

  useEffect(async () => {
    let result = await dispatch(getCategoryBrand())
    let results = result?.payload.filter(result => result.category_id == router?.query?.sub_category)
    console.log(results)
    results.map(category => {
      setBrands(category.brands)
    })

  }, [])

  useEffect(async () => {
    let result = await dispatch(getCategory())
    let results = result?.payload.filter(result => result.category_id == router?.query?.sub_category)
    console.log(results)
    results?.map(category => {
      setParentCategories(category.category_name)
      setSubCategories(category.child)
    })

  }, [])

  useEffect(() => {

  }, [subCategories])






  console.log(productDataWithCategoryId)

  const children = (subCategories) => {

    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', ml: 2 }}>
        {subCategories.map(result => <List>
          <ListItem>{result.category_name}</ListItem></List>)}
        {/* {
          subCategories?.map(result => {
            <List>
              <ListItem>
                {"Hello"}
              </ListItem>
            </List>
          })

        } */}


      </Box>
    );
  }
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
    if (view == "grid") {
      style = { display: "flex", flexDirection: "column" };

      setStyled(style);
    } else {
      style = {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
      };
      setStyled(style);
    }

  }
  const priceFilter = () => {
    let max = MaxInput.current.value;
    let min = MinInput.current.value
    console.log(typeof (max))
    console.log(typeof (min))
    let result = productDataWithCategoryId.filter(result => parseInt(result.productCost) >= parseInt(min) && parseInt(result.productCost) <= parseInt(max))
    setFilterPrice(result)
    setFlag(true)

  }

  return (
    <Grid
      container
      xs={12}
      sx={{ mt: 2, background: "white", minWidth: "100%" }}
      spacing={2}
    >
      <Grid item xs={3}>
        <Item sx={{ minHeight: "100vh", border: 0, boxShadow: 0 }}>
          <List dense>
            Related Category
            <ListItem
            // spacing={2}
            // sx={{ p: 1 }}
            // alignItems="flex-start"


            >
              <ListItemIcon>
                {/* <Image
        // src={result.category_image}
        width={50}
        height={30}
      ></Image> */}
              </ListItemIcon>
              {console.log(subCategories)}
              <ListItemText >
                {parentCategories}
                {subCategories.length > 0 ? children(subCategories) : ''}
              </ListItemText>
            </ListItem>



          </List>


        </Item>
        <Divider></Divider>
        <Item sx={{ border: 0, boxShadow: 0 }}>
          <Typography>Brands</Typography>
          {

            brands?.map(result => (
              <FormControlLabel control={<Checkbox defaultChecked />} label={result.brand_name} />
            ))
          }

        </Item>
        <Divider></Divider>
        <Item sx={{ border: 0, boxShadow: 0 }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Colors"
          />
        </Item>
        <Divider></Divider>

        <Item sx={{ border: 0, boxShadow: 0 }}>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Size"
          />
        </Item>
        <Divider></Divider>
        <Item sx={{ border: 0, boxShadow: 0 }}><FormControlLabel control={<Checkbox defaultChecked />} label="Materials" /></Item>
      </Grid>
      <Grid item xs={9}>
        <Item sx={{ minHeight: "100vh" }}>
          <Grid sx={12}>
            <Grid item xs={12}>
              <Item sx={{ minHeight: "10vh", border: 0, boxShadow: 0 }}>
                <Grid md={12} sx={{ display: "flex" }}>
                  <Grid
                    item
                    md={2}
                    sx={{ minHeight: 5, border: 0, boxShadow: 0 }}
                  >
                    <Item sx={{ display: "flex", border: 0, boxShadow: 0 }}>
                      <PriceFilter MinInput={MinInput} MaxInput={MaxInput} priceFilter={priceFilter}></PriceFilter>
                    </Item>

                  </Grid>

                  <Grid item md={4}>
                    <Item sx={{ border: 0, boxShadow: 0 }}>
                      <ListFilter></ListFilter>
                    </Item>
                  </Grid>
                  <Grid item md={6}>
                    <Item sx={{ border: 0, boxShadow: 0 }}>
                      <PageFilter></PageFilter>
                    </Item>
                  </Grid>
                  <Grid item md={1}>
                    <Item
                      sx={{ border: 0, boxShadow: 0, justifyContent: "end" }}
                    >
                      {" "}
                      <SortFilter
                        data={productDataWithCategoryId}
                        setFilterData={setFilterData}
                      ></SortFilter>
                    </Item>
                  </Grid>
                </Grid>

                <Grid sx={{ display: "flex", justifyContent: "flex-start" }}>
                  <ViewFilter handleView={handleView}></ViewFilter>
                </Grid>
              </Item>
            </Grid>
            <Grid item xs={12} sx={styled}>
              {console.log(filterPrice?.length)}
              <Item sx={{ minHeight: "90vh" }}>
                {productDataWithCategoryId && filterPrice?.length < 1 && flag == false ?
                  productDataWithCategoryId?.map((item) => (
                    <ActionAreaCard
                      key={item}
                      product={item}
                      viewProduct={viewProduct}
                      addToCartHandler={addToCartHandler}
                      // viewCategory={viewCategory}
                      styledCard={styled}
                    ></ActionAreaCard>
                  )) :

                  filterPrice.length > 0 ? filterPrice?.map((item) => (
                    <ActionAreaCard
                      key={item}
                      product={item}
                      viewProduct={viewProduct}
                      addToCartHandler={addToCartHandler}
                      // viewCategory={viewCategory}
                      styledCard={styled}
                    ></ActionAreaCard>
                  )) : 'Product Not Found'
                }
              </Item>
            </Grid>
          </Grid>
        </Item >
      </Grid >


    </Grid >

  );
}

export default SubCategory;
