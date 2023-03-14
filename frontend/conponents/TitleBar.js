import React from 'react'

import {
  AppBar,
  IconButton,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'

import BookIcon from '@mui/icons-material/MenuBook'
import PersonIcon from '@mui/icons-material/Person'

const TitleBar = () => {

  return (
    <AppBar>
      <Toolbar>
        <BookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography variant='h5'>UNIBOOK</Typography>
        <Stack flexGrow={1}></Stack>
        <IconButton>
          <PersonIcon color="disabled" />
        </IconButton>
        <Typography>user name</Typography>
      </Toolbar>
    </AppBar>
  )
}

export default TitleBar
