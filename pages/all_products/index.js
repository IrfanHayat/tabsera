// import React from "react";
// import ActionAreaCard from "../../container/Card";
// import { useSelector, useDispatch } from "react-redux";
// import { getProduct } from "../../slice/productSlice";
// import Grid from "@mui/material/Grid";
// import Container from "@mui/material/Container";

// import {
//   addToBasket,
//   clearBasket,
//   decreaseBasket,
//   getTotals,
//   removeFromBasket,
// } from "../../slice/basketSlice";
// import { useState } from "react";
// import { useRouter, withRouter } from "next/router";
// import AddPagination from "../../container/AddPagination/AddPagination";

// const index = () => {
//   const product = useSelector((state) => state.product.productData);

//   const [page, setPage] = useState(product);

//   let router = useRouter();
//   let dispatch = useDispatch();

//   // const [page, setPage] = useState(1);

//   React.useEffect(async () => {
//     await dispatch(getProduct());
//   }, []);

//   const viewProduct = (item) => {
//     router.push({
//       pathname: `/product_detail${page}`,
//       query: { productId: item.productId },
//     });
//   };

//   const addToCartHandler = (product) => {
//     dispatch(addToBasket(product));
//     router.push("/cart");
//   };

//   return (
//     <Container maxWidth="lg">
//       <Grid container wrap="wrap" sx={{ overflow: "auto" }}>
//         {product.map((item) => (
//           <ActionAreaCard
//             product={item}
//             viewProduct={viewProduct}
//             addToCartHandler={addToCartHandler}
//           ></ActionAreaCard>
//         ))}

//         <AddPagination />
//       </Grid>
//     </Container>
//   );
// };

// export default index;

import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import ActionAreaCard from "../../container/Card";
import { useSelector, useDispatch } from "react-redux";
import { getProduct } from "../../slice/productSlice";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import _ from "lodash";
import {
  addToBasket,
  clearBasket,
  decreaseBasket,
  getTotals,
  removeFromBasket,
} from "../../slice/basketSlice";
import { useRouter, withRouter } from "next/router";
// import AddPagination from "../../container/AddPagination/AddPagination";
import ReactLoading from "react-loading";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const Index = () => {
  // state = {
  //   items: Array.from({ length: 20 }),
  //   hasMore: true,
  // };

  const { productData, loading } = useSelector((state) => state.product);
  let product = productData;
  let newProduct = product.slice([0], [5]).map((item, i) => {
    return item;
  });
  const [items, setItems] = useState(newProduct);
  // const [items, setItems] = useState(product);

  const [hasMore, setHasMore] = useState(true);

  let router = useRouter();
  let dispatch = useDispatch();

  useEffect(async () => {
    await dispatch(getProduct());
  }, []);

  // React.useEffect(() => {
  //   setItems(product);
  // }, [items, product]);

  const viewProduct = (item) => {
    router.push({
      pathname: `/product_detail`,
      query: { productId: item.productId },
    });
  };

  const addToCartHandler = (product) => {
    dispatch(addToBasket(product));
    router.push("/cart");
  };

  const fetchMoreData = () => {
    setItems(
      product.slice([4], [10]).map((item, i) => {
        return item;
      })
    );
  };
  useEffect(() => {
    setItems(product);
  }, []);

  return (
    <>
      {/* <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      > */}
      {/* {items.map((item) => (
          <ActionAreaCard
            product={item}
            viewProduct={viewProduct}
            addToCartHandler={addToCartHandler}
          ></ActionAreaCard>
        ))} */}
      {/* <ReactLoading
        type="spokes"
        color="blue"
        height={127}
        width={175}
        timeout={1000}
      /> */}
      <Grid
        container
        justifyContent="center"
        alignItems="center"
        minHeight={500}
      >
        {loading ? (
          // <Box sx={{ display: "flex" }}>
          // <ReactLoading
          //   type="spokes"
          //   color="blue"
          //   height={70}
          //   width={70}
          //   // timeout={1000}
          // />

          <CircularProgress size={140} />
        ) : (
          // </Box>
          product.map((item, index) => (
            <ActionAreaCard
              product={item}
              viewProduct={viewProduct}
              addToCartHandler={addToCartHandler}
              key={index}
            >
              {/* {item?.productName}> */}
            </ActionAreaCard>
          ))
        )}
      </Grid>
      {/* </InfiniteScroll> */}
    </>
  );
};

export default Index;
