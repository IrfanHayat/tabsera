import { Provider } from 'react-redux'
import { store } from '../app/store'
import '../styles/globals.css'
import { Provider as AuthProvider } from 'next-auth/client'
import { ThemeProvider } from '@mui/material'
import { theme } from '../theme'

const MyApp = ({ Component, pageProps }) => {
  return (
    <AuthProvider session={pageProps.session}>
      <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </AuthProvider>
  )
}

export default MyApp