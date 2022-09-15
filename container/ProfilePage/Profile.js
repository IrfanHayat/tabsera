import React, { useState, useEffect } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import {
  Autocomplete,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Slider,
  Select,
  MenuItem,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styles from "../../styles/profile.module.css";
import PersonIcon from "@mui/icons-material/Person";
const options = ["A", "B", "C", "D"];
const objOptions = [
  { value: 65, label: "A" },
  { value: 66, label: "B" },
  { value: 67, label: "C" },
];
const myHelper = {
  email: {
    required: "Email is Required",
    pattern: "Invalid Email Address",
  },
};

export default function Profile() {
  const { control, handleSubmit } = useForm({
    reValidateMode: "onBlur",
  });
  const {
    fields: members,
    append: appendMemberRow,
    remove: removeMemberRow,
  } = useFieldArray({
    control,
    name: "members",
  });

  console.count("app rerender");
  const [sameBilling, setsameBilling] = useState(false);
  const [key, setKey] = useState(1);
  useEffect(() => {}, [sameBilling, key]);
  const handleOnSubmit = (evt) => {
    console.log(evt);
  };

  const addNewMemeber = () => appendMemberRow({ email: "", role: "user" });

  return (
    <Box className={styles.profileMain}>
      {/* <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}> */}
      <Box className={styles.dashboardSidebar}>
        <List>
          <Typography className={styles.myAccount}>
            {" "}
            Manage My Account
          </Typography>
          <ListItem onClick={() => setKey(1)} className={styles.ListItem}>
            {/* <ListItemIcon> */}
            <AccountBoxIcon color={key == 1 ? "warning" : ""} />
            {/* </ListItemIcon> */}
            {/* <ListItemText> */}
            <Typography
              className={styles.ListItemLabel}
              color={key == 1 ? "#f34f2f" : ""}
            >
              {" "}
              Personal Information
            </Typography>
            {/* </ListItemText> */}
          </ListItem>
          <ListItem onClick={() => setKey(2)} className={styles.ListItem}>
            <LocationOnIcon color={key == 1 ? "" : "warning"} />
            <Typography
              className={styles.ListItemLabel}
              color={key == 1 ? "" : "#f34f2f"}
            >
              {" "}
              Address Information
            </Typography>
          </ListItem>
        </List>
      </Box>

      <Box>
        {key == 1 ? (
          <>
            <Box className={styles.editProfile}>
              <PersonIcon className={styles.editProfileIcon} />
              <Typography className={styles.editProfileHeading}>
                {" "}
                My Profile
              </Typography>
            </Box>
            <Grid className={styles.editProfileForm}>
              {/* <Grid item xs={5}> */}
              <Controller
                control={control}
                name="First Name"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    className={styles.editFormInput}
                    {...field}
                    // fullWidth
                    // size="small"
                    // variant="filled"
                    label="First Name"
                  />
                )}
              />
              {/* </Grid> */}

              <Controller
                control={control}
                name="Last Name"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    className={styles.editFormInput}
                    {...field}
                    fullWidth
                    // variant="filled"
                    label="Last Name"
                  />
                )}
              />

              <Controller
                control={control}
                name="email"
                defaultValue=""
                rules={{
                  required: true,
                  pattern: /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                }}
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    className={styles.editFormInput}
                    {...field}
                    type="email"
                    fullWidth
                    label="Email With Validation"
                    error={error !== undefined}
                    helperText={error ? myHelper.email[error.type] : ""}
                  />
                )}
              />

              <Controller
                control={control}
                name="DOB"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    className={styles.editFormInput}
                    {...field}
                    type="date"
                    fullWidth
                    label="DOB"
                    error={error !== undefined}
                    helperText={error ? myHelper.email[error.type] : ""}
                  />
                )}
              />

              <Controller
                name="level"
                id="level"
                //   defaultValue={0}
                control={control}
                render={({ field }) => (
                  <TextField
                    className={styles.editFormInput}
                    select
                    fullWidth
                    defaultValue=""
                    label="Nationality"
                    //   inputProps={register("currency", {
                    //     required: "Please enter currency",
                    //   })}
                    //   error={errors.currency}
                    //   helperText={errors.currency?.message}
                  >
                    <MenuItem>Pakistani</MenuItem>
                  </TextField>
                )}
              />

              <Button className={styles.btn} type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </>
        ) : (
          <>
            <Box className={styles.editProfile}>
              {/* <PersonIcon className={styles.editProfileIcon} /> */}
              <Typography className={styles.editProfileHeading}>
                {" "}
                Shipping Address
              </Typography>
            </Box>

            <Box className={styles.editProfileForm}>
              <Controller
                control={control}
                name="address"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    className={styles.editFormInput}
                    {...field}
                    type="text"
                    fullWidth
                    label="Address"
                    error={error !== undefined}
                    helperText={error ? myHelper.email[error.type] : ""}
                  />
                )}
              />
              <Controller
                name="level"
                id="level"
                //   defaultValue={0}
                control={control}
                render={({ field }) => (
                  <TextField
                    className={styles.editFormInput}
                    select
                    fullWidth
                    defaultValue=""
                    label="Country"
                    //   inputProps={register("currency", {
                    //     required: "Please enter currency",
                    //   })}
                    //   error={errors.currency}
                    //   helperText={errors.currency?.message}
                  >
                    <MenuItem>Pakistani</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="level"
                id="level"
                //   defaultValue={0}
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    fullWidth
                    defaultValue=""
                    label="State"
                    className={styles.editFormInput}
                    //   inputProps={register("currency", {
                    //     required: "Please enter currency",
                    //   })}
                    //   error={errors.currency}
                    //   helperText={errors.currency?.message}
                  >
                    <MenuItem>Pakistani</MenuItem>
                  </TextField>
                )}
              />

              <Controller
                name="level"
                id="level"
                //   defaultValue={0}
                control={control}
                render={({ field }) => (
                  <TextField
                    select
                    fullWidth
                    defaultValue=""
                    label="City"
                    className={styles.editFormInput}
                    //   inputProps={register("currency", {
                    //     required: "Please enter currency",
                    //   })}
                    //   error={errors.currency}
                    //   helperText={errors.currency?.message}
                  >
                    <MenuItem>Pakistani</MenuItem>
                  </TextField>
                )}
              />

              <Button className={styles.btn} type="submit" variant="contained">
                Submit
              </Button>
            </Box>

            <Grid xs={12} sx={{ mt: 3, ml: 5 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                Billing Address
              </Typography>
              {/* </Grid> */}
              {/* <Grid item xs={12} sx={{ p: 1 }}> */}
              <Controller
                control={control}
                name="check-box"
                defaultValue={false}
                render={({ field: { value, onChange, ...field } }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onChange}
                        onClick={() => setsameBilling(!sameBilling)}
                        checked={value}
                        {...field}
                      />
                    }
                    label="Same as  Shipping Address"
                  />
                )}
              />
            </Grid>
            {sameBilling ? (
              ""
            ) : (
              <>
                <Box className={styles.editProfileForm}>
                  <Controller
                    control={control}
                    name="address"
                    defaultValue=""
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        className={styles.editFormInput}
                        {...field}
                        type="text"
                        fullWidth
                        label="Address"
                        error={error !== undefined}
                        helperText={error ? myHelper.email[error.type] : ""}
                      />
                    )}
                  />
                  <Controller
                    name="level"
                    id="level"
                    //   defaultValue={0}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        className={styles.editFormInput}
                        select
                        fullWidth
                        defaultValue=""
                        label="Country"
                        //   inputProps={register("currency", {
                        //     required: "Please enter currency",
                        //   })}
                        //   error={errors.currency}
                        //   helperText={errors.currency?.message}
                      >
                        <MenuItem>Pakistani</MenuItem>
                      </TextField>
                    )}
                  />

                  <Controller
                    name="level"
                    id="level"
                    //   defaultValue={0}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        fullWidth
                        defaultValue=""
                        label="State"
                        className={styles.editFormInput}
                        //   inputProps={register("currency", {
                        //     required: "Please enter currency",
                        //   })}
                        //   error={errors.currency}
                        //   helperText={errors.currency?.message}
                      >
                        <MenuItem>Pakistani</MenuItem>
                      </TextField>
                    )}
                  />

                  <Controller
                    name="level"
                    id="level"
                    //   defaultValue={0}
                    control={control}
                    render={({ field }) => (
                      <TextField
                        select
                        fullWidth
                        defaultValue=""
                        label="City"
                        className={styles.editFormInput}
                        //   inputProps={register("currency", {
                        //     required: "Please enter currency",
                        //   })}
                        //   error={errors.currency}
                        //   helperText={errors.currency?.message}
                      >
                        <MenuItem>Pakistani</MenuItem>
                      </TextField>
                    )}
                  />
                  <Button
                    className={styles.btn}
                    type="submit"
                    variant="contained"
                  >
                    Submit
                  </Button>
                </Box>
              </>
            )}
          </>
        )}
      </Box>
    </Box>
  );
}
