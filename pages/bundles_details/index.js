import React, { useState, useMemo, useEffect } from "react";
import Details from "../../container/Bundles_Detail";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import {
    addToBasket,
    BuyNewItem,
    addToCart,
    addToBundleCart,
    getCartItems,
    getTotalCartQuantity,
} from "../../slice/basketSlice";
import MuiAlert from "@mui/material/Alert";
import { useRouter, withRouter } from "next/router";
import { getProductWithId, getProduct, getBrandWithId } from "../../slice/productSlice";
import { getMerchantWithId } from "../../slice/merchantSlice";
import ModalData from "../../container/Login/ModalData";
import Cookies from "js-cookie";
import localStorage from "localStorage";
import { useTranslation } from "react-i18next";
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
function Bundle_detail(props) {
    const { filterProductData } = useSelector((state) => state.product);
    const { productData } = useSelector((state) => state.product);
    const { addCart } = useSelector((state) => state.basket.cart);
    const { addBuyItem } = useSelector((state) => state.basket);

    const { merchantData } = useSelector((state) => state.merchant);
    const { shipmentData } = useSelector((state) => state.shipments);

    let [productImage, setProductImage] = useState();
    let [bundlesData, setBundlesData] = useState();
    let [productAttributes, setProductAttributes] = useState([]);
    let [price, setPrice] = useState();
    let [status, setStatus] = useState();
    const [showLogin, setShowLogin] = useState(false);
    let [buyStatus, setBuyStatus] = useState();
    let [flag, setFlag] = useState(false);
    let router = useRouter();
    let dispatch = useDispatch();
    let [filterData, setFilterData] = useState({});
    const [openBar, setOpenBar] = React.useState(false);
    const { cartItems } = useSelector((state) => state.basket.cart);

    const [open, setOpen] = React.useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    console.log(addBuyItem);
    const viewStore = (categoryId, merchantId) => {
        router.push({
            pathname: "/merchant_store",
            query: { categoryId: categoryId, merchantId: merchantId },
        });
    };

    const handleCloseBar = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        setOpenBar(false);
    };
    useEffect(async () => {
        localStorage.setItem("productId", router?.query?.productId);

        let result = await dispatch(getBrandWithId(router?.query?.productId));
        setBundlesData(result?.payload)
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
        console.log(sku);
        sku?.map((result) => {
            setProductImage(result.sku_images);
            setProductAttributes(result.attributes);

            setPrice(result.cost);
        });
    };

    useEffect(() => {
        setStatus(addCart);
    }, [addCart]);

    useMemo(() => skuData(filterProductData.skus), [filterProductData.skus]);

    // const addToCartHandler = async (item, skus) => {

    //     console.log("item");
    //     console.log(item);
    //     let product = {
    //         product_id: item.bundleId,
    //         product_name: item.bundleName,
    //         product_desc: item.bundleDesc,
    //         // is_free_shipping: item.is_free_shipping,
    //         merchant_id: item.merchantId,
    //         merchant_name: item.merchantName,
    //         // category_name: item.category_name,
    //         product_images: item.bundleImage

    //     };
    //     let result = await dispatch(addToBundleCart(item));
    //     if (result?.payload?.resultCode == 4000) {
    //         //setOpenBar(true);
    //         setStatus(result?.payload);
    //         setOpen(true);
    //         Cookies.set("item", JSON.stringify(item));
    //     } else {
    //         dispatch(getCartItems());
    //         dispatch(getTotalCartQuantity());
    //         setTimeout(() => {
    //             router.push("/cart");
    //         }, 1000);
    //     }

    //     console.log(result);

    //     // router.push("/cart");


    //     // if (item.product_id) {

    //     //   dispatch(addToCart(item))
    //     //  // dispatch(addToBasket(product));

    //     //   router.push("/cart");
    //     // } else {
    //     //   dispatch(addToBasket(item));
    //     //   router.push("/cart");
    //     // }
    // };
    const addToCartHandler = async (item, skus) => {
        if (skus) {
            let product = {
                product_id: item.product_id,
                product_name: item.product_name,
                product_desc: item.product_desc,
                // is_free_shipping: item.is_free_shipping,
                merchant_id: item.merchant_id,
                merchant_name: item.merchant_name,
                category_name: item.category_name,
                product_images: item.product_images,
                skus: [skus],
            };
            // console.log("product");
            // console.log(product);
            let result = await dispatch(addToCart(product));
            dispatch(getCartItems());

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

            await dispatch(getTotalCartQuantity());
            // router.push("/cart");
        } else {
            // console.log("item");
            // console.log(item);
            let result = await dispatch(addToCart(item));
            if (result?.payload?.resultCode == 4000) {
                //setOpenBar(true);
                setStatus(result?.payload);
                setOpen(true);
                Cookies.set("item", JSON.stringify(item));
            } else {
                dispatch(getCartItems());
                dispatch(getTotalCartQuantity());
                setTimeout(() => {
                    router.push("/cart");
                }, 1000);
            }

            console.log(result);

            // router.push("/cart");
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

    const BuyHandler = async (item, skus) => {
        if (skus) {
            let product = {
                product_id: item.product_id,
                product_name: item.product_name,
                product_desc: item.product_desc,
                // is_free_shipping: item.is_free_shipping,
                merchant_id: item.merchant_id,
                merchant_name: item.merchant_name,
                category_name: item.category_name,
                product_images: item.product_images,
                skus: [skus],
            };

            let result = await dispatch(BuyNewItem(product));
            console.log(result);
            console.log("status", status.resultCode);
            console.log(status);

            // dispatch(addToCart(item));
            if (result?.payload?.resultCode == 4000) {
                // setOpenBar(true);
                Cookies.set("productId", router.query.productId);
                setOpen(true);
                setBuyStatus(true);
                Cookies.set("item", JSON.stringify(product));
            } else {
                localStorage.setItem("buyItem", true);
                router.push("/cart");
            }
            // dispatch(addToCart(product));
            dispatch(getTotalCartQuantity(true));
            //router.push("/shipping_information");
        } else {
            let result = await dispatch(BuyNewItem(item));
            console.log(result);
            console.log("status", status.resultCode);
            console.log(status);

            // dispatch(addToCart(item));
            if (result?.payload?.resultCode == 4000) {
                // setOpenBar(true);
                Cookies.set("productId", router.query.productId);
                setOpen(true);
                setBuyStatus(true);
                Cookies.set("item", JSON.stringify(item));
            } else {
                localStorage.setItem("buyItem", true);
                router.push("/cart");
            }
            // setTimeout(() => {
            //   dispatch(getTotalCartQuantity());
            // }, 1000);
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
        console.log(status);
        if (status?.resultCode == 4000) {
            setOpenBar(true);
        }
    }, [status]);

    const checkoutHandler = () => {
        router.push("/shipping");
    };

    const handleAddToCart = async (item) => {
        dispatch(addToBasket(item));

        setTimeout(() => {
            dispatch(getTotalCartQuantity());
        }, 1000);
    };
    return (
        <>
            {status?.resultCode === 4000 || buyStatus == true ? (
                <ModalData
                    isLoggedIn={isLoggedIn}
                    handleClose={handleClose}
                    open={open}
                    setIsLoggedIn={setIsLoggedIn}
                ></ModalData>
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
            {Object.keys(filterData).length > 0 ? (
                <Details
                    productDetail={filterData || {}}
                    merchantDetail={merchantData}
                    addToCartHandler={addToCartHandler}
                    BuyHandler={BuyHandler}
                    productImage={productImage}
                    handleAddToCart={handleAddToCart}
                    productAttributes={productAttributes}
                    price={price}
                    checkoutHandler={checkoutHandler}
                    viewStore={viewStore}
                    productIdRoute={router.query.productId}
                ></Details>
            ) : (
                <Details
                    productDetail={bundlesData || {}}
                    merchantDetail={merchantData}
                    addToCartHandler={addToCartHandler}
                    BuyHandler={BuyHandler}
                    handleAddToCart={handleAddToCart}
                    productImage={productImage}
                    productAttributes={productAttributes}
                    price={price}
                    checkoutHandler={checkoutHandler}
                    viewStore={viewStore}
                    productIdRoute={router.query.productId}
                ></Details>
            )}
        </>
    );
}

export default withRouter(Bundle_detail);
