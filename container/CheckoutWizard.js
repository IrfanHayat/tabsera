import { Grid, Step, StepLabel, Box, Stepper, Typography } from "@mui/material";
import React from "react";
import { makeStyles } from '@mui/styles';
import clsx from 'clsx';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import LocalPostOfficeIcon from '@mui/icons-material/LocalPostOffice';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from "react-i18next";
const useStyles = makeStyles(() => ({
  root: {
    backgroundColor: '#eaeaf0',
    padding: 8,
    borderRadius: '50%'
  },
  active: {
    color: 'red',
  },
  completed: {
    color: 'green',
  },
}));

const CustomStepIcon = (props) => {
  const classes = useStyles();
  const { active, completed } = props;

  const stepIcons = {
    1: <AddShoppingCartIcon />,
    2: <LocalShippingIcon />,
    3: <LocalPostOfficeIcon />,
    4: <PaymentIcon />,
    5: <CheckCircleOutlineIcon />
  };

  return (
    <div
      className={clsx(classes.root, {
        [classes.active]: active,
        [classes.completed]: completed,
      })}
    >
      {stepIcons[String(props.icon)]}
    </div>
  );
};
export default function CheckoutWizard({ activeStep = 0 }) {
  let { t, i18n } = useTranslation();


  return (
    <Grid

      sx={{ alignContent: "start", justifyContent: "start", mt: 5 }}
    >
      <Box sx={{ width: "100%", alignContent: "center", justifyContent: "center" }}>
        {/* <Grid item md={12} xs={12} sm={12}> */}
        <Stepper
          activeStep={activeStep}
        >
          {[
            t('stepper.checkout'),
            t('stepper.shippingInfo'),
            t('stepper.reviewOrder'),
            t('stepper.pay'),
            t('stepper.orderComplete'),
          ].map((step) => (
            <Step
              key={step}
              sx={{
                width: "100%",
              }}
            >
              <StepLabel StepIconComponent={CustomStepIcon} >{step}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {/* </Grid> */}
      </Box>
    </Grid>
  );
}
