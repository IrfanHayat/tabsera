import React, { useState, useMemo, useEffect } from "react";
import Details from "../../container/Detail";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import {
  addToBasket,
  buyItem,
  addToCart,
  getCartItems,
  getTotalCartQuantity,
} from "../../slice/basketSlice";
import MuiAlert from "@mui/material/Alert";
import { useRouter, withRouter } from "next/router";
import { getProductWithId, getProduct } from "../../slice/productSlice";
import { getMerchantWithId } from "../../slice/merchantSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Product_detail(props) {
  const { filterProductData } = useSelector((state) => state.product);
  const { productData } = useSelector((state) => state.product);
  const { addCart } = useSelector((state) => state.basket.cart);

  const { merchantData } = useSelector((state) => state.merchant);
  const { shipmentData } = useSelector((state) => state.shipments);

  let [productImage, setProductImage] = useState();
  let [productAttributes, setProductAttributes] = useState([]);
  let [price, setPrice] = useState();

  let router = useRouter();
  let dispatch = useDispatch();
  let [filterData, setFilterData] = useState({});
  const [openBar, setOpenBar] = React.useState(false);
  const { cartItems } = useSelector((state) => state.basket.cart);

  const viewStore = (merchantId) => {
    router.push({
      pathname: "/merchant_store",
      query: { merchantId: merchantId },
    });
  };

  const handleCloseBar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenBar(false);
  };
  useEffect(() => {
    localStorage.setItem("productId", router?.query?.productId);

    dispatch(getProductWithId(router?.query?.productId));
  }, [router.query.productId]);

  useEffect(() => {
    // dispatch(getProduct());
    if (filterProductData.merchant_id) {
      dispatch(getMerchantWithId(filterProductData.merchant_id));
    }

    if (router.query.product_name) {
      const productObj = productData.filter((result) => {
        return result.productName == router.query.product_name;
      });
      let productWithName = productObj.map((result) => {
        let obj = {
          product_id: result.productId,
          product_name: result.productName,

          category_name: result.categoryName,
          merchant_id: result.merchantId,
        };
        return obj;
      });
      setFilterData(productWithName[0]);
    }
  }, [filterProductData.merchant_id]);

  const skuData = (sku) => {
    sku?.map((result) => {
      setProductImage(result.sku_images);
      setProductAttributes(result.attributes);

      setPrice(result.cost);
    });
  };

  useEffect(() => {
    console.log(addCart);
  }, [addCart]);
  useMemo(() => skuData(filterProductData.skus), [filterProductData.skus]);

  const addToCartHandler = async (item, skus) => {
    if (skus) {
      let product = {
        product_id: item.product_id,
        product_name: item.product_name,
        product_desc: item.product_desc,
        is_free_shipping: item.is_free_shipping,
        merchant_id: item.merchant_id,
        merchant_name: item.merchant_name,
        category_name: item.category_name,
        product_images: item.product_images,
        skus: [skus],
      };
      // console.log("product");
      // console.log(product);
      await dispatch(addToCart(product));
      dispatch(getCartItems());
      // console.log(addCart);
      if (addCart?.resultCode == 4000) {
        setOpenBar(true);
      }

      await dispatch(getTotalCartQuantity());
    } else {
      // console.log("item");
      // console.log(item);
      await dispatch(addToCart(item));
      dispatch(getCartItems());
      // console.log(addCart);
      if (addCart?.resultCode == 4000) {
        setOpenBar(true);
      }
      setTimeout(() => {
        dispatch(getTotalCartQuantity());
      }, 1000);
      //  router.push("/cart");
    }

    // if (item.product_id) {

    //   dispatch(addToCart(item))
    //  // dispatch(addToBasket(product));

    //   router.push("/cart");
    // } else {
    //   dispatch(addToBasket(item));
    //   router.push("/cart");
    // }
  };
  useEffect(() => {
    dispatch(getCartItems());
  }, []);

  const BuyHandler = (item, skus) => {
    if (skus) {
      let product = {
        product_id: item.product_id,
        product_name: item.product_name,
        product_desc: item.product_desc,
        is_free_shipping: item.is_free_shipping,
        merchant_id: item.merchant_id,
        merchant_name: item.merchant_name,
        category_name: item.category_name,
        product_images: item.product_images,
        skus: [skus],
      };

      dispatch(buyItem(product));
      // dispatch(addToCart(product));
      dispatch(getTotalCartQuantity(true));
      router.push("/shipping_information");
    } else {
      dispatch(buyItem(item));
      // dispatch(addToCart(item));
      setTimeout(() => {
        dispatch(getTotalCartQuantity());
      }, 1000);

      router.push("/shipping_information");
    }

    // if (item.product_id) {

    //   dispatch(addToCart(item))
    //  // dispatch(addToBasket(product));

    //   router.push("/cart");
    // } else {
    //   dispatch(addToBasket(item));
    //   router.push("/cart");
    // }
  };
  const checkoutHandler = () => {
    router.push("/shipping");
  };

  return (
    <>
      {addCart?.resultCode === 4000 ? (
        <Snackbar
          open={openBar}
          autoHideDuration={2000}
          onClose={handleCloseBar}
          anchorOrigin={{
            horizontal: "center",
            vertical: "top",
          }}
        >
          <Alert
            onClose={handleCloseBar}
            severity="error"
            sx={{ width: "100%" }}
          >
            Please Login
          </Alert>
        </Snackbar>
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
            {addCart?.message}
          </Alert>
        </Snackbar>
      )}
      {Object.keys(filterData).length > 0 ? (
        <Details
          productDetail={filterData || []}
          merchantDetail={merchantData}
          addToCartHandler={addToCartHandler}
          BuyHandler={BuyHandler}
          productImage={productImage}
          productAttributes={productAttributes}
          price={price}
          checkoutHandler={checkoutHandler}
          viewStore={viewStore}
        ></Details>
      ) : (
        <Details
          productDetail={filterProductData || []}
          merchantDetail={merchantData}
          addToCartHandler={addToCartHandler}
          BuyHandler={BuyHandler}
          productImage={productImage}
          productAttributes={productAttributes}
          price={price}
          checkoutHandler={checkoutHandler}
          viewStore={viewStore}
        ></Details>
      )}
    </>
  );
}

export default withRouter(Product_detail);
