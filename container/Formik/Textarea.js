import React from "react";
import { Field, ErrorMessage } from "formik";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import { Box, FormLabel } from "@mui/material";

function Textarea(props) {
  const { label, name, ...rest } = props;
  return (
    <Box>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <TextareaAutosize
        as="textarea"
        id={name}
        name={name}
        {...rest}
        aria-label="minimum height"
        minRows={3}
        placeholder="Minimum 3 rows"
        style={{ width: 200 }}
      />
      <ErrorMessage name={name} />
    </Box>
  );
}
export default TextArea;
