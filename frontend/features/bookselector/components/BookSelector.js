import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import axios from 'axios'

import {
  List,
  ListItemButton,
  ListItemText
} from '@mui/material'

const BookSelector = () => {
  const [books, setBooks] = useState([])

  const _loadBooks = async () => {
    const result = await axios.get('/api/books')
    console.log(result)
    setBooks(result.data)
  }

  useEffect(() => {
    _loadBooks()
  }, [])

  return (
    <List>
      {
        books.map((item) => (
          <ListItemButton key={item.book_id} component={NavLink} to={`/books/${item.book_id}`}>
            <ListItemText primary={item.book_name} />
          </ListItemButton>
        ))
      }
    </List>
  )
}

export default BookSelector
