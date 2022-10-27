import {
  Button,
  Divider,
  Grid,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
import { MenuItem } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Autocomplete from "@mui/material/Autocomplete";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Controller, useForm } from "react-hook-form";
import { TextField } from "@mui/material";
import Chip from "@mui/material/Chip";
import Image from "next/image";
import LockerDetails1 from "./Locker/LockerDetails1";
//import Divider from "@mui/material";
import styles from "../styles/shippingInfo.module.css";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import localStorage from "localStorage";
import Shipping1 from "../pages/shipping/index";
import Modal from "./Modal/Modal";
import { Link } from "@mui/material";
import { useTranslation } from "react-i18next";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import DeleteIcon from "@mui/icons-material/Delete";

function ShippingInformation({
  checkoutHandler,
  shippementAddress,
  setAddressShippingMethod,
  setLockerShippingMethod,
  setShowShippingMethod,
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
  show,
  setShow,
  userData,
  shipLocker,
  setButtonKey,
  buttonKey
}) {

  const [userInfo, setUserInfo] = useState();
  let router = useRouter();
  let buttonText;
  let { t, i18n } = useTranslation();
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

  console.log("shippementAddress", shippementAddress);

  const [isMapActive, setIsMapActive] = useState(false);
  const [isTableActive, setIsTableActive] = useState(false);
  const [radioCheckLocker, setRadioCheckLocker] = useState(true);
  const [radioCheck, setRadioCheck] = useState(false);
  const [radioCheck1, setRadioCheck1] = useState(false);
  const [showMapView, setShowMapView] = useState(false);
  const [showTableView, setShowTableView] = useState(false);
  const [key, setkey] = useState(1);
  console.log("keyI", key);
  // const handleChange = (event) => {
  //   setButtonKey(event.target.value);
  // };

  // React.useEffect(() => {
  //   // setButtonKey(buttonKey);
  // }, [buttonKey]);

  function mapView() {
    setIsMapActive(true);
    setShowMapView(true);
    setIsTableActive(false)
    setShowTableView(false);
  }

  function tableView() {
    setIsTableActive(true)
    setIsMapActive(false);
    setShowMapView(false);
    setShowTableView(true);
  }

  return (
    <>
      <Grid container>
        <Grid md={12} sm={12} className={styles.shipTo} item>
          <FormLabel style={{ fontWeight: "bold", color: "black" }}>
            {t("shippingInfo.labels.purchaseFor")} :{" "}
          </FormLabel>

          <FormControl sx={{ m: 1, minWidth: 80 }}>
            <TextField
              select
              // value={age}
              // onChange={handleChange}
              defaultValue={10}
              variant="standard"
              InputProps={{
                // startAdornment: (
                //   <InputAdornment position="start">
                //     <WidgetsIcon />
                //   </InputAdornment>
                // ),
                disableUnderline: true,
                "aria-label": "Without label",
              }}
            >
              <MenuItem
                value={10}
              // onClick={() => handleChangeCategoryAndCampaigns(1)}
              >
                Self
              </MenuItem>
              <Divider />
              <MenuItem
                value={20}
              // onClick={() => handleChangeCategoryAndCampaigns(2)}
              >
                Student 2
              </MenuItem>
              {/* <Divider /> */}
            </TextField>
          </FormControl>
        </Grid>
        <Grid md={12} sm={12} item className={styles.shipTo}>
          <FormLabel style={{ fontWeight: "bold", color: "black" }}>
            {t("shippingInfo.labels.ship.shipTo")} :
          </FormLabel>
          <Box flexGrow={0.01}></Box>
          <FormControl>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue="address"
            >
              <FormControlLabel
                onClick={() => {
                  setButtonKey(1);
                  setRadioCheckLocker(true);
                  setAddressShippingMethod(true);
                  setLockerShippingMethod(false);
                  setShowShippingMethod(true);
                }}
                value="address"
                control={<Radio />}
                label={t("shippingInfo.labels.ship.address")}
              />
              <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
              <FormControlLabel
                onClick={() => {
                  setButtonKey(2);
                  setRadioCheckLocker(true);
                  setLockerShippingMethod(true);
                  setAddressShippingMethod(false);
                  setShowShippingMethod(false);
                }}
                value="lockers"
                control={<Radio />}
                label={t("shippingInfo.labels.ship.locker")}
              />
              {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />

              <FormControlLabel
                onClick={() => {
                  // setButtonKey(3);
                  setRadioCheckLocker(true);
                }}
                value="school"
                control={<Radio />}
                label={t("shippingInfo.labels.ship.school")}
              /> */}
            </RadioGroup>
          </FormControl>
        </Grid>

        {buttonKey === 1 ? (
          <Grid className={styles.shipAddress}>
            <Box className={styles.addressBox}>
              <Box className={styles.addressHeading}>
                <LocationOnIcon className={styles.LocationOnIcon} />
                <Typography
                  style={{
                    fontWeight: "bold",
                  }}
                >
                  {t("shippingInfo.ShippingAdress.label.shippingAddress")}
                </Typography>
              </Box>
              {/* <Shipping /> */}
              <Modal
                variant="contained"
                startIcon={<AddIcon />}
                buttonTitle={t("shippingInfo.ShippingAdress.button.addAddress")}
                heading=" Add Shipping Address"
                dialogContentText={<Shipping1 />}
              />
              {/* <Button
                onClick={() => {
                  buttonKey === 1 ? checkoutHandler1() : null;
                }}
                variant="contained"
                color="primary"
                disabled={radioCheckLocker ? "" : "disabled"}
                startIcon={<AddIcon />}
                // label=" Add Addresss"
              >
                {buttonKey === 1
                  ? "Add Address"
                  : buttonKey === 2
                  ? "Add Locker"
                  : "Add School Address"}
              </Button> */}
            </Box>

            {/* <TableContainer className={styles.table}>
                <Table
                  // m="auto"
                  // sx={{ maxWidth: 1150 }}
                  size="small"
                  aria-label="a dense table"
                > */}
            {/* {console.log(shippementAddress[0])} */}
            <RadioGroup
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
              defaultValue={shippementAddress[0]?.address_id}
              onChange={handleChange}
            >
              <Box className={styles.addressBoxDivMain}>
                {/*   <TableHead className={styles.thead}>
                      <TableRow className={styles.tableRow}>
                        <TableCell className={styles.select}>
                          {t("shippingInfo.ShippingAdress.table.select")}
                        </TableCell>
                        <TableCell className={styles.name}>
                          {t("shippingInfo.ShippingAdress.table.fullName")}
                        </TableCell>
                        <TableCell className={styles.addLabel}>
                          {t("shippingInfo.ShippingAdress.table.addressLabel")}
                        </TableCell>
                        <TableCell className={styles.fullAdd}>
                          {t("shippingInfo.ShippingAdress.table.fullAdress")}
                        </TableCell>
                        <TableCell className={styles.phone}>
                          {" "}
                          {t("shippingInfo.ShippingAdress.table.phone")}
                        </TableCell>
                        <TableCell className={styles.email}>
                          {" "}
                          {t("shippingInfo.ShippingAdress.table.email")}
                        </TableCell>
                        <TableCell className={styles.edit}>
                          {t("shippingInfo.ShippingAdress.table.edit")}
                        </TableCell>
                      </TableRow>
                    </TableHead> */}

                {shippementAddress &&
                  shippementAddress.map((result, index) =>
                    result.address_default_billing === false ? (
                      <>
                        {/* <Box className={styles.addressBoxDivMain}> */}
                        <Box className={styles.addressBoxDiv}>
                          <Box className={styles.addressLabelDiv}>
                            <Chip
                              className={styles.chip}
                              label={result.address_label_name}
                              color={
                                result.address_label_name === "Home"
                                  ? "primary"
                                  : "error"
                              }
                              size="small"
                            // sx={{ mx: 1 }}
                            />
                            <FormControlLabel
                              sx={{ mr: -0.9 }}
                              value={result.address_id}
                              control={<Radio />}
                              label={<></>}
                              onClick={() => {
                                setRadioCheck(true);
                              }}
                            />
                          </Box>
                          <Box className={styles.addressLabelDiv}>
                            <Typography className={styles.text}>
                              {userData.first_name} {userData.last_name}
                            </Typography>
                            <Box className={styles.editDel}>
                              <Modal
                                // variant=""
                                // startIcon={<AddIcon />}
                                buttonTitle={
                                  <ModeEditOutlineIcon
                                    className={styles.editIcon}
                                  />
                                }
                                heading=" Edit Shipping Address"
                                dialogContentText={<Shipping1 data={result} />}
                              />
                              <DeleteIcon color="error" />
                            </Box>
                          </Box>
                          <Typography className={styles.text}>
                            {result.address} {result.city} {result.state}{" "}
                            {result.country}
                          </Typography>
                          <Typography className={styles.text}>
                            {" "}
                            {userData.email}
                          </Typography>
                          <Typography className={styles.text}>
                            {"3215890184"}
                          </Typography>
                        </Box>

                        {/* <TableBody>
                              <TableRow
                                className={styles.tableRow}
                                ind
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell
                                  component="th"
                                  scope="row"
                                  className={styles.select}
                                >
                                  <FormControlLabel
                                    value={result.address_id}
                                    control={<Radio />}
                                    label={<></>}
                                    onClick={() => {
                                      setRadioCheck(true);
                                    }}
                                  />
                                </TableCell>
                                <TableCell className={styles.name}>
                                  {userData.first_name} {userData.last_name}
                                </TableCell>
                                <TableCell className={styles.addLabel}>
                                  <Chip
                                    className={styles.chip}
                                    label={result.address_label_name}
                                    color={
                                      result.address_label_name === "Home"
                                        ? "primary"
                                        : "error"
                                    }
                                    size="small"
                                    sx={{ mx: 1 }}
                                  />
                                </TableCell>
                                <TableCell className={styles.fullAdd}>
                                  <Typography>
                                    {result.address} {result.city}{" "}
                                    {result.state} {result.country}
                                  </Typography>
                                </TableCell>
                                <TableCell className={styles.phone}>
                                  {"3215890184"}
                                </TableCell>
                                <TableCell className={styles.email}>
                                  {userData.email}
                                </TableCell>
                                <TableCell className={styles.edit}>
                                  <Modal
                                    // variant=""
                                    // startIcon={<AddIcon />}
                                    buttonTitle={
                                      <ModeEditOutlineIcon
                                        className={styles.editIcon}
                                      />
                                    }
                                    heading=" Edit Shipping Address"
                                    dialogContentText={
                                      <Shipping1 data={result} />
                                    }
                                  />
                                  <DeleteIcon color="error" />
                                </TableCell>
                              </TableRow>
                              <Divider />
                            </TableBody> */}
                      </>
                    ) : (
                      ""
                    )
                  )}
              </Box>
            </RadioGroup>
            {/* </Table> */}
            {/*  </TableContainer> */}

            {/* <FormControl>
                <List sx={{ display: "flex" }}>
                  <ListItem>
                    <RadioGroup
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
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
                                  <Typography>
                                    {result.address} {result.city}{" "}
                                    {result.state} {result.country}
                                  </Typography>
                                </Box>
                              }
                              onClick={() => {
                                setRadioCheck(true);
                                setShow(true);
                              }}
                            />
                          ) : (
                            ""
                          )
                        )}
                    </RadioGroup>
                  </ListItem>
                </List>
              </FormControl> */}
          </Grid>
        ) : buttonKey === 2 ? (
          <Grid
            container
            // spacing={0}
            direction="row"
          // alignItems="center"
          // className={styles.findLocker}

          // maxWidth="xl"
          >
            <Grid item md={12} sm={12} className={styles.findLocker}>
              <form
                onSubmit={handleSubmit(submitHandler)}
              // className={classes.form}
              >
                <List>
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
                      className={styles.findLockerButton}
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
              </form>
            </Grid>
            <Grid container className={styles.mapTableView}>
              <RadioGroup
                // row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                // value={labelValue}
                onChange={handleChangeLocker}
              >
                {lockersAddressData.length > 0 && (
                  <>
                    <Grid sx={{ display: "flex" }}>
                      <Typography
                        onClick={() => mapView()}
                        className={styles.mapTableViewText}
                        sx={{ color: isMapActive ? '#3d7cff' : '' }}
                      >
                        MapView
                      </Typography>
                      <Divider
                        sx={{ height: 28, mx: 1 }}
                        orientation="vertical"
                      />
                      <Typography
                        onClick={() => tableView()}
                        className={styles.mapTableViewText}
                        sx={{ color: isTableActive ? '#3d7cff' : '' }}
                      >
                        TableView
                      </Typography>
                    </Grid>

                    {showTableView
                      ? lockersAddressData?.map((result) => (
                        <Box className={styles.addressBoxDiv1}>

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
                                  objectFit="contain"
                                  height={45}
                                ></Image>
                                <Typography
                                  sx={{
                                    p: 1,
                                  }}
                                >
                                  {result.locker_name}
                                </Typography>


                              </Box>
                            }
                            onClick={() => setRadioCheck1(true)}
                          />
                          <Box sx={{ display: "flex", marginLeft: "12%" }}> <Typography>Address:</Typography><Typography sx={{ marginLeft: "2%" }}>{result.locker_address}</Typography></Box>
                        </Box>

                      ))
                      : ""}
                  </>
                )}
              </RadioGroup>
            </Grid>
            {showMapView ? (
              <LockerDetails1 setRadioCheck1={setRadioCheck1} handleChangeLocker={handleChangeLocker} data={lockersAddressData}></LockerDetails1>
            ) : (
              ""
            )}
          </Grid>
        ) : buttonKey === 3 ? (
          <Box>School</Box>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}

export default ShippingInformation;
