import React, { createContext, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import {
  Box,
  Container,
  CssBaseline,
  Toolbar
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import res from './theme.json'

import TitleBar from '~/conponents/TitleBar'
import BookSelector from '~/features/bookselector/components/BookSelector'
import BookForm from '~/features/bookform/components/BookForm'
import BookEditor from '~/features/bookform/components/BookEditor'
import LoginPage from './system/components/LoginPage'
import SignUp from './system/components/SignUp'
import PasswordReset from './system/components/PasswordReset'
import NewPassword from './system/components/NewPassword'
import Confirmed from './system/components/Confirmed'
import AccountInfoCheck from './system/components/AccountInfoCheck'
import Account from './conponents/Account'
import ChangePassword from './conponents/ChangePassword'

import { Amplify } from 'aws-amplify'
import '@aws-amplify/ui-react/styles.css'
import awsExports from '../src/aws-exports'

Amplify.configure(awsExports)

const theme = createTheme(res)

export const AuthContext = createContext(null)

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState(null)
  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, user, setUser }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
          <TitleBar />
          <Container>
            <Box pt={2}>
              <Toolbar />
              <Routes>
                <Route path='/' element={<Navigate to='/books' />} />
                <Route path='/books' element={<LoginPage />} />
                <Route path='/books/signup' element={<SignUp />} />
                <Route path='/books/signup/account/check' element={<AccountInfoCheck />} />
                <Route path='/books/signup/confirmed' element={<Confirmed />} />
                <Route path='/books/passwordreset' element={<PasswordReset />} />
                <Route path='/books/newpassword' element={<NewPassword />} />
                <Route path='/books/account/info' element={<Account />} />
                <Route path='/books/account/password' element={<ChangePassword />} />
                <Route path='/books/home' element={<BookSelector />} />
                <Route path='/books/:form' element={<BookForm />} />
                <Route path='/books/:form/entry' element={<BookEditor />} />
                <Route path='/books/:form/edit/:recordNo' element={<BookEditor />} />
              </Routes>
            </Box>
          </Container>
        </HashRouter>
      </ThemeProvider>
    </AuthContext.Provider>
  )
}

root = createRoot(document.getElementById('app'))
root.render(<App />)
