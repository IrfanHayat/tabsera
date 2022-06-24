import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React from "react";
import CheckoutWizard from "../container/CheckoutWizard";
import AddIcon from "@mui/icons-material/Add";
import Card from '@mui/material/Card';

import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import DomainAddOutlinedIcon from '@mui/icons-material/DomainAddOutlined';
import AddLocationAltOutlinedIcon from '@mui/icons-material/AddLocationAltOutlined';
function ShippingMethods({ shipmentMethodData,checkoutHandler,handleChange,shippementData,userData,productPrice }) {
 
  return (
    <Grid container>
      <CheckoutWizard activeStep={3} />
     
      <Grid item md={12} xs={12}>
          <Card style={{ margin: "40px" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Typography variant="h6" component="h2">
             Shipping Information
           </Typography>
            
              {/* {productDetail?.merchant_name} */}
              <List>
                <ListItem><AccountCircleIcon/>{userData.first_name} {userData.last_name}</ListItem>
              </List>
              <List>
                <ListItem><PhoneIcon/> </ListItem>
              </List>
              <List>
                <ListItem>
                  <EmailIcon/>{userData.email}
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <DomainAddOutlinedIcon/>{shippementData?.address}
                </ListItem>
              </List>
              <List>
                <ListItem>
                  <AddLocationAltOutlinedIcon/>{shippementData?.city},{shippementData?.state},{shippementData?.country}
                </ListItem>
              </List>
              </Box>
            {/* <TabPanel value={value} index={2}>
              {merchantDetail?.city}
            </TabPanel> */}
          </Card>
        </Grid>

      <Grid item  md={3} sx={{ margin: 5 }}>
      <FormControl>
        
        <FormLabel id="demo-row-radio-buttons-group-label">
          Shipping Methods
        </FormLabel>

        <RadioGroup
          row
          aria-labelledby="demo-row-radio-buttons-group-label"
          name="row-radio-buttons-group"
          // value={labelValue}
           onChange={handleChange}
        >
          {/* <FormControlLabel
            value="female"
            control={<Radio />}
            label="Female"
          >
            <BusinessIcon/>
            <FormControlLabel/> */}
          {/* <BusinessIcon /> */}
          {shipmentMethodData && shipmentMethodData.map(result => (
           
              <FormControlLabel
              value={result.shipping_method_id}
              control={<Radio />}
              label={result.shipping_method_name}
            />
          
          ))}
        </RadioGroup>


      
    </FormControl>
      </Grid>

      <Grid item md={12} sm={12} sx={{ margin: 5 }}>
        <Typography variant="h5">Shipping Charges</Typography>
        <Box sx={{ display: "inline", margin: 5 }}>
          <List>
            <ListItem>
              <ListItemText>Subtotal {productPrice &&
              productPrice.reduce((a, c) => a + c.qty * c.price, 0)}</ListItemText>
              {/* <ListItemText>$ 0.0</ListItemText> */}
            </ListItem>
            <ListItem>
              <ListItemText>Shipping Cost :500</ListItemText>
            </ListItem>
            <ListItem>
              <ListItemText>Subtotal { productPrice &&
              productPrice.reduce((a, c) => a + c.qty * c.price, 0)+ 500}</ListItemText>
            </ListItem>
          </List>
          <Button
            onClick={checkoutHandler}
            variant="outlined"
            // startIcon={<AddIcon />}
          
          >
            Proced to Payment
          </Button>
        </Box>
      </Grid>
    </Grid>
  );
}

export default ShippingMethods;
