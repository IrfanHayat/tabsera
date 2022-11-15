import React, { useState, useEffect } from "react";
import Profile from "../../container/ProfilePage/Profile";
import { useSelector, useDispatch } from "react-redux";
import { getProfileData } from '../../slice/profileSlice'


const Index = () => {
  let [profile, setProfile] = useState();
  let dispatch = useDispatch();

  useEffect(async () => {
    let profileInfo = await dispatch(getProfileData())
    setProfile(profileInfo.payload)
  }, [])

  return (
    <div>
      <Profile profileData={profile} />
    </div>
  );
};

export default Index;
