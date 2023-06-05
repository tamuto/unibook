import React, { createContext, useState, useEffect } from 'react'
import { createRoot } from 'react-dom/client'
import { SnackbarProvider } from 'notistack'

import {
  CssBaseline
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import res from './theme.json'
import LoginPage from './system/components/LoginPage'
import MainPage from './system/components/MainPage'
import useLoginState from './system/api/useLoginState'
import useMediaQuery from '~/api/useMediaQuery'
import AccountInfoCheck from '~/system/components/AccountInfoCheck'
import Confirmed from '~/system/components/Confirmed'
import NewPassword from '~/system/components/NewPassword'
import PasswordReset from '~/system/components/PasswordReset'
import SignUp from '~/system/components/SignUp'
import Snackbar from '~/components/Snackbar'

import { Amplify } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'
import awsExports from '../src/aws-exports'

Amplify.configure(awsExports)

const theme = createTheme(res)

export const AuthContext = createContext(null)

const App = () => {
  const mediaQuery = useMediaQuery()
  const loginState = useLoginState()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  const { alertInfo } = useLoginState()
  const init = useLoginState(state => state.init)

  useEffect(() => {
    mediaQuery.init(theme)
    init()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SnackbarProvider>
          {alertInfo?.display && (
            <Snackbar alertInfo={alertInfo}></Snackbar>
          )}
          {
            loginState.mode === 0 && <LoginPage />
          }
          {
            loginState.mode === 1 && <MainPage />
          }
          {
            loginState.mode === 2 && <SignUp />
          }
          {
            loginState.mode === 3 && <AccountInfoCheck />
          }
          {
            loginState.mode === 4 && <Confirmed />
          }
          {
            loginState.mode === 5 && <PasswordReset />
          }
          {
            loginState.mode === 6 && <NewPassword />
          }
        </SnackbarProvider>
      </ThemeProvider>
    </AuthContext.Provider>
  )
}

root = createRoot(document.getElementById('app'))
root.render(<App />)
