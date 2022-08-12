import React, { useState, useEffect } from 'react'
import CategoryProduct from '../../container/CategoryProduct'
import Grid from '@mui/material/Grid';

import { getCategory } from "../../slice/categorySlice";
import { addToBasket } from "../../slice/basketSlice";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";

function Index({ data, Item }) {

    let [groupProduct, setGroupedProduct] = useState();
    let router = useRouter();
    let dispatch = useDispatch();

    const viewProduct = (item) => {
        router.push({
            pathname: "/product_detail",
            query: { productId: item.productId },
        });
    };

    const viewCategory = (item) => {
        router.push({
            pathname: "/sub_category",
            query: { sub_category: item },
        });
    };

    const addToCartHandler = (product) => {
        dispatch(addToBasket(product));
        router.push("/cart");
    };
    useEffect(() => {
        dispatch(getCategory());
    }, []);

    function groupArrayOfObjects(list) {
        const grouped = _.groupBy(list, (items) => items.categoryName);
        return grouped;
    }
    useEffect(() => {
        if (data) {
            var groupedCategory = groupArrayOfObjects(data);
            setGroupedProduct(groupedCategory);
        }
    }, [data]);

    // const categoryData = (category) => {
    //   let result1 =
    //     category &&
    //     category.map((result) => {
    //       if (result.child.length > 0) {
    //         return result.child;
    //       }
    //     });
    //   let result3 =
    //     category &&
    //     category.map((result) => {
    //       if (result.child.length > 0) {
    //         return result.category_name;
    //       }
    //     });

    //   let result2 = result1 && result1.filter((result) => result != undefined);
    //   let result4 = result3 && result3.filter((result) => result != undefined);

    //   if (groupProduct) {
    //     let result5 = Object.keys(groupProduct).map((pro) => {
    //       if (pro == result4.toString().split(" ").join("")) {
    //         let result = groupProduct[pro].concat(result2[0]);
    //         groupProduct[pro] = result;
    //         return groupProduct;
    //       }
    //     });
    //     let result6 = result5.filter((result) => result != undefined);
    //     setGroupedProduct(result6[0]);
    //   }
    // };

    // useMemo(() => categoryData(category), [category && category && groupProduct]);

    return (
        <>
            {groupProduct ?
                Object.keys(groupProduct).map((key, index) => (
                    <Grid item xs={12} md={12} key={index}>

                        <CategoryProduct
                            Item={Item}
                            heading={key}
                            product={groupProduct[key]}
                            viewProduct={viewProduct}
                            addToCartHandler={addToCartHandler}
                            viewCategory={viewCategory}
                        />

                    </Grid>
                )) : <></>}
        </>
    )
}

export default Index