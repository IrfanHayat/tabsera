import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Stack,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import CheckoutWizard from "../container/CheckoutWizard";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import BusinessIcon from "@mui/icons-material/Business";
import Autocomplete, { createFilterOptions } from "@mui/material/Autocomplete";
import { Grid, Box, InputAdornment } from "@mui/material";
import { useRouter } from "next/router";
import styles from "../styles/shipping.module.css";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import { pink } from "@mui/material/colors";
// import BusinessIcon from "@mui/icons-material/Business";
export default function Shipping({
  submitHandler,
  handleSubmit,
  chooseLocationHandler,
  handleChange,
  classes,
  control,
  Controller,
  errors,
  labels,
  countryData,
  getStates,
  defaultValue,
  states,
  getCities,
  cityData,
  labelValue,
  data
}) {
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);
  const [radioCheck, setRadioCheck] = useState(false);

  let router = useRouter();

  // useEffect(() => {
  //   console.log(countryData)
  //   setCountryList(countryData);

  //   //setValue("item", { id: 3, name: "item3" });
  // }, []);

  // useEffect(() => {

  //   setStateList([
  //     { id: 1, name: "item1" },
  //     { id: 2, name: "item2" }
  //   ]);

  //   //setValue("item", { id: 3, name: "item3" });
  // }, []);

  // useEffect(() => {
  //   setCityList([
  //     { id: 1, name: "item1" },
  //     { id: 2, name: "item2" }
  //   ]);

  //   //setValue("item", { id: 3, name: "item3" });
  // }, []);

  return (
    <>
      <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Controller
              name="firstName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="firstName"
                  label="First Name"
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "minLength"
                        ? "First Name is more than 1"
                        : "First Name is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="lastName"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "minLength"
                        ? "Last Name is more than 1"
                        : "Last Name is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </Grid>
          {console.log(countryData)}

          <Grid item xs={12} md={4}>
            <Controller
              control={control}
              name="country"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  onChange={(event, item) => {
                    onChange(item);
                    getStates(item);
                  }}
                  defaultValue={data.country}
                  value={value || null}
                  sx={{ width: "100%" }}
                  options={countryData}
                  getOptionLabel={(item) =>
                    item.country_name ? item.country_name : ""
                  }
                  getOptionSelected={(option, value) =>
                    value === undefined ||
                    value === "" ||
                    option.country_id === value.country_id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="country"
                      margin="normal"
                      variant="outlined"
                      error={!!errors.item}
                      helperText={errors.item && "item required"}
                      required
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              control={control}
              name="states"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  onChange={(event, item) => {
                    onChange(item);
                    getCities(item);
                  }}
                  sx={{ width: "100%" }}
                  value={value || null}
                  options={states}
                  getOptionLabel={(item) => (item.state ? item.state : "")}
                  getOptionSelected={(option, value) =>
                    value === undefined ||
                    value === "" ||
                    option.state_id === value.state_id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="state"
                      margin="normal"
                      variant="outlined"
                      error={!!errors.item}
                      helperText={errors.item && "item required"}
                      required
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Controller
              control={control}
              name="city"
              rules={{ required: true }}
              render={({ field: { onChange, value } }) => (
                <Autocomplete
                  onChange={(event, item) => {
                    onChange(item);
                  }}
                  sx={{ width: "100%" }}
                  value={value || null}
                  options={cityData}
                  key={(item) => (item.city ? item.city : "")}
                  getOptionLabel={(item) => (item.city ? item.city : "")}
                  getOptionSelected={(option, value) =>
                    value === undefined ||
                    value === "" ||
                    option.city_id === value.city_id
                  }
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="city"
                      margin="normal"
                      variant="outlined"
                      error={!!errors.item}
                      helperText={errors.item && "item required"}
                      required
                    />
                  )}
                />
              )}
            />
          </Grid>

          <Grid item xs={12} md={12}>
            <Controller
              name="address"
              control={control}
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="address"
                  label="Address"
                  error={Boolean(errors.address)}
                  helperText={
                    errors.address
                      ? errors.address.type === "minLength"
                        ? "Address length is more than 1"
                        : "Address is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </Grid>

          <Grid item xs={12} md={6}>
            <Controller
              name="phone"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="phone"
                  label="Phone"
                  error={Boolean(errors.phone)}
                  helperText={
                    errors.phone
                      ? errors.phone.type === "minLength"
                        ? "Phone length is more than 1"
                        : "Phone is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </Grid>
          <Grid item xs={12} md={6}>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{
                required: true,
                minLength: 2,
              }}
              render={({ field }) => (
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  error={Boolean(errors.email)}
                  helperText={
                    errors.email
                      ? errors.email.type === "minLength"
                        ? "Email Code length is more than 1"
                        : "Email Code is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </Grid>

          <Grid item xs={12} md={12}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">
                Address Label :
              </FormLabel>
              {console.log(labels)}
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              // value={labelValue}
              // onChange={handleChange}
              >
                {labels.map((result) => (
                  <FormControlLabel
                    value={result.address_label_id}
                    control={
                      <Radio
                        className={styles.radio}
                        onChange={() => handleChange(result.address_label_id)}
                      />
                    }
                    label={
                      <Box className={styles.radiolabel}>
                        {result.address_label_name == "Home" ? (
                          <HomeWorkIcon
                            sx={{ color: pink[500], fontSize: 40, mr: 1 }}
                          />
                        ) : result.address_label_name == "Office" ? (
                          <BusinessIcon
                            color="primary"
                            sx={{ fontSize: 40, mr: 1 }}
                          />
                        ) : (
                          ""
                        )}
                        {result.address_label_name}
                      </Box>
                    }
                    onClick={() => setRadioCheck(true)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </Grid>

          <Grid item xs={12} md={12}>
            <Button
              variant="contained"
              //href="/shipping_methods"
              type="submit"
              // fullWidth
              disabled={radioCheck ? "" : "disabled"}
              color="primary"
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
    </>
  );
}
