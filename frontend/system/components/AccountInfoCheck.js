import React from 'react'
import styled from '@emotion/styled'
import { Auth } from 'aws-amplify'

import {
  Box,
  Button,
  Stack,
  Typography
} from '@mui/material'

import LogoImg from '../../../etc/unibook.png'
import useLoginState from '~/system/api/useLoginState'


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
  const { userInfo } = useLoginState()
  const toSignIn = useLoginState((state) => state.toSignIn)
  const confirmed = useLoginState((state) => state.confirmed)
  const handleSignUp = async (data) => {
    try {
      await Auth.signUp({
        username: data.user_name,
        password: data.confirmPassword,
        attributes: {
          email: data.email
        }
      })
      confirmed(data)
    } catch (error) {
      alert('アカウントを登録できませんでした。サインアップ画面に移動します。')
      toSignIn()
    }
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
              {userInfo.user_name}
            </Typography>
          </Stack>
          <Stack direction='row' fontWeight='bold'>
            <Typography style={{ width: '200px' }} fontWeight='bold'>
              メールアドレス:
            </Typography>
            <Typography fontWeight='bold'>
              {userInfo.email}
            </Typography>
          </Stack>
          <Stack direction='row'>
            <Typography style={{ width: '200px' }} fontWeight='bold'>
              パスワード:
            </Typography>
            <Typography fontWeight='bold'>
              {userInfo.password.split('').map((char, index) => (
                char === ' ' ? <span key={index}>&nbsp;</span> : <span key={index}>*</span>
              ))}
            </Typography>
          </Stack>
          <Box mt={3}>
            <Button
              variant='text'
              onClick={toSignIn}
            >
              サインインに戻る
            </Button>
            <Button
              variant='contained'
              sx={{ float: 'right' }}
              onClick={() => handleSignUp(userInfo)}
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
