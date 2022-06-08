import React from "react";
import { Field, ErrorMessage } from "formik";
import { Box, FormControlLabel, FormLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
function Checkboxes(props) {
  const { label, name, options, ...rest } = props;
  return (
    <Box>
      <FormLabel>{label}</FormLabel>
      <Field name={name}>
        {(formik) => {
          const { field } = formik;
          return options.map((option) => {
            return (
              <Box key={option.key}>
                <FormControlLabel
                  control={<Checkbox defaultChecked />}
                  label={option.key}
                  type="checkbox"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                />
                {/* <input
                  type="checkbox"
                  id={option.value}
                  {...field}
                  {...rest}
                  value={option.value}
                  checked={field.value.includes(option.value)}
                /> */}
                {/* <FormLabel>{option.key}</FormLabel> */}
              </Box>
            );
          });
        }}
      </Field>
      <ErrorMessage name={name} />
    </Box>
  );
}

export default Checkboxes;
