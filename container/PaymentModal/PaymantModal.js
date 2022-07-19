import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Controller, useForm } from "react-hook-form";
import MuiPhoneNumber from "material-ui-phone-number";
import { List, ListItem, Typography, Link } from "@mui/material";

export default function FormDialog({
  handleClickOpen,
  handleClose,
  open,
  confirmPayment,
}) {
  const {
    handleSubmit,
    control,
    register,
    setError,
    formState: { errors },
  } = useForm();

  const allowOnlyNumber=(value)=>{
    console.log(value)
    return value.replace(/[^0-9]/g, '')
 }
 

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Payment Modal
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Payment Modal </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit(confirmPayment)}>
            <List>
              <ListItem>
                {/* <Controller
                  name="Account Number"
                  control={control}
                  defaultValue=""
                  inputProps={{
                    required: true,
                  }}
                  render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <TextField
                     
                      onChangeText={text => onChange(allowOnlyNumber(text))}
                      value={value}
                     
                      error={error && error.message}
                    />

                    
                    // <PhoneInput
                    //   variant="outlined"
                    //   inputStyle={{ height: "50px", width: "135%" }}
                    //   id="phone"
                    //   label="Phone"
                    //   error={Boolean(errors.phone)}
                    //   {...field}
                    // ></PhoneInput>
                  )}
                >

                </Controller> */}
                <Controller
                  name="accountNumber"
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
                      type="number"
                    //   inputProps={{ pattern: {
                    //     value: /^[1-9]\d*(\d+)?$/i,
                    //     message: 'Please enter an integer',
                    // } }}
                      id="accou"
                      label="Account Number"
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
                  name="pin"
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
                      type="number"
                    //   inputProps={{ pattern: {
                    //     value: /^[1-9]\d*(\d+)?$/i,
                    //     message: 'Please enter an integer',
                    // } }}
                      id="pin"
                      label="PIN"
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
                <Button
                  //   onClick={handleSubmit(submitHandler); handleClose()}
                  variant="contained"
                  type="submit"
                  fullWidth
                  color="primary"
                >
                  Submit
                </Button>
              </ListItem>
            </List>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
