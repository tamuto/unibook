import React from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'
import { Amplify, Auth } from 'aws-amplify'
import environ from '~/environ.json'

import {
  Box,
  Button,
  Stack,
  TextField
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

const LoginPage = () => {
  // Amplifyを初期化
  Amplify.configure(environ.AwsConfig)
  console.log(environ.AwsConfig)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const _signIn = async (event) => {
    try {
      const result = await Auth.signIn(event.user_name, event.password)
      console.log('ログイン成功', result)
      navigate('/books/home')
    } catch (error) {
      console.log('ログイン失敗', error)
      alert('ログイン失敗')
    }
  }

  const onSubmit = handleSubmit(_signIn)

  const navigate = useNavigate()


  return (
    <LoginBox  >
      <img src={LogoImg} width="500" style={{ marginBottom: '20px', marginTop: '20px' }} />
      <LoginForm onSubmit={onSubmit}>
        <Stack component='form' mb={2} spacing={2}>
          <TextField
            fullWidth
            label='ID'
            error={!!errors.user_name}
            helperText={errors.user_name ? 'IDを入力してください。' : ''}
            {...register('user_name', {
              // required: true
            })}
          />
          <TextField
            fullWidth
            label='パスワード'
            type='password'
            error={!!errors.password}
            helperText={errors.password ? 'パスワードを入力してください。' : ''}
            {...register('password', {
              // required: true
            })}
          />
          <Box mt={1}>
            <Button
              type='submit'
            >
              サインイン
            </Button>
          </Box>
        </Stack>
      </LoginForm>
    </LoginBox>
  )
}

export default LoginPage
