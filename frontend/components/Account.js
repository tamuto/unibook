import React from 'react'
import { useForm } from 'react-hook-form'
import { css } from '@emotion/react'
import {
  Stack,
  Button,
  Box
} from '@mui/material'
import HeadBox from '../components/Header'
import { useNavigate } from 'react-router-dom'
import { Auth } from "aws-amplify"
import { useState, useEffect } from 'react'

import useMediaQuery from '~/api/useMediaQuery'
import HookFormField from 'github://tamuto/uilib/components/form/HookFormField.js'

const Account = () => {
  const mobile = useMediaQuery(state => state.mobile)
  const [userSession, setUserSession] = useState('')

  const layoutCss = css`
    background-color: white;
    padding: 15px;
    margin: auto;
    ${mobile} {
      width: calc(95% - 5px);
    }
  `

  const { control } = useForm({
    defaultValues: {
      username: userSession?.username || '',
      email: userSession?.attributes?.email || '',
      sub: userSession?.attributes?.sub || '',
    },
  })

  const navigate = useNavigate()
  const moveBack = () => {
    navigate(-1)
  }

  const changePassword = () => {
    navigate('/books/account/password')
  }


  useEffect(() => {
    const getCurrentSession = async () => {
      try {
        await Auth.currentSession()
        const user = await Auth.currentUserInfo()
        setUserSession(user)
      } catch (error) {
      }
    }

    getCurrentSession()
  }, [])

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
      <Box css={layoutCss}>
        <Stack component='form' mb={2} spacing={2}>
          <HookFormField
            label='ユーザ名'
            type='text'
            name='username'
            value={userSession?.username || ''}
            control={control}
            readonly
          />
          <HookFormField
            label='メールアドレス'
            type='text'
            name='email'
            value={userSession?.attributes?.email || ''}
            control={control}
            readonly
          />
          <HookFormField
            label='リンクID'
            type='text'
            name='sub'
            value={userSession?.attributes?.sub || ''}
            control={control}
            readonly
          />
          <Button
            style={{ width: '150px' }}
            color='secondary'
            onClick={changePassword}>
            パスワード変更
          </Button>
        </Stack>
      </Box>
    </>
  )
}
export default Account
