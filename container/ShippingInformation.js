import {
  Button,
  Divider,
  Grid,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

import AddIcon from "@mui/icons-material/Add";
import { Box } from "@mui/system";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { useRouter } from "next/router";
import { useState } from "react";
import List from "@mui/material/List";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Autocomplete from "@mui/material/Autocomplete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Chip from "@mui/material/Chip";
import Image from "next/image";
//import Divider from "@mui/material";
function ShippingInformation({
  checkoutHandler,
  shippementAddress,
  handleChange,
  checkoutHandler1,
  lockerCountryData,
  lockerCityData,
  submitHandler,
  lockerStatesData,
  getStates,
  getCities,
  lockersAddressData,
  checkoutHandlerLocker,
  handleChangeLocker,
}) {
  const [buttonKey, setButtonKey] = React.useState(1);
  let router = useRouter();
  let buttonText;
  const {
    handleSubmit,
    control,
    register,
    setError,
    formState: { errors },
  } = useForm();
  // if (buttonKey === 1) {
  //   buttonText = "Add Address";
  // } else {
  //   buttonText = "Add Locker";
  //   buttonText = "Add Locker";
  // }

  const [radioCheckLocker, setRadioCheckLocker] = useState(false);
  const [radioCheck, setRadioCheck] = useState(false);
  const [radioCheck1, setRadioCheck1] = useState(false);
  // const handleChange = (event) => {
  //   setButtonKey(event.target.value);
  // };

  // React.useEffect(() => {
  //   // setButtonKey(buttonKey);
  // }, [buttonKey]);
  return (
    <>
      <Grid container mt={5} sx={{ bgcolor: "background.paper" }}>
        {/* <Grid item md={2}></Grid> */}
        <Grid
          md={12}
          sm={12}
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          style={{ minHeight: "10vh" }}
          // ml={10}
          // border={1}
          borderColor="primary.main"
          item
          // justifyContent="center"
          sx={{ p: 1 }}
        >
          <FormLabel style={{ fontWeight: "bold" }}>
            {buttonKey === 1 ? "Select Address" : "Select Lockers"}
          </FormLabel>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                onClick={() => {
                  setButtonKey(1);
                  setRadioCheckLocker(true);
                }}
                value="address"
                // buttonKey={1}
                // onChange={handleChange}
                control={<Radio />}
                label="Address"
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <FormControlLabel
                // buttonKey={2}
                onClick={() => {
                  setButtonKey(2);
                  setRadioCheckLocker(true);
                }}
                // onClick={setButtonKey(2)}
                value="lockers"
                // onChange={handleChange}
                control={<Radio />}
                label="Locker"
              />
            </RadioGroup>
          </FormControl>
          <Button
            onClick={() => {
              buttonKey === 1 ? checkoutHandler1() : null;
            }}
            variant="contained"
            color="primary"
            disabled={radioCheckLocker ? "" : "disabled"}
            // buttonKey={buttonKey}
            // href="/shipping"
            startIcon={<AddIcon />}
            // label=" Add Addresss"
          >
            {buttonKey === 1 ? "Add Address" : "Add Locker"}
          </Button>
        </Grid>
        {/* <Box>Locker Info here</Box> */}

        {/* <Grid container>

          <Grid item md={12} sm={12} xs={12} mt={4}>
            <List
              sx={{
                display: "flex",
                // p: 1,
                // m: 1,
                bgcolor: "background.paper",
                justifyContent: "space-around",
              }}
            >
              <ListItem>
                <FormLabel style={{ fontWeight: "bold" }}>
                  {buttonKey === 1 ? " Addresses" : "Lockers"}
                </FormLabel>
              </ListItem>
              <ListItem>
                <Button
                  onClick={() => {
                    buttonKey === 1 ? checkoutHandler1() : null;
                  }}
                  variant="contained"
                  color="primary"
                  disabled={radioCheckLocker ? "" : "disabled"}
                  startIcon={<AddIcon />}
                >
                  {buttonKey === 1 ? "Add Address" : "Add Locker"}
                </Button>
              </ListItem>
            </List>
          </Grid>
        </Grid> */}
        {buttonKey === 1 ? (
          <Grid container sx={{ bgcolor: "background.paper" }}>
            {/* <Grid item md={1}></Grid> */}
            <Grid item md={6} m={1} justifyContent="center">
              <FormControl>
                {/* <List sx={{ display: "flex", p: 1, m: 1 }}>
                  <ListItem>
                    <FormLabel style={{ fontWeight: "bold" }}>
                      {buttonKey === 1 ? " Addresses" : "Lockers"}
                    </FormLabel>
                  </ListItem>
                  <ListItem>
                    <Button
                      onClick={() => {
                        buttonKey === 1 ? checkoutHandler1() : null;
                      }}
                      variant="contained"
                      color="primary"
                      disabled={radioCheckLocker ? "" : "disabled"}
                      // buttonKey={buttonKey}
                      // href="/shipping"
                      startIcon={<AddIcon />}
                      // label=" Add Addresss"
                    >
                      {buttonKey === 1 ? "Add Address" : "Add Locker"}
                    </Button>
                  </ListItem>
                </List> */}
                <List sx={{ display: "flex" }}>
                  <ListItem>
                    <RadioGroup
                      // row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                      // value={labelValue}
                      onChange={handleChange}
                    >
                      {shippementAddress &&
                        shippementAddress.map((result) =>
                          result.address_default_billing === false ? (
                            <FormControlLabel
                              value={result.address_id}
                              control={<Radio />}
                              label={
                                <Box sx={{ display: "flex", p: 1 }}>
                                  <Chip
                                    label={result.address_label_name}
                                    color={
                                      result.address_label_name === "Home"
                                        ? "primary"
                                        : "error"
                                    }
                                    size="small"
                                    sx={{ mx: 1 }}
                                  />
                                  {/* {result.address_label_name} */}
                                  <Typography>
                                    {result.address} {result.city}{" "}
                                    {result.state} {result.country}
                                  </Typography>

                                  {/* </Typography> */}
                                </Box>
                              }
                              // label={`${result.address_label_name},${result.address},"",${result.city},${result.state},${result.country}`}
                              onClick={() => setRadioCheck(true)}
                            />
                          ) : (
                            ""
                          )
                        )}
                    </RadioGroup>
                  </ListItem>
                </List>
                {/* <Stack direction="row" spacing={2}>
                  <Button
                    onClick={checkoutHandler}
                    variant="contained"
                    color="primary"
                    disabled={radioCheck ? "" : "disabled"}
                  // href="/shipping_methods"
                  // startIcon={<AddIcon />}
                  >
                    Continue
                  </Button>

                  <Button
                    // fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => router.push(`/cart`)}
                  >
                    Back
                  </Button>
                </Stack> */}
              </FormControl>
            </Grid>
          </Grid>
        ) : (
          <Grid
            container
            // spacing={0}
            direction="row"
            // alignItems="center"
            justifyContent="center"

            // maxWidth="xl"
          >
            {/* <Grid item md={4}></Grid> */}
            {/* <Grid container> */}
            {/* <Grid item md={1}></Grid> */}

            {/* <Grid item md={6} mt={4} justifyContent="center"></Grid> */}
            <Grid item mt={4} md={12} sm={12}>
              {/* <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                > */}
              {/* <Typography>Hide Details</Typography> */}
              {/* </AccordionSummary> */}
              {/* <AccordionDetails> */}
              <form
                onSubmit={handleSubmit(submitHandler)}
                // className={classes.form}
              >
                <List>
                  {/* <Stack direction="row" spacing={2}></Stack> */}

                  <ListItem>
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
                          value={value || null}
                          sx={{ width: "25%", mx: 1 }}
                          // fullWidth
                          options={lockerCountryData}
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
                              // fullWidth
                              margin="normal"
                              variant="outlined"
                              // error={!!errors.item}
                              // helperText={errors.item && "item required"}
                              required
                            />
                          )}
                        />
                      )}
                    />
                    {/* </ListItem> */}

                    {/* <ListItem> */}
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
                          sx={{ width: "25%", mx: 1 }}
                          value={value || null}
                          options={lockerStatesData}
                          getOptionLabel={(item) =>
                            item.state_name ? item.state_name : ""
                          }
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
                              // error={!!errors.item}
                              // helperText={errors.item && "item required"}
                              required
                            />
                          )}
                        />
                      )}
                    />
                    {/* </ListItem> */}

                    {/* <ListItem> */}
                    <Controller
                      control={control}
                      name="city"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <Autocomplete
                          onChange={(event, item) => {
                            onChange(item);
                          }}
                          sx={{ width: "25%", mx: 1 }}
                          value={value || null}
                          options={lockerCityData}
                          key={(item) => (item.city_name ? item.city_name : "")}
                          getOptionLabel={(item) =>
                            item.city_name ? item.city_name : ""
                          }
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
                    <Button
                      variant="contained"
                      //href="/shipping_methods"
                      type="submit"
                      // fullWidth
                      size="large"
                      // disabled={radioCheck ? "" : "disabled"}
                      color="primary"
                    >
                      Find Locker
                    </Button>
                  </ListItem>
                </List>

                {/* <List>
                  <ListItem>
                    <Stack direction="row" spacing={2}>
                    
                      <Button
                        variant="contained"
                        type="submit"
                      
                        color="primary"
                      >
                        Find Locker
                      </Button>
                    </Stack>
                  </ListItem>
                </List> */}
              </form>
              <Grid container>
                <ListItem>
                  <RadioGroup
                    // row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                    // value={labelValue}
                    onChange={handleChangeLocker}
                  >
                    {lockersAddressData.length > 0 &&
                      lockersAddressData?.map((result) => (
                        <FormControlLabel
                          value={result.locker_id}
                          control={<Radio />}
                          label={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                              }}
                            >
                              <Image // className={cx(styles.media, mediaStyles.root)}
                                src={"/locker_pic.jpg"}
                                // onClick={(e) => viewCategory(product.category_id)}
                                alt={"locker"}
                                width={45}
                                height={45}
                              ></Image>
                              <Typography
                                sx={{
                                  p: 1,
                                }}
                              >
                                {result.locker_name}
                              </Typography>
                              <Typography>{result.locker_address}</Typography>
                            </Box>
                          }
                          onClick={() => setRadioCheck1(true)}
                        />
                      ))}
                  </RadioGroup>
                </ListItem>

                {/* {lockersAddressData.length > 0 ? (
                  <ListItem>
                    <Stack direction="row" spacing={2}>
                      <Button
                        onClick={(e) => checkoutHandlerLocker(e)}
                        variant="contained"
                        color="primary"
                        disabled={radioCheck1 ? "" : "disabled"}
                      // href="/shipping_methods"
                      // startIcon={<AddIcon />}
                      >
                        Continue
                      </Button>
                    </Stack>
                  </ListItem>
                ) : (
                  ""
                )} */}
              </Grid>
              {/* </AccordionDetails>
              </Accordion> */}
            </Grid>
            {/* <Grid item md={2}></Grid> */}
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default ShippingInformation;
