import React from 'react'
import styled from '@emotion/styled'
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

const AccountInfo = styled(Box)`
  background-color: white;
  padding: 15px;
  margin: auto;
`

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
        await Auth.currentSession()
        const user = await Auth.currentUserInfo()
        setUserSession(user)
      } catch (error) {
      }
    }

    getCurrentSession()
  }, [])

  return (
    <>
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
      <AccountInfo>
        <Stack spacing={2}>
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
          <Stack direction='row'>
            <Typography style={{ width: '200px' }} fontWeight='bold'>
              サブID:
            </Typography>
            <Typography fontWeight='bold'>
              {userSession?.attributes?.sub}
            </Typography>
          </Stack>
          <Button
            style={{ width: '150px' }}
            color='secondary'
            onClick={changePassword}>
            パスワード変更
          </Button>
        </Stack>
      </AccountInfo>
    </>
  )
}
export default Account
