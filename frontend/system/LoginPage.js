import React from 'react'
import styled from '@emotion/styled'
import { useNavigate } from 'react-router-dom'

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
  const { register, handleSubmit, formState: { errors } } = useForm()

  const _login = (data) => {
    console.log(data)
  }

  const onSubmit = handleSubmit(_login)

  const navigate = useNavigate()

  const moveHome = () => {
    navigate('/books/home')
  }

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
            error={!!errors.password}
            helperText={errors.password ? 'パスワードを入力してください。' : ''}
            {...register('password', {
              // required: true
            })}
          />
          <Box mt={1}>
            <Button
              type='submit'
              onClick={moveHome}
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
