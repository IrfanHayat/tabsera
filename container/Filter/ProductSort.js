import { useState } from 'react';
// material
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import Iconify from '../../components/Iconify';
import { useTranslation } from "react-i18next";
// ----------------------------------------------------------------------



export default function ShopProductSort({ data, setFilterData, setShowFilterData }) {
    const [open, setOpen] = useState(null);
    const [selectedValue, setSelectedValue] = useState();
    let { t, i18n } = useTranslation();

    const SORT_BY_OPTIONS = [
        { value: 'price_desc', label: t('Filter.SortFilter.price_desc') },
        { value: 'price_asc', label: t('Filter.SortFilter.price_asc') },
        { value: 'rating_asc', label: t('Filter.SortFilter.rating_asc') },
        { value: 'rating_desc', label: t('Filter.SortFilter.rating_desc') },
        { value: 'order_desc', label: t('Filter.SortFilter.order_desc') },
        { value: 'order_asc', label: t('Filter.SortFilter.order_asc') }

    ];


    const sortData = (type) => {
        setSelectedValue(type)
        setShowFilterData(true)
        var f_data;
        switch (type) {
            case "price_desc":
                {
                    f_data = data?.slice().sort(function (a, b) {
                        if (a.productCost && b.productCost) {
                            return parseFloat(b.productCost) - parseFloat(a.productCost);
                        } else {
                            return parseFloat(b.bundleCost) - parseFloat(a.bundleCost);
                        }
                    });

                    setFilterData(f_data);
                }

                break;
            case "price_asc":
                f_data = data?.slice().sort(function (a, b) {
                    if (a.productCost && b.productCost) {
                        return parseFloat(a.productCost) - parseFloat(b.productCost);
                    } else {
                        return parseFloat(a.bundleCost) - parseFloat(b.bundleCost);
                    }
                });

                setFilterData(f_data);
            case "rating_asc":
                f_data = data?.slice().sort(function (a, b) {
                    return parseFloat(b.averageRating) - parseFloat(a.averageRating);
                });

                setFilterData(f_data);
                break;
            case "rating_desc":
                f_data = data?.slice().sort(function (a, b) {
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
                {t('Filter.SortFilter.title')}:&nbsp;
                <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
                    {selectedValue ? selectedValue : t('Filter.SortFilter.price_desc')}
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
