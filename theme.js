import { createTheme } from "@mui/material/styles";
import { Newtheme } from "./Global/globals";
import i18n from "./locales/i18n";

export const theme = createTheme({
  // Newtheme,
  direction: i18n.dir(),
  palette: {
    primary: {
      main: "#ff4747",
    },
    background: {
      default: "#757575",
    },
  },

  typography: {
    allVariants: {
      fontFamily: "Raleway, Almarai, sans-serif",
      // fontFamily: 'serif',
      textTransform: "none",
      fontSize: 14,
    },
  },

  // typography: {
  //   fontFamily: "serif, Arial",
  // },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Raleway';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
        }
      `,
    },
  },
});
