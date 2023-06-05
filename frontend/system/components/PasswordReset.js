import React from 'react'
import { css } from '@emotion/react'
import { Auth } from "aws-amplify"
import { useForm } from 'react-hook-form'

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

const PasswordReset = () => {
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
  const { setAlertInfo } = useLoginState()
  const { handleSubmit, control } = useForm({
    defaultValues: {
      user_name: ''
    }
  })

  const toSignIn = useLoginState((state) => state.toSignIn)
  const newPassword = useLoginState((state) => state.newPassword)

  const _passwordReset = async (event) => {
    try {
      await Auth.forgotPassword(event.user_name)
      newPassword(event)
    } catch (error) {
      setAlertInfo({
        display: true,
        message: 'ユーザ名が見つかりませんでした。正しいユーザ名を入力してください。',
        variant: 'error'
      })
    }
  }

  const onSubmit = handleSubmit(_passwordReset)

  return (
    <Stack css={layoutCss}>
      <img src={LogoImg} css={titleCss} />
      <Box css={formCss} onSubmit={onSubmit}>
        <Stack component='form' mb={2} spacing={2}>
          <Typography variant='h5'>
            パスワードを忘れた
          </Typography>
          <Typography variant='caption'>
            登録したユーザ名を入力してください。
          </Typography>
          <HookFormField
            type='text'
            label='ユーザ名'
            name='user_name'
            rules={{ required: 'ユーザ名を入力してください。' }}
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
              送信
            </Button>
          </Box>
        </Stack>
      </Box>
    </Stack>
  )
}

export default PasswordReset
