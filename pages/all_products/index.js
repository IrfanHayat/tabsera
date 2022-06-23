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
//   console.log("product", product);
//   const [page, setPage] = useState(product);
//   console.log("page", page);
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
import {
  addToBasket,
  clearBasket,
  decreaseBasket,
  getTotals,
  removeFromBasket,
} from "../../slice/basketSlice";
import { useRouter, withRouter } from "next/router";
// import AddPagination from "../../container/AddPagination/AddPagination";

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

  const product = useSelector((state) => state.product.productData);
  const [items, setItems] = useState(Array.from({ length: 10 }));
  // const [items, setItems] = useState(product);
  console.log("item ---> ", items);

  const [hasMore, setHasMore] = useState(true);

  console.log("product", product);
  let router = useRouter();
  let dispatch = useDispatch();

  // const [page, setPage] = useState(product);
  // console.log("item", page);

  useEffect(async () => {
    await dispatch(getProduct());
  }, []);

  React.useEffect(() => {
    setItems(product);
  }, [items, product]);

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
    if (items.length >= product.length) {
      setHasMore(false);
      // this.setState({ hasMore: false });
      return;
    }
    // a fake async api call like which sends
    // 20 more records in .5 secs
    setTimeout(() => {
      setItems(items.concat(Array.from({ length: 10 })));
      //  setItems({
      //    items: this.state.items.concat(Array.from({ length: 20 })),
      //  });
    }, 1000);
  };

  return (
    <div>
      <h1>demo: react-infinite-scroll-component</h1>
      <hr />
      <InfiniteScroll
        dataLength={items.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
        {/* {items.map((item) => (
          <ActionAreaCard
            product={item}
            viewProduct={viewProduct}
            addToCartHandler={addToCartHandler}
          ></ActionAreaCard>
        ))} */}

        {items.map((item, index) => (
          <ActionAreaCard
            product={item}
            viewProduct={viewProduct}
            addToCartHandler={addToCartHandler}
            key={index}
          >
            {/* {item?.productName}> */}
          </ActionAreaCard>
        ))}
      </InfiniteScroll>
    </div>
  );
};

export default Index;
