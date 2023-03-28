import React from 'react'
import styled from '@emotion/styled'
import { useNavigate, useLocation } from 'react-router-dom'
import { Auth } from "aws-amplify"

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { useForm } from 'react-hook-form'
import LogoImg from '../../../etc/unibook.png'

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
  const location = useLocation()
  const name = location.state
  const { register, handleSubmit, watch, formState: { errors } } = useForm()

  const _newPassword = async (event) => {
    try {
      await Auth.forgotPasswordSubmit(name.user_name, event.authcode, event.confirmPassword)
      alert('パスワードを変更しました。')
      navigate('/books')
    } catch (error) {
      alert('認証に失敗しました。もう一度認証コードをご確認ください。')
    }
  }

  const signIn = () => {
    navigate('/books')
  }

  const onSubmit = handleSubmit(_newPassword)

  const navigate = useNavigate()

  const newPassword = watch('new')


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
            error={!!errors.new}
            helperText={errors.new && '新しいパスワードを入力してください。'}
            {...register('new', {
              required: true
            })}
          />
          <TextField
            fullWidth
            label='新しいパスワード(確認用)'
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
                value === newPassword || 'パスワードが一致しません。'
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
