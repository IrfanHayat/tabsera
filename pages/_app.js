import { Provider } from "react-redux";
import { store } from "../app/store";
import { useEffect } from "react";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { jssPreset, StylesProvider } from "@mui/styles";
import { ThemeProvider } from "@mui/material/styles";
import Head from "next/head";
import { theme } from "../theme";
import { CookiesProvider } from "react-cookie";
import NavBar from "../container/Navbar/NavBar";
import Footer from "../container/Footer/Footer";
import { Box } from "@mui/material";
import "../locales/i18n";
import rtl from "jss-rtl";
import { create } from "jss";
import { Container } from "@mui/material";
import AOS from "aos";
import "aos/dist/aos.css";
import { RouteGuard } from "../RouterGuard";

const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const MyApp = ({ Component, pageProps }) => {
  useEffect(() => {
    AOS.init({
      easing: "ease-out-cubic",
      // once: true,
      offset: 50,
    });
  }, []);
  return (
    //  <SessionProvider session={pageProps.session}>

    <Provider store={store}>
      <StylesProvider jss={jss}>
        <ThemeProvider theme={theme}>
          {/* <CookiesProvider> */}
          <Head>
            <link rel="icon" href="/favicon.png" />
          </Head>
          <NavBar />

          {/* <Container maxWidth="xl" sx={{ minHeight: "80vh" }}> */}
          <Box>
            {/* <RouteGuard> */}
            <Component {...pageProps} />
            {/* </RouteGuard> */}
          </Box>
          {/* </Container> */}
          <Footer />
          {/* </CookiesProvider> */}
        </ThemeProvider>
      </StylesProvider>
    </Provider>
  );
};

export default MyApp;
