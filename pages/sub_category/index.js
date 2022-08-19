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


  const viewProduct = (item) => {
    router.push({
      pathname: "/product_detail",
      query: { productId: item.productId },
    });
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

      <Grid
        maxWidth="xl"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          // p: 1,
          // m: 1,
          // bgcolor: "background.paper",
          // borderRadius: 1,
        }}
      // data-aos="fade-up"
      >
        <Item
          sx={{
            m: 1,
            width: {
              md: "20%",
              sm: "40%",
              xs: "40%",
              display: "flex",
              height: "100vh"
              // direction: "column",
              // fontWeight: "bold",
              // alignItems: "center",
              // justifyContent: "center",
            },
          }}
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
                <ListItemText >"Irfan"</ListItemText>
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
