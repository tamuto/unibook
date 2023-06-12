import React from 'react'
import { useForm } from 'react-hook-form'
import { css } from '@emotion/react'
import { Auth } from 'aws-amplify'
import { enqueueSnackbar } from 'notistack'

import {
  Box,
  Button,
  Stack,
  Typography
} from '@mui/material'

import LogoImg from '../../../etc/unibook.png'
import useLoginState from '~/system/api/useLoginState'
import useMediaQuery from '~/api/useMediaQuery'

import HookFormField from 'github://tamuto/uilib/components/form/HookFormField.js'


const AccountInfoCheck = () => {
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

  const { control } = useForm({
    defaultValues: {
      user_name: '',
      email: '',
      password: ''
    }
  })

  const { userInfo } = useLoginState()
  const signUp = useLoginState((state) => state.signUp)
  const confirmed = useLoginState((state) => state.confirmed)
  const handleSignUp = async (data) => {
    try {
      await Auth.signUp({
        username: data.user_name,
        password: data.password,
        attributes: {
          email: data.email
        }
      })
      confirmed(data)
    } catch (error) {
      enqueueSnackbar('アカウントを登録できませんでした。サインアップ画面に移動します。', { variant: 'error' })
      toSignIn()
    }
  }

  return (
    <Stack css={layoutCss}>
      <img src={LogoImg} css={titleCss} />
      <Box css={formCss}>
        <Stack component='form' mb={2} spacing={2}>
          <Typography variant='h5'>
            サインアップ
          </Typography>
          <Typography>
            以下の情報で登録してよろしいですか？
          </Typography>
          <HookFormField
            label='ユーザ名'
            type='text'
            name='user_name'
            value={userInfo.user_name}
            control={control}
            readonly
          />
          <HookFormField
            label='メールアドレス'
            type='text'
            name='email'
            value={userInfo.email}
            control={control}
            readonly
          />
          <HookFormField
            label='パスワード'
            type='password'
            name='password'
            value={userInfo.password}
            control={control}
            readonly
          />
        </Stack>
        <Box mt={3}>
          <Button
            variant='text'
            onClick={() => signUp(userInfo)}
          >
            サインアップに戻る
          </Button>
          <Button
            variant='contained'
            sx={{ float: 'right' }}
            onClick={() => handleSignUp(userInfo)}
          >
            アカウント作成
          </Button>
        </Box>
      </Box>
    </Stack >
  )
}
export default AccountInfoCheck
