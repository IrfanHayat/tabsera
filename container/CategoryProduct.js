import React, { useState } from "react";
import Button from "@mui/material/Button";
import ActionAreaCard from "../container/Card";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

export default function CategoryProduct({
    product,
    heading,
    content,
    viewProduct,
    addToCartHandler,
    viewCategory,
}) {
    let [productView, setProuctView] = useState(false);
    let [categoryView, setCategoryView] = useState(false);
    let [cartView, setCartView] = useState(false);
    const [rtl, setrtl] = useState(false);
    console.log(product);
    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    // p: 1,
                    m: 1,
                    // flexWrap: "wrap",
                    // bgcolor: "background.paper",
                    borderRadius: 1,
                }}
            >
                <Box
                    sx={{
                        mx: 5,
                        color: (theme) =>
                            theme.palette.mode === "dark" ? "grey.300" : "grey.800",
                        borderColor: (theme) =>
                            theme.palette.mode === "dark" ? "grey.800" : "grey.300",
                        fontSize: "1.1rem",
                        fontWeight: "600",
                    }}
                >
                    {heading}
                </Box>

                <Box
                    component="div"
                    sx={{
                        display: "flex",
                        justifyContent: "flex-end",
                        // display: "inline",
                        mx: 5,
                        // flexWrap: "wrap",
                        // mx: 5,
                        // my: 2,
                    }}
                >
                    <Button
                        // dir="rtl"
                        variant="text"
                        href="/all_products"
                        underline="none"
                        size="small"
                        sx={{ fontSize: "0.70rem", fontWeight: "600" }}
                    // style={{ fontWeight: "bold" }}
                    // dir="rtl"
                    // endIcon={<DoubleArrowIcon />}
                    >
                        View All {">>"}
                    </Button>
                </Box>
            </Box>

            <Grid
                container
                justifyContent="center"
                alignItems="center"
                minHeight={500}
            >
                {product?.map((item, index) => (
                    <ActionAreaCard
                        key={index}
                        product={item}
                        viewProduct={viewProduct}
                        addToCartHandler={addToCartHandler}
                        viewCategory={viewCategory}
                        productView={productView}
                        categoryView={categoryView}
                        cartView={cartView}
                    ></ActionAreaCard>
                ))}
            </Grid>
        </>

    );
}
