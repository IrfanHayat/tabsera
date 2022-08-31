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
  const handleOnSubmit = (evt) => {};

  const addNewMemeber = () => appendMemberRow({ email: "", role: "user" });

  return (
    <Grid container sx={{ p: 1, bgcolor: "white" }}>
      {/* <Box component="form" onSubmit={handleSubmit(handleOnSubmit)}> */}
      <Grid item xs={3} sx={{ p: 1 }}>
        <List>
          <Typography sx={{ fontWeight: "bold", mb: 1 }}>
            {" "}
            Manage My Account
          </Typography>
          <ListItem onClick={() => setKey(1)}>
            <ListItemIcon>
              <AccountBoxIcon color={key == 1 ? "primary" : ""} />
            </ListItemIcon>
            <ListItemText>
              <Typography color={key == 1 ? "primary" : ""}>
                {" "}
                Personal Information
              </Typography>
            </ListItemText>
          </ListItem>
          <ListItem onClick={() => setKey(2)}>
            <ListItemIcon>
              <LocationOnIcon color={key == 1 ? "" : "primary"} />
            </ListItemIcon>
            <ListItemText>
              <Typography color={key == 1 ? "" : "primary"}>
                {" "}
                Address Information
              </Typography>
            </ListItemText>
          </ListItem>
          {/* <ListItem>
                <ListItemIcon>BA</ListItemIcon>
                <ListItemText>
                  <Typography onClick={() => setKey(3)}>
                    {" "}
                    Billing Address
                  </Typography>
                </ListItemText>
              </ListItem> */}
        </List>
      </Grid>

      <Grid item xs={9} sx={{ p: 1 }}>
        {key == 1 ? (
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid xs={12} sx={{ p: 1 }}>
              <Typography sx={{ fontWeight: "bold" }}> My Profile</Typography>
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="First Name"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    // variant="filled"
                    label="First Name"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="Last Name"
                defaultValue=""
                render={({ field }) => (
                  <TextField
                    {...field}
                    fullWidth
                    // variant="filled"
                    label="Last Name"
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
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
                    {...field}
                    type="email"
                    fullWidth
                    label="Email With Validation"
                    error={error !== undefined}
                    helperText={error ? myHelper.email[error.type] : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
              <Controller
                control={control}
                name="DOB"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="date"
                    fullWidth
                    label="DOB"
                    error={error !== undefined}
                    helperText={error ? myHelper.email[error.type] : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
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
            </Grid>

            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
          </Grid>
        ) : (
          <Grid container spacing={2} sx={{ p: 1 }}>
            <Grid item xs={12}>
              <Typography sx={{ fontWeight: "bold" }}>
                Shipping Address
              </Typography>
            </Grid>

            <Grid item xs={6}>
              <Controller
                control={control}
                name="address"
                defaultValue=""
                render={({ field, fieldState: { error } }) => (
                  <TextField
                    {...field}
                    type="text"
                    fullWidth
                    label="Address"
                    error={error !== undefined}
                    helperText={error ? myHelper.email[error.type] : ""}
                  />
                )}
              />
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={6}>
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
            </Grid>
            <Grid item xs={12}>
              <Button type="submit" variant="contained">
                Submit
              </Button>
            </Grid>
            <Grid xs={12} sx={{ pt: 1, pl: 1, ml: 1, mt: 1 }}>
              <Typography sx={{ fontWeight: "bold" }}>
                Billing Address
              </Typography>
            </Grid>
            <Grid item xs={12} sx={{ p: 1 }}>
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
                <Grid container spacing={2} sx={{ p: 1 }}>
                  <Grid item xs={6}>
                    <Controller
                      control={control}
                      name="address"
                      defaultValue=""
                      render={({ field, fieldState: { error } }) => (
                        <TextField
                          {...field}
                          type="text"
                          fullWidth
                          label="Address"
                          error={error !== undefined}
                          helperText={error ? myHelper.email[error.type] : ""}
                        />
                      )}
                    />
                  </Grid>
                  <Grid item xs={6}>
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
                  </Grid>
                  <Grid item xs={6}>
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
                  </Grid>
                  <Grid item xs={6}>
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
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained">
                      Submit
                    </Button>
                  </Grid>
                </Grid>
              </>
            )}
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}
