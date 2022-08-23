import React from 'react'
import { Typography } from '@mui/material'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Item from '../Item/Item'



function PriceFilter({ MinInput, MaxInput, priceFilter }) {
    return (
        <>
            <Typography sx={{ mt: 2 }}>Price</Typography>

            <TextField sx={{ width: 100 }} id="filled-basic" label="MIN" variant="filled" inputRef={MinInput}
                name={'minPrice'} />
            <Typography sx={{ mt: 2 }} >-</Typography>

            <TextField sx={{ width: 100 }} id="filled-basic" label="MAX" variant="filled" inputRef={MaxInput}
                name={'maxPrice'} />
            <Item><Button onClick={priceFilter}>OK</Button></Item>

        </>
    )
}

export default PriceFilter