import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import {
  Box,
  Button,
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
import LoginPage from './system/LoginPage'

import { Amplify } from 'aws-amplify'
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'
import awsExports from '../src/aws-exports'

Amplify.configure(awsExports)

const theme = createTheme(res)

const App = () => (
  <Authenticator>
    {({ signOut, user }) => (
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <HashRouter>
          <TitleBar />
          <Container>
            <Box pt={2}>
              <Toolbar />
              <h1>Hello {user.username}</h1>
              <Button onClick={signOut}>Sign out</Button>
              <Routes>
                <Route path='/' element={<Navigate to='/books' />} />
                <Route path='/books' element={<LoginPage />} />
                <Route path='/books/home' element={<BookSelector />} />
                <Route path='/books/:form' element={<BookForm />} />
                <Route path='/books/:form/entry' element={<BookEditor />} />
                <Route path='/books/:form/edit/:recordNo' element={<BookEditor />} />
              </Routes>
            </Box>
          </Container>
        </HashRouter>
      </ThemeProvider>
    )}
  </Authenticator  >
)

root = createRoot(document.getElementById('app'))
root.render(<App />)
