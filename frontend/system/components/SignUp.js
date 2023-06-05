import React from 'react'
import { useForm } from 'react-hook-form'
import { css } from '@emotion/react'

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

const SignUp = () => {
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

  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      user_name: '',
      email: '',
      password: '',
      confirm: ''
    }
  })

  const accountInfoCheck = useLoginState((state) => state.accountInfoCheck)

  const _signUp = async (event) => {
    accountInfoCheck(event)
  }

  const toSignIn = useLoginState((state) => state.toSignIn)

  const onSubmit = handleSubmit(_signUp)

  return (
    <Stack css={layoutCss}>
      <img src={LogoImg} css={titleCss} />
      <Box css={formCss} onSubmit={onSubmit}>
        <Stack component='form' mb={2} spacing={2}>
          <Typography variant='h5'>
            サインアップ
          </Typography>
          <HookFormField
            type='text'
            label='ユーザ名'
            name='user_name'
            rules={{ required: 'ユーザ名を入力してください。' }}
            control={control}
          />
          <HookFormField
            type='text'
            label='メールアドレス'
            name='email'
            rules={{ required: 'メールアドレスを入力してください。' }}
            control={control}
          />
          <HookFormField
            type='password'
            label='パスワード'
            name='password'
            rules={{ required: 'パスワードを入力してください。' }}
            control={control}
          />
          <HookFormField
            type='password'
            label='パスワード(確認用)'
            name='confirm'
            rules={{
              required: 'パスワード（確認用）を入力してください。',
              validate: (value) =>
                value === getValues('password') || 'パスワードが一致しません。'
            }}
            control={control}
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
              アカウント作成
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}
export default SignUp
