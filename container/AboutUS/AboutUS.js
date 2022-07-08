import { Box, Typography, Grid } from "@mui/material";
import React from "react";
import Container from "@mui/material/Container";

import Image from "next/image";
// import img from "./lion.jpg";
function AboutUS() {
  return (
    <Box
      px={{ xs: 3, sm: 10 }}
      py={{ xs: 5, sm: 10 }}
      textAlign="center"
      //   sx={{ dispaly: "flex", justifyContent: "center" }}
      // bgcolor="text.disabled"
    >
      <Container maxWidth="lg">
        <Typography variant="h5">About Us</Typography>
        <Typography variant="body2" paddingTop={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras lacus
          metus, convallis ut leo nec, tincidunt eleifend justo. Ut felis orci,
          hendrerit a pulvinar et, gravida ac lorem. Sed vitae molestie sapien,
          at sollicitudin tortor.
        </Typography>
        <Typography variant="body2" paddingTop={3}>
          Duis id volutpat libero, id vestibulum purus.Donec euismod accumsan
          felis,egestas lobortis velit tempor vitae. Integer eget velit
          fermentum, dignissim odio non, bibendum velit.
        </Typography>

        <Box paddingTop={1} margin={2} justifyContent="center">
          <Typography variant="h5" paddingTop={5}>
            Meet Our Team
          </Typography>
          <Typography variant="body1" paddingTop={3}>
            Want to work in our friendly team?
          </Typography>
          <Typography variant="body1">
            Contact us and we will consider your candidacy.
          </Typography>

          <Grid container spacing={5} paddingTop={5}>
            <Grid item xs={12} sm={3} direction="row" alignItems="center">
              <Box borderBottom={1}>
                <Box bgcolor="black" width="100%" height={150}>
                  {/* <Image src="/lion.jpg" width={100} height={100}></Image> */}
                </Box>
                <Typography variant="h5">Inam Khosa</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={3} direction="row" alignItems="center">
              <Box borderBottom={1}>
                <Box bgcolor="black" width="100%" height={150}>
                  {/* <Image src="/lion.jpg" width={100} height={100}></Image> */}
                </Box>
                <Typography variant="h5">Inam Khosa</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={3} direction="row" alignItems="center">
              <Box borderBottom={1}>
                <Box bgcolor="black" width="100%" height={150}>
                  {/* <Image src="/lion.jpg" width={100} height={100}></Image> */}
                </Box>
                <Typography variant="h5">Inam Khosa</Typography>
              </Box>
            </Grid>

            <Grid item xs={12} sm={3} direction="row" alignItems="center">
              <Box borderBottom={1}>
                <Box bgcolor="black" width="100%" height={150}>
                  {/* <Image src="/lion.jpg" width={100} height={100}></Image> */}
                </Box>
                <Typography variant="h5">Inam Khosa</Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
      {/* <Image src="/lion.jpg" width={200} height={400}></Image> */}
    </Box>
  );
}

export default AboutUS;
