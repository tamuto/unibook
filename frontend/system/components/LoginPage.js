import React, { useContext } from 'react'
import { Amplify, Auth } from 'aws-amplify'
import { AuthContext } from '../../main'
import { useForm } from 'react-hook-form'
import styled from '@emotion/styled'

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import LogoImg from '../../../etc/unibook.png'
import environ from '~/environ.json'
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

const LoginPage = () => {
  Amplify.configure(environ.AwsConfig)
  const { register, handleSubmit, formState: { errors } } = useForm()

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  const toSignIn = useLoginState((state) => state.toSignIn)
  const init = useLoginState((state) => state.init)
  const signUp = useLoginState((state) => state.signUp)
  const passwordReset = useLoginState((state) => state.passwordReset)

  const _signIn = async (event) => {
    try {
      await Auth.signIn(event.user_name, event.password)
      setIsLoggedIn(true)
      init()
    } catch (error) {
      alert('サインインに失敗しました。もう一度サインインしてください。')
      toSignIn()
    }
  }

  const onSubmit = handleSubmit(_signIn)


  return (
    <LoginBox>
      <img src={LogoImg} width="500" style={{ marginBottom: '20px', marginTop: '20px' }} />
      <LoginForm onSubmit={onSubmit}>
        <Stack component='form' mb={2} spacing={2}>
          <Typography variant='h5'>
            サインイン
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
              type='submit'
              variant='contained'
              fullWidth
            >
              サインイン
            </Button>
            <Button
              size='small'
              variant='text'
              onClick={passwordReset}
            >パスワードを忘れましたか？
            </Button>
          </Box>
        </Stack>
      </LoginForm>
      <Box mt={1} sx={{ textAlign: 'center' }}>
        <Typography variant='caption' display='block'>
          アカウントを持っていますか？
        </Typography>
        <Button
          size='small'
          variant='text'
          onClick={signUp}
        >アカウントを作成
        </Button>
      </Box>
    </LoginBox >
  )
}

export default LoginPage
