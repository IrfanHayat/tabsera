import { createTheme } from "@mui/material/styles";


export const theme = createTheme({
 
  palette: {
    primary: {
      main: "#3d7cff",
      
    },
    background:{
      default: "#F6F9FC",
    } ,

  },
  
  typography: {
    fontFamily: 'Raleway, Arial',
  },
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
