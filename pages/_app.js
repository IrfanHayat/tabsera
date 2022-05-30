import { Provider } from "react-redux";
import { store } from "../app/store";
import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@mui/material";
import { theme } from "../theme";

const MyApp = ({ Component, pageProps }) => {
  return (
    <SessionProvider session={pageProps.session}>
      <Provider store={store}>
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </SessionProvider>
  );
};

export default MyApp;
