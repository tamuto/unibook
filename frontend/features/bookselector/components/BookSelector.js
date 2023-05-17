import React, { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import axios from 'axios'
import { Auth } from 'aws-amplify'
import ShareIcon from '@mui/icons-material/Share'

import {
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Typography
} from '@mui/material'


const BookSelector = () => {
  const [books, setBooks] = useState([])
  const navigate = useNavigate()

  const _loadBooks = async () => {
    const data = await Auth.currentSession()
    axios.defaults.headers.common.Authorization = data.idToken.jwtToken
    const result = await axios.get('/api/books')
    setBooks(result.data)
    await Auth.currentUserInfo()
  }

  const moveShereBook = () => {
    navigate('/books/share')
  }

  useEffect(() => {
    _loadBooks()
  }, [])

  return (
    <Paper sx={{ width: '600px', mx: 'auto', p: 2 }}>
      <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={1}>
        <Typography variant='h6'>選択してください。</Typography>
        <IconButton onClick={moveShereBook}>
          <ShareIcon />
        </IconButton>
      </Stack>
      <List>
        {books.length === 0 ? (
          <Typography variant="body1">台帳が登録されていません。</Typography>
        ) : (
          books.map((item) => (
            <ListItemButton key={item.book_id} component={NavLink} to={`/books/${item.book_id}`}>
              <ListItemText primary={item.book_name} />
            </ListItemButton>
          ))
        )}
      </List>
    </Paper>
  )
}

export default BookSelector
