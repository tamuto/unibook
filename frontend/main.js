import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import {
  CssBaseline,
  Container,
  Toolbar,
  Box
} from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import res from './theme.json'

import TitleBar from '~/conponents/TitleBar'
import BookSelector from '~/features/bookselector/components/BookSelector'
import BookForm from '~/features/bookform/components/BookForm'
import BookEditor from '~/features/bookform/components/BookEditor'

const theme = createTheme(res)

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <HashRouter>
      <TitleBar />
      <Box pt={2}>
        <Toolbar />
        <Routes>
          <Route path='/' element={<Navigate to='/books' />} />
          <Route path='/books' element={<BookSelector />} />
          <Route path='/books/:form' element={<BookForm />} />
          <Route path='/books/:form/:_id' element={<BookEditor />} />
          <Route path='/books/:form/entry' element={<BookEditor />} />
        </Routes>
      </Box>
    </HashRouter>
  </ThemeProvider>
)

root = createRoot(document.getElementById('app'))
root.render(<App />)
