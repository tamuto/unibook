import React from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Auth } from 'aws-amplify'

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { useForm } from 'react-hook-form'
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

const SignUp = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const _signUp = async (event) => {
    console.log(event)
    navigate('/books/signup/account/check', { state: event })
  }

  const signIn = () => {
    navigate('/books')
  }

  const onSubmit = handleSubmit(_signUp)

  const navigate = useNavigate()

  const username = watch('user_name')
  const email = watch('email')
  const password = watch('password')


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
            error={!!errors.email}
            helperText={errors.email ? 'メールアドレスを入力してください。' : ''}
            {...register('email', {
              required: true
            })}
          />
          <TextField
            fullWidth
            label='パスワード'
            type='password'
            error={!!errors.password && true}
            helperText={errors.password && 'パスワードを入力してください。'}
            {...register('password', {
              required: true
            })}
          />
          <TextField
            fullWidth
            label='パスワード(確認用)'
            type='password'
            error={!!errors.confirmPassword && true}
            helperText={
              errors.confirmPassword
                ? 'パスワードが一致しません。'
                : ''
            }
            {...register('confirmPassword', {
              required: true,
              validate: (value) =>
                value === password || 'パスワードが一致しません。'
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
