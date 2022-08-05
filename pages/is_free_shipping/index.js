import React, { useState, useEffect } from 'react'
import { getFreeShipping } from "../../slice/freeShippingSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import FreeShipping from "../../container/DealsAndPromotions/FreeShipping";
import Grid from '@mui/material/Grid';
function Index() {
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
                {freeShippingData.length > 0 ? (
                    <FreeShipping
                        viewProduct={viewProduct}
                        freeShippingData={freeShippingData && freeShippingData}
                    // dealsData={dealsData && dealsData}
                    />
                ) : (
                    ""
                )}
            </Grid>
        </>
    )
}

export default Index