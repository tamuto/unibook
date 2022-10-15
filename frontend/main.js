import React from 'react'
import { createRoot } from 'react-dom/client'
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom'

import { CssBaseline } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import res from './theme.json'

import BookSelector from '~/features/bookselector/components/BookSelector'
import BookForm from '~/features/bookform/components/BookForm'

const theme = createTheme(res)

const App = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <HashRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/books' />} />
        <Route path='/books' element={<BookSelector />} />
        <Route path='/books/:form' element={<BookForm />} />
      </Routes>
    </HashRouter>
  </ThemeProvider>
)

root = createRoot(document.getElementById('app'))
root.render(<App />)
