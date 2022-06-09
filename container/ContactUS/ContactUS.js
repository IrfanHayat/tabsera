import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { FormHelperText, TextField } from "@mui/material";
export default function ContactUS() {
  return (
    <Box color="black">
      <Box bgcolor="primary.main" maxWidth="100%" paddingBottom={50}>
        map
      </Box>

      <Container maxWidth="lg" bgcolor="primary.main">
        <Typography variant="h4" paddingTop={3}>
          {" "}
          Contact US
        </Typography>
        <Grid container spacing={5}>
          <Grid item xs={12} sm={6} direction="row" alignItems="center">
            <Box>
              <Typography variant="h5" paddingTop={3}>
                Our Address
              </Typography>
            </Box>
            <Grid container direction="row" alignItems="center" paddingTop={2}>
              <Grid item> Evacyee Trust Complex Islambad Capital Teritory</Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" paddingTop={2}>
              <Grid item>Email :</Grid>
              <Grid item>info@smartfusion.com</Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" paddingTop={2}>
              <Grid item>Phone :</Grid>
              <Grid item>03XX-XXXXXXX</Grid>
            </Grid>

            <Box>
              <Typography variant="h5" paddingTop={3}>
                Opening Hours
              </Typography>
            </Box>
            <Grid container direction="row" alignItems="center" paddingTop={2}>
              <Grid item> Monday to Friday :</Grid>
              <Grid item> 9am-9pm</Grid>
            </Grid>
            <Grid container direction="row" alignItems="center" paddingTop={2}>
              <Grid item> Saturdy :</Grid>
              <Grid item> 7am-7pm</Grid>
            </Grid>

            <Box>
              <Typography variant="h5" paddingTop={3}>
                Comment
              </Typography>
            </Box>
            <Grid container direction="row" alignItems="center" paddingTop={2}>
              <Grid item>
                {" "}
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Curabitur suscipit suscipit mi, non tempor nulla finibus eget.
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              </Grid>
            </Grid>
          </Grid>
          {/* --------------------------------------------------------------------------------------- */}
          <Grid item xs={12} sm={6}>
            <Box>
              <Typography variant="h5" paddingTop={3}>
                Leave us a Message
              </Typography>
            </Box>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <Box
                  component="form"
                  // sx={{
                  //   "& .MuiTextField-root": { m: 1, width: "25ch" },
                  // }}
                  noValidate
                  autoComplete="off"
                >
                  <div>
                    <TextField
                      sx={{ mr: 1, width: "32ch" }}
                      margin="normal"
                      fullWidth
                      id="outlined-basic"
                      label="First Name"
                      variant="outlined"
                    />
                    <TextField
                      sx={{ width: "32ch" }}
                      margin="normal"
                      fullWidth
                      id="outlined-basic"
                      label="Last Name"
                      variant="outlined"
                    />
                  </div>
                  <div>
                    <TextField
                      fullWidth
                      // sx={{ m: 1 }}
                      margin="normal"
                      id="outlined-basic"
                      label="Email"
                      variant="outlined"
                    />
                    <FormHelperText id="my-helper-text">
                      We'll never share your email.
                    </FormHelperText>
                    <TextField
                      fullWidth
                      // sx={{ m: 1 }}
                      id="outlined-multiline-static"
                      label="Message"
                      multiline
                      rows={4}
                    />
                  </div>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
