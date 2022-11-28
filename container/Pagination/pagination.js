import React, { useEffect, useState } from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { data } from 'autoprefixer';

const PaginationData = ({ perPage, totalLength, paginate }) => {
    const pagenumber = [];
    let [pageNumber, setPageNumber] = useState(1)

    useEffect(() => {

    }, [])

    for (let i = 1; i <= Math.ceil(totalLength / perPage); i++) {
        pagenumber.push(i);
    }
    const paginate1 = (event, number) => {

        paginate(number)
        setPageNumber(number)
    }
    // const paginateNext = (number) => {
    //     if (pagenumber.length > number) {

    //         paginate(number + 1)
    //         setPageNumber(number + 1)
    //     }
    // }
    // const paginatePrev = (number) => {
    //     if (number > 1) {


    //         paginate(number - 1)
    //         setPageNumber(number - 1)
    //     }
    // }

    return (
        <>


            <Pagination sx={{ display: "flex", justifyContent: "center", width: "100%", mt: "5%" }} count={Math.ceil(totalLength / 4)} variant="outlined" color="primary" onChange={paginate1} >

            </Pagination>

            {/* {pagenumber.map(number => (
                <div key={number}>

                   

                </div>
            ))} */}
        </>


    )
}

export default PaginationData