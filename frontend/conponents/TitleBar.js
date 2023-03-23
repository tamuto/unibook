import React from 'react'
import { useState } from 'react'

import {
  AppBar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography
} from '@mui/material'

import BookIcon from '@mui/icons-material/MenuBook'
import PersonIcon from '@mui/icons-material/Person'

const TitleBar = () => {
  const [anchorEl, setAnchorEl] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  }

  const handleClose = () => {
    setAnchorEl(null);
  }

  return (
    <AppBar>
      <Toolbar>
        <BookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography variant='h5'>UNIBOOK</Typography>
        <Stack flexGrow={1}></Stack>
        <IconButton onClick={handleClick}>
          <PersonIcon color="disabled" />
        </IconButton>
        <Typography>user name</Typography>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>アカウント管理</MenuItem>
          <MenuItem onClick={handleClose}>サインアウト</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default TitleBar
