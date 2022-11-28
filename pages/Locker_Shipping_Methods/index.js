import ShippingLockerMethods from "../../container/ShippingLockerMethod";

import React, { useEffect, useState } from "react";
import { useRouter, withRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import {
    getShipmentsCharges,
    getShipmentsMethods,
    getCustomer,
    getShipmentAddress,
} from "../../slice/shipmentSlice";
import { getCartItems } from "../../slice/basketSlice";
import useStyles from "../../utils/styles";
const Index = () => {
    const { shipmentMethodData, shippingAddressData, shippingCharges, userData } = useSelector(
        state => state.shipments
    );
    const [shippementData, setShippementData] = useState();
    const [shippementLockerData, setShippementLockerData] = useState();
    const classes = useStyles();
    const { cartItems, cartId, buyCartItems } = useSelector(state => state.basket.cart);
    const [shippementCharges, setShippementCharges] = useState()
    const [shippingMethodId, setShippingMethodId] = useState()
    const {
        lockersAddressData,
        lockerLabels,
        lockerCountryData,
        lockerStatesData,
        lockerCityData,
    } = useSelector((state) => state.lockers);
    let router = useRouter();
    let dispatch = useDispatch();

    const checkoutHandler = () => {

        router.push({ pathname: "/placeorder", query: { lockerId: router.query.lockerId, shipId: shippingMethodId.shipping_method_id, shipName: shippingMethodId.shipping_method_name } });


    };




    useEffect(() => {

    }, [cartId])

    useEffect(() => {

    }, [buyCartItems])
    const handleChange = async (value) => {

        setShippingMethodId(value)
        let result = lockersAddressData.filter(result => {
            if (result.locker_id == router.query.lockerId) return result;
        })[0];



        let obj
        if (buyCartItems && localStorage.getItem("buyCartItems")) {
            obj = {
                cartId: cartId,
                shipmentMethodId: value.shipping_method_id,
                shipmentMethodType: "locker",
                shippingAddress: {
                    address: result.address,
                    addressId: result.locker_id,
                    cityId: result.city_id,
                    countryId: result.country_id,
                    stateId: result.state_id,
                },
            };
        } else {
            obj = {
                cartId: cartId,
                shipmentMethodId: value.shipping_method_id,
                shipmentMethodType: "locker",
                shippingAddress: {
                    address: result.address,
                    addressId: result.locker_id,
                    cityId: result.city_id,
                    countryId: result.country_id,
                    stateId: result.state_id,
                },
            };
        }



        let result2 = await dispatch(getShipmentsCharges(obj));

        setShippementCharges(result2.payload.charges)


    };



    useEffect(() => {
        dispatch(getShipmentAddress());
    }, []);

    useEffect(() => {
        localStorage.setItem("addressId", JSON.stringify(router.query.addressId))


        let result1 = lockersAddressData.filter(result =>
            result.locker_id == router.query.lockerId ? result : ""
        );


        setShippementLockerData(result1[0]);

        let obj = {
            address: result1[0]?.address,
            bundle_id: null,
            cart_id: cartId ? cartId : '',
            city_id: result1[0]?.city_id,
            country_id: result1[0]?.country_id,
            shipment_method_type: "locker",
            sku_id: null,
            state_id: result1[0]?.state_id,
        };

        dispatch(getShipmentsMethods(obj));
        dispatch(getCustomer());
        dispatch(getCartItems());
    }
        , [router, shippementLockerData]);

    return (
        <div>
            <ShippingLockerMethods
                productPrice={cartItems}
                userData={userData}

                handleChange={handleChange}
                shipmentMethodData={shipmentMethodData}
                checkoutHandler={checkoutHandler}
                classes={classes}
                shippingCharges={shippementCharges}
                shippementLockerData={shippementLockerData}
            />
        </div>
    );
};

export default Index;
