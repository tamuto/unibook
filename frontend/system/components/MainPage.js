import React from 'react'
import {
  HashRouter,
  Navigate,
  Route,
  Routes
} from 'react-router-dom'
import {
  Box,
  Container,
  Toolbar
} from '@mui/material'

import Account from '~/components/Account'
import BookEditor from '~/features/bookform/components/BookEditor'
import BookForm from '~/features/bookform/components/BookForm'
import BookSelector from '~/features/bookselector/components/BookSelector'
import BookShare from '~/components/BookShare'
import ChangePassword from '~/components/ChangePassword'
import TitleBar from '~/components/TitleBar'

const MainPage = () => {
  return (
    <HashRouter>
      <TitleBar />
      <Container>
        <Box pt={2}>
          <Toolbar />
          <Routes>
            <Route path='/' element={<Navigate to='/books' />} />
            <Route path='/books' element={<BookSelector />} />
            <Route path='/books/share' element={<BookShare />} />
            <Route path='/books/account/info' element={<Account />} />
            <Route path='/books/account/password' element={<ChangePassword />} />
            <Route path='/books/:form' element={<BookForm />} />
            <Route path='/books/:form/entry' element={<BookEditor />} />
            <Route path='/books/:form/edit/:recordNo' element={<BookEditor />} />
          </Routes>
        </Box>
      </Container>
    </HashRouter>
  )
}

export default MainPage