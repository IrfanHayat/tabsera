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
import {
  getProductSearchWithHint,
  getProductSearch,
} from "../../slice/productSlice";

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
  console.log(data);

  const { productData, loading } = useSelector((state) => state.product);
  let product = productData;
  let [status, setStatus] = useState();
  const [openBar, setOpenBar] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  let [searchData, setSearchData] = useState();
  let newProduct = product.slice([0], [5]).map((item, i) => {
    return item;
  });
  const [items, setItems] = useState(newProduct);
  // const [items, setItems] = useState(product);

  const [hasMore, setHasMore] = useState(true);

  let router = useRouter();
  let dispatch = useDispatch();

  useEffect(async () => {
    let result = await dispatch(getProductSearch(router?.query?.data));
    console.log(result);
    setSearchData(result.payload);
  }, []);

  useEffect(() => { }, [searchData]);
  useEffect(async () => {
    console.log(router.query);
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
    console.log(product)
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
      // setTimeout(() => {
      //   router.push("/cart");
      // }, 1000);
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
        // margin="auto"
        // style={{ paddingLeft: "0px", paddingRight: "0px" }}
        // justifyContent="center"
        // alignItems="center"
        sx={{ display: "flex" }}
      // minHeight={500}
      >
        {product && data?.length < 1
          ? router.query.data?.map((item, index) => (
            // <Item key={index}>
            <ActionAreaCard
              product={item}
              viewProduct={viewProduct}
              addToCartHandler={addToCartHandler}
              key={index}
            >
              {/* {item?.productName}> */}
            </ActionAreaCard>
            // </Item>
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
        {searchData?.length > 0 ? (
          searchData?.map((item, index) => (
            <ActionAreaCard
              product={item}
              viewProduct={viewProduct}
              addToCartHandler={addToCartHandler}
              key={index}
            >
              {/* {item?.productName}> */}
            </ActionAreaCard>
          ))
        ) : (
          <></>
        )}
      </Grid>
      {/* </InfiniteScroll> */}
    </>
  );
};

export default Index;
