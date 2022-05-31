import React from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import FormikController from "./FormikController";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Box } from "@mui/system";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

function RegistratioForm() {
  const choices = [
    { key: "choice a", value: "choicea" },
    { key: "choice b", value: "choiceb" },
  ];

  const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
  };
  const validationSchema = Yup.object({
    firstName: Yup.string().required("Required"),
    lastName: Yup.string().required("Required"),
    email: Yup.string().required("Required"),
  });
  const onSubmit = (values) =>{
    console.log("Form data", values.firstName, values.lastName, values.email);

  }
    
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container md={12} spacing={2} justify="space-around">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              {/* <Grid item md={12}>
                <Item>
                  <FormikController
                    control="radio"
                    label="Account Type ?"
                    name="radioChoice"
                    options={accountType}
                  />
                </Item>
              </Grid> */}
              <Grid item md={12}>
                <Item>
                  <FormikController
                    control="input"
                    type="text"
                    label="First Name"
                    name="firstName"
                  />
                </Item>
              </Grid>
              <Grid item md={12}>
                <Item>
                  <FormikController
                    control="input"
                    type="text"
                    label="Last Name"
                    name="lastName"
                  />
                </Item>
              </Grid>
              {/* <Grid item md={12}>
                <Item>
                  <FormikController
                    control="input"
                    type="text"
                    label="Contact Number"
                    name="contactNumber"
                  />
                </Item>
              </Grid> */}
              <Grid item md={12}>
                <Item>
                  <FormikController
                    control="input"
                    type="email"
                    label="Email"
                    name="email"
                  />
                </Item>
              </Grid>
              {/* <FormikController
                control="textarea"
                label="Description"
                name="description"
                type="text"
              /> */}
              {/* <FormikController
                control="select"
                label="Country"
                name="country"
                options={countries}
              />
              
             
              {/* <FormikController
                control="radio"
                label="Click your choice"
                name="radioChoice"
                options={choices}
              /> */}
              {/* <FormikController
                control="checkbox"
                label="I agree with the terms and conditions"
                name="checkBoxChoice"
                options={choices}
              />{" "} */}
              <Button type='submit' style={{ background: "green" }}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </Grid>
    </Box>
  );
}
export default RegistratioForm;
