import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme";
import { CookiesProvider } from "react-cookie";
import NavBar from "../container/NavBar";
const MyApp = ({ Component, pageProps }) => {
  return (
    //  <SessionProvider session={pageProps.session}>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <CookiesProvider>
          <NavBar />
          <Component {...pageProps} />
        </CookiesProvider>
      </ThemeProvider>
    </Provider>
    //  </SessionProvider>
  );
};

export default MyApp;
