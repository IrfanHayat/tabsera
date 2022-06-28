
import { Provider } from "react-redux";
import { store } from "../app/store";

import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider,StylesProvider,jssPreset } from "@mui/styles";
import { theme } from "../theme";
import { CookiesProvider } from "react-cookie";
import NavBar from "../container/Navbar/NavBar";
import Footer from "../container/Footer/Footer";
import { Box } from "@mui/material";
import '../locales/i18n'
import rtl from 'jss-rtl';
import { create } from 'jss';


const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const MyApp = ({ Component, pageProps }) => {
  

  return (
    //  <SessionProvider session={pageProps.session}>

    
    <Provider store={store}>
      <StylesProvider jss={jss}>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <NavBar />
          <Box sx={{ minHeight: "80vh" }}>
            <Component {...pageProps} />
          </Box>
          <Footer />
        </CookiesProvider>
      </ThemeProvider>
      </StylesProvider>
      
    </Provider>
    //  </SessionProvider>
  );
};

export default MyApp;
