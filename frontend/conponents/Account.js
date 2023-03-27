import React from 'react'
import {
  Stack,
  Typography,
  Button,
  Box
} from '@mui/material'
import HeadBox from '../conponents/Header'
import { useNavigate } from 'react-router-dom'
import { Auth } from "aws-amplify"
import { useState, useEffect } from 'react'


const Account = () => {
  const [userSession, setUserSession] = useState('')
  const navigate = useNavigate()
  const moveBack = () => {
    navigate(-1)
  }

  const changePassword = () => {
    navigate('/books/account/password')
  }

  useEffect(() => {
    const getCurrentSession = async () => {
      try {
        const session = await Auth.currentSession()
        const user = await Auth.currentUserInfo()
        setUserSession(user)
        console.log(user)
      } catch (error) {
        console.log('セッション取得エラー:', error)
      }
    }

    getCurrentSession()
  }, [])

  return (
    <>
      <Stack component='form' spacing={2} >
        <HeadBox direction='row'>
          アカウント管理
          <Stack flexGrow={1}></Stack>
          <Button color='tertiary' onClick={moveBack}>
            戻る
          </Button>
        </HeadBox>
        <Stack
          direction='row'
          spacing={2}
          sx={{
            padding: '15px'
          }}>
          <Stack flexGrow={1}></Stack>
        </Stack>
        <Box bgcolor='white' padding={3}>
          <Stack direction='row'>
            <Typography style={{ width: '200px' }} fontWeight='bold'>
              ID:
            </Typography>
            <Typography fontWeight='bold'>
              {userSession?.username}
            </Typography>
          </Stack>
          <Stack direction='row'>
            <Typography style={{ width: '200px' }} fontWeight='bold'>
              メールアドレス:
            </Typography>
            <Typography fontWeight='bold'>
              {userSession?.attributes?.email}
            </Typography>
          </Stack>
        </Box>
        <Button
          style={{ width: '150px' }}
          color='secondary'
          onClick={changePassword}>
          パスワード変更
        </Button>
      </Stack>
    </>
  )
}
export default Account
