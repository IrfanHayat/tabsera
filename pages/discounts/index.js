import React, { useEffect } from 'react'
import Discounts from "../../container/DealsAndPromotions/Discounts";
import { getDiscounts } from "../../slice/discountsSlice";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Grid from "@mui/material/Grid";
function Index() {
    const { discountsData } = useSelector((state) => state.discounts);
    let dispatch = useDispatch();
    const router = useRouter();


    console.log(discountsData);

    const viewProduct = (item) => {
        router.push({
            pathname: "/product_detail",
            query: { productId: item.productId },
        });
    };
    useEffect(() => {

        dispatch(getDiscounts());
        // dispatch(couponsData());
    }, []);


    return (
        <>
            <Grid container justifyContent="center">
                {discountsData.length > 0 ? (
                    <Discounts
                        viewProduct={viewProduct}
                        discountsData={discountsData && discountsData}
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