import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'
import { Auth } from 'aws-amplify'

import {
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Typography
} from '@mui/material'


const BookSelector = () => {
  const [books, setBooks] = useState([])

  const _loadBooks = async () => {
    const data = await Auth.currentSession()
    axios.defaults.headers.common.Authorization = data.idToken.jwtToken
    const result = await axios.get('/api/books')
    setBooks(result.data)
    await Auth.currentUserInfo()
  }

  useEffect(() => {
    _loadBooks()
  }, [])

  return (
    <Paper sx={{ width: '600px', mx: 'auto', p: 2 }}>
      <Typography variant='h6'>選択してください。</Typography>
      <List>
        {
          books.map((item) => (
            <ListItemButton key={item.book_id} component={NavLink} to={`/books/${item.book_id}`}>
              <ListItemText primary={item.book_name} />
            </ListItemButton>
          ))
        }
      </List>
    </Paper>
  )
}

export default BookSelector
