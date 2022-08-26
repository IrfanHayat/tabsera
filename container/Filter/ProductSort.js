import { useState } from 'react';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
    { value: 'price_desc', label: 'Price: High-Low' },
    { value: 'price_asc', label: 'Price: Low-High' },
    { value: 'rating_asc', label: 'Rating: High-Low' },
    { value: 'rating_desc', label: 'Rating: Low-High' },
    { value: 'order_desc', label: 'Order: Low-High' },
    { value: 'order_asc', label: 'Rating: High-Low' }

];

export default function ShopProductSort({ data, setFilterData }) {
    const [open, setOpen] = useState(null);
    const [selectedValue, setSelectedValue] = useState();


    const sortData = (type) => {
        setSelectedValue(type)
        var f_data;
        switch (type) {
            case "price_desc":
                {
                    f_data = data.slice().sort(function (a, b) {
                        return parseFloat(b.productCost) - parseFloat(a.productCost);
                    });
                    console.log(f_data);
                    setFilterData(f_data);
                }

                break;
            case "price_asc":
                f_data = data.slice().sort(function (a, b) {
                    return parseFloat(a.productCost) - parseFloat(b.productCost);
                });
                console.log(f_data);
                setFilterData(f_data);
            case "rating_asc":
                f_data = data.slice().sort(function (a, b) {
                    return parseFloat(b.averageRating) - parseFloat(a.averageRating);
                });
                console.log(f_data);
                setFilterData(f_data);
                break;
            case "rating_desc":
                f_data = data.slice().sort(function (a, b) {
                    return parseFloat(a.averageRating) - parseFloat(b.averageRating);
                });
                setFilterData(f_data);
                break;
            // case 'order_asc':
            //   text = "Today is Sunday";
            //   break;
            // case 'order_desc':
            //   text = "Today is Sunday";
            //   break;
            default:
                "Looking forward to the Weekend";
        }
    };



    const handleOpen = (event) => {
        setOpen(event.currentTarget);

    };



    const handleClose = () => {
        setOpen(null);
    };

    return (
        <>
            <Button
                color="inherit"
                disableRipple
                onClick={handleOpen}
                endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
            >
                Sort By:&nbsp;
                <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {selectedValue ? selectedValue : 'price_desc'}
                </Typography>
            </Button>
            <Menu
                keepMounted
                anchorEl={open}
                open={Boolean(open)}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            >
                {SORT_BY_OPTIONS.map((option) => (
                    <MenuItem
                        key={option.value}
                        selected={option.value === 'newest'}
                        onClick={(e) => { handleClose, sortData(option.value) }}
                        sx={{ typography: 'body2' }}
                    >
                        {option.label}
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
}
