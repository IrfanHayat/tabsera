import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme";
import { CookiesProvider } from "react-cookie"
const MyApp = ({ Component, pageProps }) => {
  return (
  //  <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <CookiesProvider>
          <Component {...pageProps} />
          </CookiesProvider>
        </ThemeProvider>
      </Provider>
  //  </SessionProvider>
  );
};

export default MyApp;
