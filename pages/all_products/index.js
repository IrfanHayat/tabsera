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
  addToCart,
  decreaseBasket,
  getTotals,
  removeFromBasket,
  getCartItems,
  getTotalCartQuantity,
} from "../../slice/basketSlice";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import { useRouter, withRouter } from "next/router";
// import AddPagination from "../../container/AddPagination/AddPagination";
import ReactLoading from "react-loading";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import ModalData from "../../container/Login/ModalData";
import Cookies from "js-cookie";

const style = {
  height: 30,
  border: "1px solid green",
  margin: 6,
  padding: 8,
};

const Index = ({ Item, data }) => {
  // state = {
  //   items: Array.from({ length: 20 }),
  //   hasMore: true,
  // };

  const { productData, loading } = useSelector((state) => state.product);
  let product = productData;
  let [status, setStatus] = useState();
  const [openBar, setOpenBar] = React.useState(false);
  const [open, setOpen] = React.useState(false);
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
    console.log(item);
    router.push({
      pathname: `/product_detail`,
      query: { productId: item.productId },
    });
  };
  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBar(false);
  };

  const addToCartHandler = async (product) => {
    let result = await dispatch(addToCart(product));
    console.log(result);
    if (result?.payload?.resultCode == 4000) {
      //setOpenBar(true);
      setStatus(result?.payload);
      setOpen(true);
      Cookies.set("item", JSON.stringify(product));
    } else {
      dispatch(getCartItems());
      dispatch(getTotalCartQuantity());
      setTimeout(() => {
        router.push("/cart");
      }, 1000);
    }
  };
  const handleClose = () => {
    setOpen(false);
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
      {status?.resultCode === 4000 ? (
        <ModalData handleClose={handleClose} open={open}></ModalData>
      ) : (
        <Snackbar
          open={openBar}
          autoHideDuration={6000}
          onClose={handleCloseBar}
          anchorOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
        >
          <Alert
            onClose={handleCloseBar}
            severity="success"
            sx={{ width: "100%" }}
          >
            Add to Cart Successfully
          </Alert>
        </Snackbar>
      )}
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
        {product && data?.length < 1
          ? product.map((item, index) => (
              <Item key={index}>
                <ActionAreaCard
                  product={item}
                  viewProduct={viewProduct}
                  addToCartHandler={addToCartHandler}
                  key={index}
                >
                  {/* {item?.productName}> */}
                </ActionAreaCard>
              </Item>
            ))
          : data?.map((item, index) => (
              <ActionAreaCard
                product={item}
                viewProduct={viewProduct}
                addToCartHandler={addToCartHandler}
                key={index}
              >
                {/* {item?.productName}> */}
              </ActionAreaCard>
            ))}
      </Grid>
      {/* </InfiniteScroll> */}
    </>
  );
};

export default Index;
