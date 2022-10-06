// import { createTheme } from "@mui/material/styles";
// import { Newtheme } from "../Global/globals";
// import i18n from "../locales/i18n";





// export const theme = createTheme({
//     // Newtheme,

//     direction: i18n.dir(),
//     palette: {
//         primary: {
//             main: "#3d7cff",
//         },
//         background: {
//             default: "#fafafa",
//         },
//     },

//     typography: {
//         allVariants: {
//             fontFamily: "Raleway, Almarai, sans-serif",
//             // fontFamily: 'serif',
//             textTransform: "none",
//             fontSize: 14,
//         },
//     },

//     // typography: {
//     //   fontFamily: "serif, Arial",
//     // },
//     components: {
//         MuiCssBaseline: {
//             styleOverrides: `
//         @font-face {
//           font-family: 'Raleway';
//           font-style: normal;
//           font-display: swap;
//           font-weight: 400;
//         }
//       `,
//         },
//     },
// });



import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import shadows, { customShadows } from './shadows';

// ----------------------------------------------------------------------

ThemeProvider.propTypes = {
    children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
    const themeOptions = useMemo(
        () => ({
            palette,
            shape: { borderRadius: 8 },
            typography,
            shadows,
            customShadows,
            breakpoints: {
                values: {
                    xxs: 0, // small phone
                    xs: 300, // phone
                    sm: 600, // tablets
                    md: 900, // small laptop
                    lg: 1200, // desktop
                    xl: 1536 // large screens
                }
            }

        }),
        []
    );

    export const theme = createTheme(themeOptions);
    // theme.components = componentsOverride(theme);

    // return (
    //     <StyledEngineProvider injectFirst>
    //         <MUIThemeProvider theme={theme}>
    //             <CssBaseline />
    //             {children}
    //         </MUIThemeProvider>
    //     </StyledEngineProvider>
    // );
}