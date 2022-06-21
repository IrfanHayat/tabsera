import {
  List,
  ListItem,
  Typography,
  TextField,
  Button,
  Grid,
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

export default function Shipping({
  submitHandler,
  handleSubmit,
  chooseLocationHandler,
  classes,
  control,
  Controller,
  errors,
  labels,
  countryData,
  getStates,
  states,
  getCities,
  cityData,
}) {
  let [labelValue, setLabelValue] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [stateList, setStateList] = useState([]);
  const [cityList, setCityList] = useState([]);

  useEffect(() => {
    console.log(countryData);
    console.log("--------------");
    console.log(cityData);
    console.log("-0----------------");

    setCountryList(countryData);

    //setValue("item", { id: 3, name: "item3" });
  }, []);

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

  const handleChange = (event, value) => {
    console.log(value);
    setLabelValue({ value });
  };

  return (
    <Grid container sx={{ justifyContent: "center" }}>
      <CheckoutWizard activeStep={2} />
      <Grid item md={2}></Grid>
      <Grid item md={8}>
        <form onSubmit={handleSubmit(submitHandler)} className={classes.form}>
          <Typography component="h4" variant="h4">
            Add Shipping Address
          </Typography>

          <List>
            <ListItem>
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
            </ListItem>
            <ListItem>
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
            </ListItem>
            <ListItem>
              <Controller
                control={control}
                name="country"
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    onChange={getStates}
                    value={value}
                    options={countryList}
                    getOptionLabel={(item) =>
                      item.country_name ? item.country_name : ""
                    }
                    getOptionSelected={(option, value) =>
                      value === undefined ||
                      value === "" ||
                      option.country_id === value.country_id
                    }
                    // sx={{ width: 800 }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="country"
                        margin="normal"
                        variant="outlined"
                        error={!!errors.item}
                        helperText={errors.item && "country required"}
                        required
                      />
                    )}
                  />
                )}
              />
            </ListItem>

            <ListItem>
              <Controller
                control={control}
                name="state"
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    onChange={getCities}
                    value={value}
                    options={states}
                    getOptionLabel={(item) => (item.state ? item.state : "")}
                    getOptionSelected={(option, value) =>
                      value === undefined ||
                      value === "" ||
                      option.state_id === value.state_id
                    }
                    // sx={{ width: 800 }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="state"
                        margin="normal"
                        variant="outlined"
                        error={!!errors.item}
                        helperText={errors.item && "state required"}
                        required
                      />
                    )}
                  />
                )}
              />
            </ListItem>

            <ListItem>
              <Controller
                control={control}
                name="city"
                rules={{
                  required: true,
                  minLength: 2,
                }}
                render={({ field: { onChange, value } }) => (
                  <Autocomplete
                    onChange={(event, item) => {
                      console.log(item);
                    }}
                    value={value}
                    options={cityData}
                    getOptionLabel={(item) => (item.city ? item.city : "")}
                    getOptionSelected={(option, value) =>
                      value === undefined ||
                      value === "" ||
                      option.city_id === value.city_id
                    }
                    // sx={{ width: 800 }}
                    fullWidth
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="city"
                        margin="normal"
                        variant="outlined"
                        error={!!errors.item}
                        helperText={errors.item && "city required"}
                        required
                      />
                    )}
                  />
                )}
              />
            </ListItem>

            {/* <ListItem>
            <Controller
              name="fullName"
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
                  id="fullName"
                  label="Full Name"
                  error={Boolean(errors.fullName)}
                  helperText={
                    errors.fullName
                      ? errors.fullName.type === "minLength"
                        ? "Full Name length is more than 1"
                        : "Full Name is required"
                      : ""
                  }
                  {...field}
                ></TextField>
              )}
            ></Controller>
          </ListItem> */}
            <ListItem>
              <Controller
                name="address"
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
            </ListItem>
            <ListItem>
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
            </ListItem>
            <ListItem>
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
            </ListItem>

            <ListItem>
              <FormControl>
                <FormLabel id="demo-row-radio-buttons-group-label">
                  Address Label :
                </FormLabel>

                <RadioGroup
                  row
                  aria-labelledby="demo-row-radio-buttons-group-label"
                  name="row-radio-buttons-group"
                  value={labelValue}
                  onChange={handleChange}
                >
                  {/* <FormControlLabel
                  value="female"
                  control={<Radio />}
                  label="Female"
                >
                  <BusinessIcon/>
                  <FormControlLabel/> */}
                  {/* <BusinessIcon /> */}
                  {labels.map((result) => (
                    <FormControlLabel
                      value={result.address_label_id}
                      control={<Radio />}
                      label={result.address_label_name}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
            </ListItem>
          </List>
          <List>
            <ListItem>
              <Button
                variant="contained"
                href="/shipping_methods"
                type="submit"
                fullWidth
                color="primary"
              >
                Continue
              </Button>
            </ListItem>
          </List>
        </form>
      </Grid>
      <Grid item md={2}></Grid>
    </Grid>
  );
}
