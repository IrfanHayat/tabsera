import React from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import { makeStyles, ThemeProvider, createMuiTheme } from "@mui/styles";
//import { FontProvider, Font } from 'website/src/components/Font';
import Link from "next/link";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
export default function Footer() {
  return (
    <Box
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      bgcolor="text.secondary"
      color="white"
    >
      {/* Hi */}
      <Container maxWidth="lg">
        <Grid container spacing={5}>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Help</Box>
            <Box>
              <Link href="/" color="inherit">
                Contact
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Support
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Privacy
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Help</Box>
            <Box>
              <Link href="/" color="inherit">
                Contact
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Support
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Privacy
              </Link>
            </Box>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Box borderBottom={1}>Help</Box>
            <Box>
              <Link href="/" color="inherit">
                Contact
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Support
              </Link>
            </Box>
            <Box>
              <Link href="/" color="inherit">
                Privacy
              </Link>
            </Box>
          </Grid>
        </Grid>
        <Box textAlign="center" pt={{ xs: 2, sm: 5 }} pb={{ xs: 2, sm: 0 }}>
          <Typography variant="h6"> Join Us </Typography>
          <FacebookIcon />
          <InstagramIcon />
          <EmailOutlinedIcon />
        </Box>
        <Box textAlign="center" pt={{ xs: 2, sm: 5 }} pb={{ xs: 2, sm: 0 }}>
          Tabsera &reg; {new Date().getFullYear()}
        </Box>
      </Container>
    </Box>
  );
}
