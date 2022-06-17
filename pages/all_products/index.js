import React from "react";
import ActionAreaCard from "../../container/Card";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../slice/productSlice";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import {
  addToBasket,
  clearBasket,
  decreaseBasket,
  getTotals,
  removeFromBasket,
} from "../../slice/basketSlice";
import { useState } from "react";
import { useRouter, withRouter } from "next/router";
import AddPagination from "../../container/AddPagination/AddPagination";

const index = () => {
  const product = useSelector((state) => state.product.productData);
  console.log(product);
  let router = useRouter();
  let dispatch = useDispatch();

  const [page, setPage] = useState(1);

  React.useEffect(async () => {
    await dispatch(getProduct());
  }, []);

  const viewProduct = (item) => {
    router.push({
      pathname: `/product_detail${page}`,
      query: { productId: item.productId },
    });
  };

  const addToCartHandler = (product) => {
    dispatch(addToBasket(product));
    router.push("/cart");
  };

  return (
    <Container maxWidth="lg">
      <Grid container wrap="wrap" sx={{ overflow: "auto" }}>
        {product.map((item) => (
          <ActionAreaCard
            product={item}
            viewProduct={viewProduct}
            addToCartHandler={addToCartHandler}
          ></ActionAreaCard>
        ))}

        <AddPagination />
      </Grid>
    </Container>
  );
};

export default index;
