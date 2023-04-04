import React, { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'

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
import { AuthContext } from '../main'

const TitleBar = () => {
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState(null)
  const { isLoggedIn, setIsLoggedIn, user, setUser } = useContext(AuthContext)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = async () => {
    try {
      handleClose()
      await Auth.signOut()
      setIsLoggedIn(false)
      navigate('/books')
    } catch (error) {
    }
  }

  const moveAccount = () => {
    navigate('/books/account/info')
  }

  useEffect(() => {
    const checkUser = async () => {
      try {
        await Auth.currentSession()
        const currentUser = await Auth.currentAuthenticatedUser()
        setUser(currentUser)
        setIsLoggedIn(true)
      } catch (err) {
        setIsLoggedIn(false)
        setUser(null)
      }
    }
    checkUser()
  }, [])

  return (
    <AppBar>
      <Toolbar>
        <BookIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
        <Typography variant='h5'>UNIBOOK</Typography>
        <Stack flexGrow={1}></Stack>
        {isLoggedIn &&
          <>
            <IconButton onClick={handleClick}>
              <PersonIcon color="disabled" />
            </IconButton>
            <Typography>{user.username}</Typography>
          </>
        }
        {
          anchorEl &&
          <Menu
            anchorEl={anchorEl}
            open={true}
            onClose={handleClose}
          >
            <MenuItem onClick={moveAccount}>アカウント管理</MenuItem>
            <MenuItem onClick={handleSignOut}>サインアウト</MenuItem>
          </Menu>
        }
      </Toolbar>
    </AppBar >
  )
}

export default TitleBar
