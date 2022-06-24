import React from "react";
import { Field, ErrorMessage } from "formik";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";

function Input(props) {
  const { name, label, ...rest } = props;
 
  return (
    <Box>
      {/* <label htmlFor={name}> {label}</label> */}
      {/* <Field name={name} {...rest} /> */}
      <FormLabel id="demo-simple-select-label" htmlFor={name}>
        {label}
      </FormLabel>
      <TextField
        // id="outlined-basic"
        // label={label}
        name={name}
        {...rest}
        variant="outlined"
        size="small"
      />
      <ErrorMessage style={{ color: "red" }} name={name} />
    </Box>
  );
}
export default Input;