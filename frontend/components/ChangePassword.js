import React from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { Auth } from "aws-amplify"
import {
  Box,
  Button,
  Stack
} from '@mui/material'
import HeadBox from '~/components/Header'
import useMediaQuery from '~/api/useMediaQuery'

import HookFormField from 'github://tamuto/uilib/components/form/HookFormField.js'

const ChangePassword = () => {
  const mobile = useMediaQuery(state => state.mobile)

  const layoutCss = css`
    background-color: white;
    padding: 15px;
    margin: auto;
    ${mobile} {
      width: calc(95% - 5px);
    }
  `

  const { handleSubmit, control, getValues } = useForm({
    defaultValues: {
      current_pwd: '',
      new_pwd: '',
      confirm_pwd: ''
    }
  })

  const navigate = useNavigate()

  const moveBack = () => {
    navigate(-1)
  }

  const _changePassword = async (event) => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.changePassword(
        user,
        event.current_pwd,
        event.confirm_pwd
      )
      alert('パスワードを変更しました。')
      navigate('/books/account/info')
    } catch (error) {
      alert('パスワードを変更できませんでした。')
    }
  }

  const onSubmit = handleSubmit(_changePassword)

  return (
    <>
      <HeadBox direction='row'>
        アカウント管理
        <Stack flexGrow={1}></Stack>
        <Button color='tertiary' onClick={moveBack}>
          戻る
        </Button>
      </HeadBox>
      <Stack
        direction='row'
        spacing={2}
        sx={{
          padding: '15px'
        }}>
        <Stack flexGrow={1}></Stack>
      </Stack>
      <Box css={layoutCss} onSubmit={onSubmit}>
        <Stack component='form' mb={2} spacing={2}>
          <HookFormField
            type='password'
            label='現在のパスワード'
            name='current_pwd'
            rules={{ required: '現在のパスワードを入力してください。' }}
            control={control}
          />
          <HookFormField
            type='password'
            label='新しいパスワード'
            name='new_pwd'
            rules={{ required: '新しいパスワードを入力してください。' }}
            control={control}
          />
          <HookFormField
            type='password'
            label='新しいパスワード(確認用)'
            name='confirm_pwd'
            rules={{
              required: '新しいパスワード（確認用）を入力してください。',
              validate: (value) =>
                value === getValues('new_pwd') || 'パスワードが一致しません。'
            }}
            control={control}
          />
          <Button
            style={{ width: '150px' }}
            color='secondary'
            type='submit'
          >
            パスワード変更
          </Button>
        </Stack>
      </Box>
    </>
  )
}
export default ChangePassword
