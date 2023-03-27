import React from 'react'
import styled from '@emotion/styled'
import { useNavigate, useLocation } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import {
  Box,
  Button,
  Stack,
  Typography
} from '@mui/material'

import LogoImg from '../../../dist/unibook.png'


const LoginBox = styled(Stack)`
  display: flex;
  align-items: center;
`
const LoginForm = styled(Box)`
  width: 500px;
  background-color: white;
  border: solid 1px lightgrey;
  border-radius: 5px;
  padding: 15px;
  margin: auto;
`

const AccountInfoCheck = () => {
  const navigate = useNavigate()
  const location = useLocation()
  const event = location.state
  console.log(event)

  const signIn = () => {
    navigate('/books')
  }

  const handleSignUp = async (data) => {
    console.log(data)
    try {
      const result = await Auth.signUp({
        username: data.user_name,
        password: data.confirmPassword,
        attributes: {
          email: data.email
        }
      })
      console.log(result)
    } catch (error) {
      console.log(error)
      alert('サインアップ失敗')
    }
    console.log('登録確認画面へ', data)
    navigate('/books/signup/confirmed', { state: data })
  }

  return (
    <LoginBox>
      <img src={LogoImg} width="500" style={{ marginBottom: '20px', marginTop: '20px' }} />
      <LoginForm>
        <Stack component='form' mb={2} spacing={2}>
          <Typography variant='h5'>
            サインアップ
          </Typography>
          <Typography>
            以下の情報で登録してよろしいですか？
          </Typography>
          <Stack direction='row'>
            <Typography style={{ width: '200px' }} fontWeight='bold'>
              ID:
            </Typography>
            <Typography fontWeight='bold'>
              {event.user_name}
            </Typography>
          </Stack>
          <Stack direction='row' fontWeight='bold'>
            <Typography style={{ width: '200px' }} fontWeight='bold'>
              メールアドレス:
            </Typography>
            <Typography fontWeight='bold'>
              {event.email}
            </Typography>
          </Stack>
          <Stack direction='row'>
            <Typography style={{ width: '200px' }} fontWeight='bold'>
              パスワード:
            </Typography>
            <Typography fontWeight='bold'>
              {event.password.split('').map((char, index) => (
                char === ' ' ? <span key={index}>&nbsp;</span> : <span key={index}>*</span>
              ))}
            </Typography>
          </Stack>
          <Box mt={3}>
            <Button
              variant='text'
              onClick={signIn}
            >
              サインインに戻る
            </Button>
            <Button
              variant='contained'
              sx={{ float: 'right' }}
              onClick={() => handleSignUp(event)}
            >
              アカウント作成
            </Button>
          </Box>
        </Stack>
      </LoginForm>
    </LoginBox>
  )
}
export default AccountInfoCheck
