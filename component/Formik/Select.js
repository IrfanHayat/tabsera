import React from "react";
import { Field } from "formik";
import InputLabel from "@mui/material/InputLabel";
import FormLabel from "@mui/material/FormLabel";
import { Box } from "@mui/material";

function Select(props) {
  const { label, name, options, ...rest } = props;
  return (
    <Box className="form-control">
      {/* <label htmlFor={name}>{label}</label> */}
      <FormLabel id="demo-simple-select-label" htmlFor={name}>
        {label}
      </FormLabel>
      <InputLabel as="select" id={name} name={name} {...rest}>
        {options.map((option) => {
          return (
            <option key={option.value} value={option.key}>
              {option.key}
            </option>
          );
        })}
      </InputLabel>
    </Box>
  );
}

export default Select;
