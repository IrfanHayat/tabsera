import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import { getReviewsProduct } from "../../slice/productSlice";
import Stack from '@mui/material/Stack';
import Avatar from '@mui/material/Avatar';
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { AppBar, Divider, ListItemIcon } from "@mui/material";
import Rating from "@mui/material/Rating";
function Reviews({ productId }) {
    let [ratingProduct, setRatingProduct] = useState([]);
    let dispatch = useDispatch();
    useEffect(async () => {

        let rating_product = await dispatch(getReviewsProduct(productId))

        setRatingProduct(rating_product.payload)

    }, [])
    return (
        <>  {
            ratingProduct.length > 0 ? ratingProduct?.map(result => (
                <>
                    <Stack direction="row" sx={{ display: "flex" }} spacing={2}>
                        <Avatar alt="Rating" src="/static/images/avatar/1.jpg" />

                        <Box><Typography>{result?.customerName}</Typography>
                            <Box sx={{ display: "flex", justifyContent: 'space-around' }}>
                                <Typography><Rating
                                    // className={styles.Rating}
                                    name="size-small"
                                    defaultValue={result?.rating}
                                    size="small"
                                    // fontSize={24}
                                    readOnly
                                /></Typography>
                                <Typography sx={{ marginLeft: 2 }}> {result.rating} </Typography><Typography sx={{ marginLeft: 2 }}>{result.date}</Typography></Box>

                        </Box>


                    </Stack>
                    <Box sx={{ display: "flex-start", marginTop: "2%", justifyContent: 'center' }}>
                        {result.review}
                    </Box>

                    <Divider />
                </>
            )) : <></>
        }</>
    )
}

export default Reviews