import React from 'react'
import styled from '@emotion/styled'
import { useNavigate, useLocation } from 'react-router-dom'
import { Auth } from 'aws-amplify'

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

const Confirmed = () => {
  const location = useLocation()
  const event = location.state
  console.log(event)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const _confirmed = async (event) => {
    console.log(event)
    try {
      const result = await Auth.confirmSignUp(event.user_name, event.authcode)
      console.log(result, '認証に成功しました。')
    } catch (error) {
      console.log(error)
      alert(error.message)
      console.log('確認OK')
    }
    navigate('/books')
  }

  const resendSignUp = async () => {
    try {
      const result = await Auth.resendSignUp(event.user_name);
      console.log(result);
    } catch (error) {
      console.log(error);
      alert(error.message);
    }
  }

  const onSubmit = handleSubmit(_confirmed)

  const navigate = useNavigate()


  return (
    <LoginBox>
      <img src={LogoImg} width="500" style={{ marginBottom: '20px', marginTop: '20px' }} />
      <LoginForm onSubmit={onSubmit}>
        <Stack component='form' mb={2} spacing={2}>
          <Typography variant='h5'>
            サインアップ
          </Typography>
          <Typography variant='subtitle1' style={{ fontWeight: 'bold' }} >
            本人認証メールを送信しました。
          </Typography>
          <Typography variant='caption'>
            IDとメール記載の検証コードを入力してください。
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
            label='検証コード'
            error={!!errors.authcode}
            helperText={errors.authcode ? '検証コードを入力してください。' : ''}
            {...register('authcode', {
              required: true
            })}
          />
          <Box mt={3}>
            <Button
              size='small'
              variant='text'
              onClick={resendSignUp}
            >検証コードを再送する。
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

export default Confirmed
