import React from 'react'
import styled from '@emotion/styled'
import { Auth } from "aws-amplify"
import { useForm } from 'react-hook-form'

import {
  Box,
  Button,
  Stack,
  TextField,
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

const PasswordReset = () => {
  const { setAlertInfo } = useLoginState()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const toSignIn = useLoginState((state) => state.toSignIn)
  const newPassword = useLoginState((state) => state.newPassword)

  const _passwordReset = async (event) => {
    try {
      await Auth.forgotPassword(event.user_name)
      newPassword(event)
    } catch (error) {
      setAlertInfo({
        display: true,
        message: 'IDが見つかりませんでした。正しいIDを入力してください。',
        variant: 'error'
      })
    }
  }

  const onSubmit = handleSubmit(_passwordReset)

  return (
    <LoginBox>
      <Stack direction='row'>
        <img src={LogoImg} width="500" style={{ marginBottom: '20px', marginTop: '20px' }} />
      </Stack>
      <LoginForm onSubmit={onSubmit}>
        <Stack component='form' mb={2} spacing={2}>
          <Typography variant='h5'>
            パスワードを忘れた
          </Typography>
          <Typography variant='caption'>
            登録したIDを入力してください。
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

export default PasswordReset
