import React from "react";
import { Field, ErrorMessage } from "formik";
import InputLabel from "@mui/material/InputLabel";
import FormLabel from "@mui/material/FormLabel";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import { Box } from "@mui/system";
import { FormControl } from "@mui/material";

function RadioButtons(props) {
  const { label, name, options, ...rest } = props;
  return (
    <Box>
      <FormControl>
        <FormLabel id="demo-row-radio-buttons-group-label">{label}</FormLabel>
        <Field name={name}>
          {(formik) => {
            const { field } = formik;
            return options.map((option) => {
              return (
                //            <RadioGroup
                //   aria-labelledby="demo-radio-buttons-group-label"
                //   defaultValue="female"
                //   name="radio-button s-group"
                // >
                //   <FormControlLabel value="female" control={<Radio />} label="Female" />
                //   <FormControlLabel value="male" control={<Radio />} label="Male" />
                //   <FormControlLabel value="other" control={<Radio />} label="Other" />
                // </RadioGroup>

                <Box key={option.key}>
                  <RadioGroup
                    row
                    aria-labelledby="demo-row-radio-buttons-group-label"
                    name="row-radio-buttons-group"
                  >
                    <FormControlLabel
                      // value="female"
                      control={<Radio />}
                      label={option.value}
                      id={option.value}
                      {...field}
                      {...rest}
                      value={option.value}
                      checked={field.value === option.value}
                    />
                  </RadioGroup>

                  {/* <input
                  type="radio"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value === option.value}
                /> */}
                  {/* <FormLabel id="demo-simple-select-label" htmlFor={option.value}>
                  {option.key}
                </FormLabel> */}
                  {/* <label htmlFor={option.value}>{option.key}</label> */}
                </Box>
              );
            });
          }}
        </Field>
      </FormControl>
      <ErrorMessage name={name} />
    </Box>
  );
}

export default RadioButtons;
