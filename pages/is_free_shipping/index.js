import React, { useState, useEffect } from 'react'
import { getFreeShipping } from "../../slice/freeShippingSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import FreeShipping from "../../container/DealsAndPromotions/FreeShipping";
import Grid from '@mui/material/Grid';
import ViewAllProducts from "../../pages/all_products";
function Index({ data, showProduct, showAllCategoryPro, showAllMerchantPro, filterData }) {
    const { freeShippingData } = useSelector((state) => state.freeShipping);

    let dispatch = useDispatch();
    const router = useRouter();


    console.log(freeShippingData);

    const viewProduct = (item) => {
        router.push({
            pathname: "/product_detail",
            query: { productId: item.productId },
        });
    };
    useEffect(() => {

        dispatch(getFreeShipping());
        // dispatch(couponsData());
    }, []);


    return (
        <>
            <Grid container justifyContent="center">
                {data?.length > 0 && showProduct == false && showAllCategoryPro == false && showAllMerchantPro == false ? (
                    <ViewAllProducts
                        viewProduct={viewProduct}
                        data={data}
                    // dealsData={dealsData && dealsData}
                    />
                ) : (
                    ""
                )}
                {showAllCategoryPro}
                {showProduct && showAllCategoryPro == false && data?.length > 0 ? (
                    <ViewAllProducts
                        viewProduct={viewProduct}
                        data={data && data}
                    // dealsData={dealsData && dealsData}
                    />
                ) : (
                    ""
                )}
                {/* {showAllCategoryPro && data.length > 0 ? (
                    <FreeShipping
                        viewProduct={viewProduct}
                        freeShippingData={data && data}
                    // dealsData={dealsData && dealsData}
                    />
                ) : (
                    ""
                )} */}

            </Grid>
        </>
    )
}

export default Index