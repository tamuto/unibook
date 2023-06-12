import { useContext } from 'react'
import { Amplify, Auth } from 'aws-amplify'
import { AuthContext } from '../../main'
import { useForm } from 'react-hook-form'
import { css } from '@emotion/react'
import { enqueueSnackbar } from 'notistack'

import {
  Box,
  Button,
  Stack,
  Typography
} from '@mui/material'

import LogoImg from '../../../etc/unibook.png'
import environ from '~/environ.json'
import useLoginState from '~/system/api/useLoginState'
import useMediaQuery from '~/api/useMediaQuery'

import HookFormField from 'github://tamuto/uilib/components/form/HookFormField.js'

const LoginPage = () => {
  const mobile = useMediaQuery(state => state.mobile)

  const layoutCss = css`
    display: flex;
    align-items: center;
  `

  const titleCss = css`
    width: 500px;
    margin-top: 20px;
    margin-bottom: 20px;
    ${mobile} {
      width: calc(75%);
      max-width: 350px;
    }
  `

  const formCss = css`
    width: 500px;
    background-color: white;
    border: solid 1px lightgrey;
    border-radius: 5px;
    padding: 15px;
    margin: auto;
    ${mobile} {
      width: calc(95% - 5px);
    }
  `

  Amplify.configure(environ.AwsConfig)
  const { handleSubmit, control } = useForm({
    defaultValues: {
      user_name: '',
      password: ''
    }
  })

  const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext)

  const init = useLoginState((state) => state.init)
  const signUp = useLoginState((state) => state.signUp)
  const passwordReset = useLoginState((state) => state.passwordReset)

  const _signIn = async (event) => {
    try {
      await Auth.signIn(event.user_name, event.password)
      setIsLoggedIn(true)
      init()
    } catch (error) {
      enqueueSnackbar('サインインに失敗しました。もう一度サインインしてください。', { variant: 'error' })
    }
  }

  const onSubmit = handleSubmit(_signIn)


  return (
    <Stack css={layoutCss}>
      <img src={LogoImg} css={titleCss} />
      <Box css={formCss} onSubmit={onSubmit}>
        <Stack component='form' mb={2} spacing={2}>
          <Typography variant='h5'>
            サインイン
          </Typography>
          <HookFormField
            type='text'
            label='ユーザ名'
            name='user_name'
            rules={{ required: 'ユーザ名を入力してください。' }}
            control={control}
          />
          <HookFormField
            type='password'
            label='パスワード'
            name='password'
            rules={{ required: 'パスワードを入力してください。' }}
            control={control}
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
      </Box>
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
    </Stack>
  )
}

export default LoginPage
