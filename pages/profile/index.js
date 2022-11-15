import React, { useState, useEffect } from "react";
import Profile from "../../container/ProfilePage/Profile";
import { useSelector, useDispatch } from "react-redux";
import { getProfileData, getNationalityData } from '../../slice/profileSlice'


const Index = () => {
  let [profile, setProfile] = useState();
  let dispatch = useDispatch();

  useEffect(async () => {
    let profileInfo = await dispatch(getProfileData())
    let nationalityData = await dispatch(getNationalityData())
    let result = nationalityData.payload.map(result => { let results = result.nationality_id == profileInfo.payload.nationality_id ? result.nationality : ''; return results })
    console.log(result[0])
    let obj = { ...profileInfo.payload };
    obj.nationality = result[0]
    console.log(obj)
    setProfile(obj)
  }, [])

  return (
    <div>
      <Profile profileData={profile} />
    </div>
  );
};

export default Index;
