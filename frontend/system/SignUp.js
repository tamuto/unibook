import React from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { useForm } from 'react-hook-form'
import LogoImg from '../../dist/unibook.png'

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

const SignUp = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()

  const _signUp = async () => {
    console.log('登録成功')
    navigate('/books')
  }

  const signIn = () => {
    navigate('/books')
  }

  const onSubmit = handleSubmit(_signUp)

  const navigate = useNavigate()


  return (
    <LoginBox>
      <img src={LogoImg} width="500" style={{ marginBottom: '20px', marginTop: '20px' }} />
      <LoginForm onSubmit={onSubmit}>
        <Stack component='form' mb={2} spacing={2}>
          <Typography variant='h5'>
            サインアップ
          </Typography>
          <TextField
            fullWidth
            label='ID'
            error={!!errors.user_name}
            helperText={errors.user_name ? 'IDを入力してください。' : ''}
            {...register('user_name', {
              required: true
            })}
          />
          <TextField
            fullWidth
            label='メールアドレス'
            error={!!errors.mail_address}
            helperText={errors.mail_address ? 'メールアドレスを入力してください。' : ''}
            {...register('mail_address', {
              required: true
            })}
          />
          <TextField
            fullWidth
            label='パスワード'
            type='password'
            error={!!errors.password}
            helperText={errors.password ? 'パスワードを入力してください。' : ''}
            {...register('password', {
              required: true
            })}
          />
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
              type='submit'
            >
              アカウント作成
            </Button>
          </Box>
        </Stack>
      </LoginForm>
    </LoginBox>
  )
}

export default SignUp