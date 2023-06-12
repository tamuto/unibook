import React from 'react'
import { css } from '@emotion/react'
import { Auth } from 'aws-amplify'
import { useForm } from 'react-hook-form'
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

const Confirmed = () => {
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
  const { userInfo } = useLoginState()
  const toSignIn = useLoginState((state) => state.toSignIn)
  const { handleSubmit, control } = useForm({
    defaultValues: {
      user_name: '',
      authcode: ''
    }
  })

  const _confirmed = async (event) => {
    try {
      await Auth.confirmSignUp(userInfo.user_name, event.authcode)
      enqueueSnackbar('アカウントを登録しました。', { variant: 'success' })
      toSignIn()
    } catch (error) {
      enqueueSnackbar('認証に失敗しました。もう一度認証コードをご確認ください。', { variant: 'error' })
    }
  }

  const resendSignUp = async () => {
    try {
      await Auth.resendSignUp(userInfo.user_name)
      enqueueSnackbar('本人認証メールを再送しました。', { variant: 'info' })
    } catch (error) {
    }
  }

  const onSubmit = handleSubmit(_confirmed)

  return (
    <Stack css={layoutCss}>
      <img src={LogoImg} width="500" css={titleCss} />
      <Box css={formCss} onSubmit={onSubmit}>
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
          <HookFormField
            label='ユーザ名'
            type='text'
            name='user_name'
            value={userInfo.user_name}
            control={control}
            readonly
          />
          <HookFormField
            type='text'
            label='検証コード'
            name='authcode'
            rules={{ required: '検証コードを入力してください。' }}
            control={control}
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
      </Box>
    </Stack>
  )
}

export default Confirmed
