import React, { useState, useMemo, useEffect } from "react";
import Details from "../../container/Detail";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket } from "../../slice/basketSlice";
import { useRouter, withRouter } from "next/router";
import { getProductWithId, getProduct } from "../../slice/productSlice";
import { getMerchantWithId } from "../../slice/merchantSlice";

function product_detail(props) {
  const { filterProductData } = useSelector((state) => state.product);
  const { productData } = useSelector((state) => state.product);

  const { merchantData } = useSelector((state) => state.merchant);
  const { shipmentData } = useSelector((state) => state.shipments);

  console.log("new shipmentData= ", shipmentData);
  // console.log("merchant ", merchantData);
  console.log("---------------------------------------------------");
  console.log("filterProductData", filterProductData);
  console.log("---------------------------------------------------");
  console.log("productData", productData);
  console.log("---------------------------------------------------");

  let [productImage, setProductImage] = useState();
  let [productAttributes, setProductAttributes] = useState([]);
  let [price, setPrice] = useState();

  let router = useRouter();
  console.log(filterProductData);
  let dispatch = useDispatch();
  let [filterData, setFilterData] = useState({});

  console.log("merchant  id ", filterProductData.merchant_id);

  useEffect(() => {
    // console.log(router.query.product_name);
    console.log("merchant ", filterProductData.merchant_id);

    dispatch(getProduct());
    dispatch(getProductWithId(router?.query?.productId));
    dispatch(getMerchantWithId(filterProductData.merchant_id));

    if (router.query.product_name) {
      const productObj = productData.filter((result) => {
        console.log(result.productName);
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
      console.log(result.attributes);
      console.log(productAttributes);
      setPrice(result.cost);
    });
  };

  useMemo(() => skuData(filterProductData.skus), [filterProductData.skus]);

  const addToCartHandler = (product) => {
    if (product.product_id) {
      dispatch(addToBasket(product));

      router.push("/cart");
    } else {
      dispatch(addToBasket(product));
      router.push("/cart");
    }
  };

  return (
    <div>
      <Details
        productDetail={
          Object.keys(filterData).length > 0 ? filterData : filterProductData
        }
        addToCartHandler={addToCartHandler}
        productImage={productImage}
        productAttributes={productAttributes}
        price={price}
      ></Details>
    </div>
  );
}

export default withRouter(product_detail);
