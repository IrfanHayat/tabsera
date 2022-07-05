import React, { useState, useMemo, useEffect } from "react";
import Details from "../../container/Detail";
import { useSelector, useDispatch } from "react-redux";
import {
  addToBasket,
  addToCart,
  getTotalCartQuantity,
} from "../../slice/basketSlice";
import { useRouter, withRouter } from "next/router";
import { getProductWithId, getProduct } from "../../slice/productSlice";
import { getMerchantWithId } from "../../slice/merchantSlice";

function product_detail(props) {
  const { filterProductData } = useSelector((state) => state.product);
  const { productData } = useSelector((state) => state.product);

  const { merchantData } = useSelector((state) => state.merchant);
  const { shipmentData } = useSelector((state) => state.shipments);

  let [productImage, setProductImage] = useState();
  let [productAttributes, setProductAttributes] = useState([]);
  let [price, setPrice] = useState();

  let router = useRouter();
  let dispatch = useDispatch();
  let [filterData, setFilterData] = useState({});

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getProductWithId(router?.query?.productId));
    dispatch(getMerchantWithId(filterProductData.merchant_id));

    if (router.query.product_name) {
      const productObj = productData.filter((result) => {
        return result.productName == router.query.product_name;
      });
      let productWithName = productObj.map((result) => {
        let obj = {
          product_id: result.productId,
          product_name: result.productName,

          // isfreeShipping: result.is_free_shipping,
          // productCost: result.cost,
          category_name: result.categoryName,
          merchant_id: result.merchantId,
          //merchanName: result.merchant_name,
          //productDescription: result.product_desc,
          //productCost: cost,
          //skuId: sku,
          // productCost: result.skus[0],
          // averageRating: result.averageRating,
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

      await dispatch(addToBasket(product));
      await dispatch(getTotalCartQuantity());
    } else {
      dispatch(addToBasket(item));
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

      dispatch(addToCart(product));
      dispatch(getTotalCartQuantity(true));
      router.push("/shipping_information");
    } else {
      dispatch(addToCart(item));
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
    {Object.keys(filterData).length > 0? 
        <Details
        productDetail={filterData || []}
        merchantDetail={merchantData}
        addToCartHandler={addToCartHandler}
        BuyHandler={BuyHandler}
        productImage={productImage}
        productAttributes={productAttributes}
        price={price}
        checkoutHandler={checkoutHandler}
        ></Details>:<Details
        productDetail={filterProductData || []
        }
        merchantDetail={merchantData}
        addToCartHandler={addToCartHandler}
        BuyHandler={BuyHandler}
        productImage={productImage}
        productAttributes={productAttributes}
        price={price}
        checkoutHandler={checkoutHandler}
        ></Details>                           
    
    }
 
    </>
  );
}


export default withRouter(product_detail);
