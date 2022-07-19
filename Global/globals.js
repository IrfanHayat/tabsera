// import i18n from "./locales/i18n";
import i18n from "../locales/i18n";
import { cssMain } from "./config";

console.log(cssMain);
export const Newtheme = {
  direction: i18n.dir(),
  palette: {
    primary: {
      main: cssMain.main,
    },
    background: {
      default: cssMain.default,
    },
  },

  typography: {
    fontFamily: cssMain.fontFamily,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: cssMain.fontFamily;
          font-style: cssMain.fontStyle;
          font-display: cssMain.fontDisplay;
          font-weight: cssMain.fontWeight;

        }
      `,
    },
  },
};
