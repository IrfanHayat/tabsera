import React, { useState, useEffect } from "react";
import Profile from "../../container/ProfilePage/Profile";
import { useSelector, useDispatch } from "react-redux";
import { getProfileData, getNationalityData } from '../../slice/profileSlice'
import { getShipmentAddress } from '../../slice/shipmentSlice'

const Index = () => {
  let [profile, setProfile] = useState();
  let [address, setAddress] = useState();
  let dispatch = useDispatch();

  useEffect(async () => {
    let profileInfo = await dispatch(getProfileData())
    let nationalityData = await dispatch(getNationalityData())
    let addressData = await dispatch(getShipmentAddress())
    let result = nationalityData.payload.map(result => { let results = result.nationality_id == profileInfo.payload.nationality_id ? result.nationality : ''; return results })
    console.log(result[0])
    let addressResult = addressData.payload.filter(result => result.address_default_billing == true)
    setAddress(addressResult)
    let obj = { ...profileInfo.payload };
    obj.nationality = result[0]
    console.log(obj)
    setProfile(obj)
  }, [])

  return (
    <div>
      <Profile addressData={address} profileData={profile} />
    </div>
  );
};

export default Index;
