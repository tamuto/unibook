import React from 'react'
import { useNavigate } from 'react-router-dom'

import {
  AppBar,
  Toolbar,
  Typography,
  IconButton
} from '@mui/material'

import HomeIcon from '@mui/icons-material/Home'

const TitleBar = () => {
  const navigate = useNavigate()
  const base = '/books'

  const moveHome = () => {
    navigate(`${base}`)
  }

  return (
    <AppBar>
      <Toolbar>
        <Typography variant='h6'>管理台帳</Typography>
        <IconButton sx={{ cursor: 'pointer' }} onClick={() => moveHome()} >
          <HomeIcon color="disabled" />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default TitleBar
