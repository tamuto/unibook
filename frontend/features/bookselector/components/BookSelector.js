import React, { useState, useEffect } from 'react'
import { useNavigate, NavLink } from 'react-router-dom'
import { Auth } from 'aws-amplify'
import { css } from '@emotion/react'
import axios from 'axios'
import ShareIcon from '@mui/icons-material/Share'
import AddCircleIcon from '@mui/icons-material/AddCircle'
import useMediaQuery from '~/api/useMediaQuery'

import {
  IconButton,
  List,
  ListItemButton,
  ListItemText,
  Paper,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'

const BookSelector = () => {
  const mobile = useMediaQuery(state => state.mobile)

  const layoutCss = css`
    width: 600px;
    padding: 20px;
    margin: auto;
    ${mobile} {
      width: calc(95% - 5px);
    }
  `
  const [books, setBooks] = useState([])
  const navigate = useNavigate()

  const _loadBooks = async () => {
    const data = await Auth.currentSession()
    axios.defaults.headers.common.Authorization = data.idToken.jwtToken
    const result = await axios.get('/api/books')
    setBooks(result.data)
    await Auth.currentUserInfo()
  }
  
  const moveCreateBook = () => {
    navigate('/books/create')
  }

  const moveShereBook = () => {
    navigate('/books/share')
  }

  useEffect(() => {
    _loadBooks()
  }, [])

  return (
    <Paper css={layoutCss}>
      <Stack direction='row' alignItems='center' justifyContent='space-between' spacing={1}>
        <Typography variant='h6'>選択してください。</Typography>
        <div>
          <Tooltip title='新規作成'>
            <IconButton onClick={moveCreateBook}>
              <AddCircleIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title='共有'>
            <IconButton onClick={moveShereBook}>
              <ShareIcon />
            </IconButton>
          </Tooltip>
        </div>
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
