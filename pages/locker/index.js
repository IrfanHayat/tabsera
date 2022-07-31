import React, { useState, useEffect } from "react";
import Locker from "../../container/Locker";
import { useSelector, useDispatch } from "react-redux";
import {
  addShipmentLockers,
  getLockers,
  getCountry,
  getCity,
  getState,
} from "../../slice/lockerSlice";
import localStorage from "localStorage";
import useStyles from "../../utils/styles";
import { useRouter, withRouter } from "next/router";

import { Controller, useForm } from "react-hook-form";

const Locker_Detail = () => {
  const { lockerLabels, countryData, states, cityData } = useSelector(
    (state) => state.lockers
  );
  useEffect(() => {
    dispatch(getLockers());
  }, []);

  console.log(lockerLabels);

  let [labelValue, setLabelValue] = useState("");

  let router = useRouter();

  let dispatch = useDispatch();
  const {
    handleSubmit,
    control,
    formState: { errors },
    setValue,
    getValues,
  } = useForm();

  return (
    <div>
      <Locker />
    </div>
  );
};

export default Locker_Detail;
