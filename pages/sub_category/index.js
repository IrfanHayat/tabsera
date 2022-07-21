import React, { useMemo, useEffect } from "react";
import ActionAreaCard from "../../container/Card";
import { getProductWithCategoryId } from "../../slice/categorySlice";
import { useRouter, withRouter } from "next/router";
import { addToBasket } from "../../slice/basketSlice";
import { useSelector, useDispatch } from "react-redux";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
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
      <Container maxWidth="lg">
        <Typography component="h4" variant="h4">
          Sub Products
        </Typography>
        <Grid container wrap="wrap" sx={{ overflow: "auto" }}>
          {" "}
          {productDataWithCategoryId &&
            productDataWithCategoryId?.map((item) => (
              <ActionAreaCard
                product={item}
                viewProduct={viewProduct}
                addToCartHandler={addToCartHandler}
                // viewCategory={viewCategory}
              ></ActionAreaCard>
            ))}
        </Grid>{" "}
      </Container>
    </>
  );
}

export default SubCategory;
