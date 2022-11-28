import React, { useState, useEffect } from 'react'
import LockerDetails from '../../container/Locker/LockeDetails'
import { useSelector, useDispatch } from "react-redux";
import { addShipmentLockers } from '../../slice/lockerSlice'


function Index() {
    let [shipLocker, setShipLocker] = useState()
    let dispatch = useDispatch();
    useEffect(async () => {
        let obj = { cityId: 48357, countryId: 166, stateId: 2724 }
        let shippementLocker = await dispatch(addShipmentLockers(obj))

        setShipLocker(shippementLocker.payload)
    }, [])

    return (

        <LockerDetails lockerData={shipLocker}></LockerDetails>
    )
}

export default Index