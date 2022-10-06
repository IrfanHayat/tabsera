import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
//
import palette from './Theme/palette';
import typography from './Theme/typography';
import componentsOverride from './Theme/overrides';
import shadows, { customShadows } from './Theme/shadows';

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

  const theme = createTheme(themeOptions);
  theme.components = componentsOverride(theme);

  return (
    <StyledEngineProvider injectFirst>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </StyledEngineProvider>
  );
}