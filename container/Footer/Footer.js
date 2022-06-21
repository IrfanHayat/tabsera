import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
export default function Footer() {
  return (
    <Box
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      bgcolor="primary.main"
      color="white"
    >
      {/* Hi */}
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={3} direction="row" alignItems="center">
            <Box borderBottom={1}>
              <Typography variant="h5">Contact US</Typography>
            </Box>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <PublicOutlinedIcon />
              </Grid>
              <Grid item> Islambad Capital Teritory</Grid>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <EmailOutlinedIcon />
              </Grid>
              <Grid item>info@smartfusion.co</Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Box borderBottom={1}>
              <Typography variant="h5">Information</Typography>
            </Box>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <PublicOutlinedIcon />
              </Grid>
              <Grid item> Islambad Capital Teritory</Grid>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <EmailOutlinedIcon />
              </Grid>
              <Grid item>info@smartfusion.co</Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Box borderBottom={1}>
              <Typography variant="h5">Account</Typography>
            </Box>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <PublicOutlinedIcon />
              </Grid>
              <Grid item> Islambad Capital Teritory</Grid>
            </Grid>
            <Grid container direction="row" alignItems="center">
              <Grid item>
                <EmailOutlinedIcon />
              </Grid>
              <Grid item>info@smartfusion.co</Grid>
            </Grid>
          </Grid>

          <Grid item xs={12} sm={3}>
            <Box borderBottom={1}>
              <Typography variant="h5">NewsLetter</Typography>
            </Box>

            <Grid
              container
              direction="row"
              alignItems="center"
              // px={{ xs: 1, sm: 3 }}
              // py={{ xs: 1, sm: 3 }}
            >
              <Grid item>
                <PublicOutlinedIcon />
              </Grid>
              <Grid item> Islambad Capital Teritory</Grid>
            </Grid>

            <Grid container direction="row" alignItems="center">
              <Grid item>
                <EmailOutlinedIcon />
              </Grid>
              <Grid item>info@smartfusion.co</Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box textAlign="center" pt={{ xs: 2, sm: 5 }} pb={{ xs: 2, sm: 0 }}>
          Tabsera &reg; {new Date().getFullYear()}
        </Box>
      </Container>
    </Box>
  );
}
