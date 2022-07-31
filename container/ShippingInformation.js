import {
  Button,
  Divider,
  Grid,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import CheckoutWizard from "../container/CheckoutWizard";
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
      <CheckoutWizard activeStep={1} />
      <Grid container mt={5}>
        {/* <Grid item md={2}></Grid> */}
        <Grid
          md={12}
          sm={12}
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          // style={{ minHeight: "100vh" }}
          // ml={10}
          item
        // justifyContent="center"
        // sx={{ display: "flex" }}
        >
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
                // onClick={() => setRadioCheck(true)}
                // onClick={setButtonKey(2)}
                value="lockers"
                // onChange={handleChange}
                control={<Radio />}
                label="Locker"
              />
            </RadioGroup>
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
          </FormControl>
        </Grid>
        {/* <Box>Locker Info here</Box> */}

        {buttonKey === 1 ? (
          <Grid container>
            <Grid item md={1}></Grid>

            <Grid item md={12} mt={4} justifyContent="center">
              <FormControl>
                <FormLabel style={{ fontWeight: "bold" }}>
                  Shipping Addresses
                </FormLabel>

                <List sx={{ display: "flex", p: 1, m: 1 }}>
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
                              label={`${result.address_label_name},${result.address},"",${result.city},${result.state},${result.country}`}
                              onClick={() => setRadioCheck(true)}
                            />
                          ) : (
                            ""
                          )
                        )}
                    </RadioGroup>
                  </ListItem>
                </List>
                <Stack direction="row" spacing={2}>
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
                    onClick={() =>
                      router.push(
                        `/product_detail?productId=${localStorage.getItem(
                          "productId"
                        )}`
                      )
                    }
                  >
                    Back
                  </Button>
                </Stack>
              </FormControl>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2}>
            <Grid item md={1}></Grid>

            <Grid item md={10} mt={4} justifyContent="center">
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <Typography>Hide Detail</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                              sx={{ mx: 1 }}
                              fullWidth
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
                      </ListItem>

                      <ListItem>
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
                              sx={{ width: "50%", mx: 1 }}
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
                              sx={{ width: "50%", mx: 1 }}
                              value={value || null}
                              options={lockerCityData}
                              key={(item) =>
                                item.city_name ? item.city_name : ""
                              }
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
                      </ListItem>
                    </List>

                    <List>
                      <ListItem>
                        <Stack direction="row" spacing={2}>
                          {/* <List>
            <ListItem> */}
                          <Button
                            variant="contained"
                            //href="/shipping_methods"
                            type="submit"
                            // fullWidth
                            // disabled={radioCheck ? "" : "disabled"}
                            color="primary"
                          >
                            Find Locker
                          </Button>
                        </Stack>
                      </ListItem>
                    </List>
                  </form>
                  <List>
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
                              label={`${result.locker_name},${result.locker_address}`}
                              onClick={() => setRadioCheck1(true)}
                            />
                          ))}
                      </RadioGroup>
                    </ListItem>

                    {lockersAddressData.length > 0 ? (
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
                    )}
                  </List>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid item md={2}></Grid>
          </Grid>
        )}
      </Grid>
    </>
  );
}

export default ShippingInformation;
