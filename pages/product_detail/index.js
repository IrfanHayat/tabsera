import React, { useState, useMemo, useEffect } from "react";
import Details from "../../container/Detail";
import { useSelector, useDispatch } from "react-redux";
import { addToBasket } from "../../slice/basketSlice";
import { useRouter, withRouter } from "next/router";
import { getProductWithId, getProduct } from "../../slice/productSlice";
function product_detail(props) {
  const { filterProductData } = useSelector((state) => state.product);
  let [productImage, setProductImage] = useState();
  let [productAttributes, setProductAttributes] = useState([]);
  let [price, setPrice] = useState();

  let router = useRouter();
  console.log(filterProductData);
  let dispatch = useDispatch();
  let [filterData, setFilterData] = useState({});

  useEffect(() => {
    dispatch(getProductWithId(router?.query?.productId));
  }, []);

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
      console.log(product);
      let cost;
      let image;
      let sku;

      product.skus.map((result) => {
        sku = result.sku;
      });

      product.skus.map((result) => {
        cost = result.cost;
      });

      product.product_images.map((result) => {
        image = result.media_images[0];
      });

      console.log(cost);
      let obj = {
        productId: product.product_id,
        productName: product.product_name,
        productImage: image,
        isfreeShipping: product.is_free_shipping,
        // productCost: product.cost,
        categoryName: product.category_name,
        merchantId: product.merchant_id,
        merchanName: product.merchant_name,
        productDescription: product.product_desc,
        productCost: cost,
        skuId: sku,
        // productCost: product.skus[0],
        // averageRating: product.averageRating,
      };

      dispatch(addToBasket(obj));
      //      router.push({
      // //       pathname: "/cart",
      // //       query: { sub_category: item },
      // //     });
      router.push("/cart");
    } else {
      dispatch(addToBasket(product));
      router.push("/cart");
    }
  };

  return (
    <div>
      <Details
        productDetail={filterProductData}
        addToCartHandler={addToCartHandler}
        productImage={productImage}
        productAttributes={productAttributes}
        price={price}
      ></Details>
    </div>
  );
}

export default withRouter(product_detail);
