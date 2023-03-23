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

  const _reset = async () => {
    console.log('登録成功')
    navigate('/books')
  }

  const signIn = () => {
    navigate('/books')
  }

  const onSubmit = handleSubmit(_reset)

  const navigate = useNavigate()


  return (
    <LoginBox>
      <img src={LogoImg} width="500" style={{ marginBottom: '20px', marginTop: '20px' }} />
      <LoginForm onSubmit={onSubmit}>
        <Stack component='form' mb={2} spacing={2}>
          <Typography variant='h5'>
            パスワードを忘れた
          </Typography>
          <Typography variant='subtitle1' style={{ fontWeight: 'bold' }} >
            本人認証メールを送信しました。
          </Typography>
          <Typography variant='caption'>
            メール記載の検証コードと新しいパスワードを入力してください。
          </Typography>
          <TextField
            fullWidth
            label='検証コード'
            error={!!errors.authcode}
            helperText={errors.authcode ? '検証コードを入力してください。' : ''}
            {...register('authcode', {
              required: true
            })}
          />
          <TextField
            fullWidth
            label='新しいパスワード'
            type='password'
            error={!!errors.password}
            helperText={errors.password ? '新しいパスワードを入力してください。' : ''}
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
              送信
            </Button>
          </Box>
        </Stack>
      </LoginForm>
    </LoginBox>
  )
}

export default SignUp
