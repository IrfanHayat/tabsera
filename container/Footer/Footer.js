import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PublicOutlinedIcon from "@mui/icons-material/PublicOutlined";
import { header, footer } from "../../helper/config/config";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
export default function Footer() {
  const [currentHost, setCurrentHost] = useState();
  let { t, i18n } = useTranslation();
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      window.location !== window.parent.location
    ) {
      const hostname = window.location.hostname;
      setCurrentHost(hostname);
    }
  }, []);

  return (
    <>
      {currentHost != "137.74.4.23" && footer != true ? (
        <Box
          // px={{ xs: 3, sm: 10, md: 12 }}
          // py={{ xs: 5, sm: 10, md: 12 }}
          component="footer"
          sx={{
            p: 1,
            // mt: "auto",
            m: 1,
            display: "flex",
            justifyContent: "center",
            // alignItems: "center",
            color: "text.primary",
            bgcolor: "#eeeeee",
          }}
        >
          {/* Hi */}
          {/* <Container fixed maxWidth="lg"> */}
          <Grid container>
            <Grid item md={3} container direction="row" alignItems="center">
              <Box
                textAlign="center"
                sx={{ m: 1, p: 1 }}
              // pt={{ xs: 2, sm: 5 }}
              // pb={{ xs: 2, sm: 0 }}
              >
                {t('Footer.rights_and_reserved')}
                {/* © {new Date().getFullYear()} Tabsera. All Rights Reserved */}
              </Box>
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              md={9}
              container
              direction="row"
              alignItems="center"
            >
              <Box
                // textAlign="center"
                sx={{ display: "flex", flexWrap: "wrap" }}
                justifyContent="center"
              // pt={{ xs: 2, sm: 5 }}
              // pb={{ xs: 2, sm: 0 }}
              >
                <Typography> {t('Footer.countryRegion.heading')}</Typography>
                <Divider
                  sx={{ height: 28, mx: 2 }}
                  orientation="vertical"
                  color="grey"
                />
                <Typography>{t('Footer.countryRegion.heading')}</Typography>
                <Divider
                  sx={{ height: 28, mx: 2 }}
                  orientation="vertical"
                  color="grey"
                />
                <Typography>{t('Footer.countryRegion.countryName.0')}</Typography>
                <Divider
                  sx={{ height: 28, mx: 2 }}
                  orientation="vertical"
                  color="grey"
                />
                <Typography>{t('Footer.countryRegion.countryName.1')}</Typography>
                <Divider
                  sx={{ height: 28, mx: 2 }}
                  orientation="vertical"
                  color="grey"
                />
                <Typography>{t('Footer.countryRegion.countryName.2')}</Typography>
                <Divider
                  sx={{ height: 28, mx: 2 }}
                  orientation="vertical"
                  color="grey"
                />
                <Typography>{t('Footer.countryRegion.countryName.3')}</Typography>{" "}
                <Divider
                  sx={{ height: 28, mx: 2 }}
                  orientation="vertical"
                  color="grey"
                />
                <Typography>{t('Footer.countryRegion.countryName.5')}</Typography>{" "}
                <Divider
                  sx={{ height: 28, mx: 2 }}
                  orientation="vertical"
                  color="grey"
                />
                <Typography>{t('Footer.countryRegion.countryName.6')}</Typography>{" "}
                <Divider
                  sx={{ height: 28, mx: 2 }}
                  orientation="vertical"
                  color="grey"
                />
                <Typography>{t('Footer.countryRegion.countryName.7')}</Typography>
              </Box>
            </Grid>
          </Grid>

          {/* <Box textAlign="center" pt={{ xs: 2, sm: 5 }} pb={{ xs: 2, sm: 0 }}>
            &reg; {new Date().getFullYear()} Tabsera. All Rights Reserved
          </Box> */}
          {/* </Container> */}
        </Box>
      ) : (
        ""
      )}
    </>
  );
}
