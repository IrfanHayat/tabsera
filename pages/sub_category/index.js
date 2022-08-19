import React, { useMemo, useEffect } from "react";
import ActionAreaCard from "../../container/Card";
import { getProductWithCategoryId } from "../../slice/categorySlice";
import { useRouter, withRouter } from "next/router";
import { addToBasket } from "../../slice/basketSlice";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import { List } from "@mui/material";
import {
  CircularProgress,
  ListItem,
  ListItemIcon,
  ListItemText

} from "@mui/material";
import { Typography } from "@mui/material";
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled, useTheme, alpha } from "@mui/material/styles";
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: theme.palette.text.primary,
}));
function SubCategory() {
  const { productDataWithCategoryId } = useSelector((state) => state.category);
  const router = useRouter();
  const dispatch = useDispatch();
  const [checked, setChecked] = React.useState([true, false]);

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

  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        label="Child 1"
        control={<Checkbox checked={checked[0]} onChange={handleChange2} />}
      />
      <FormControlLabel
        label="Child 2"
        control={<Checkbox checked={checked[1]} onChange={handleChange3} />}
      />
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

  return (
    <>

      <Grid>
        <Item
          sx={{ display: 'inline-flex' }}

        >
          <List dense>

            <>

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
                  <FormControlLabel
                    label="Parent"
                    control={
                      <Checkbox
                        checked={checked[0] && checked[1]}
                        indeterminate={checked[0] !== checked[1]}
                        onChange={handleChange1}
                      />
                    }
                  />
                  {children}
                </ListItemText>
              </ListItem>

            </>

          </List>
        </Item>

      </Grid>

      {/* <Grid sx={{ backgroundColor: 'white', height: "100vh", position: 'relative', marginTop: "0.5%", width: 300 }}>
        Category

      </Grid> */}
      <Grid container wrap="wrap" sx={{ overflow: "auto" }}>
        {" "}
        {productDataWithCategoryId &&
          productDataWithCategoryId?.map((item) => (
            <ActionAreaCard
              key={item}
              product={item}
              viewProduct={viewProduct}
              addToCartHandler={addToCartHandler}
            // viewCategory={viewCategory}
            ></ActionAreaCard>
          ))}
      </Grid>{" "}

    </>
  );
}

export default SubCategory;
