import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import { Auth } from "aws-amplify"
import { enqueueSnackbar } from 'notistack'
import {
  Box,
  Button,
  Stack
} from '@mui/material'
import HeadBox from '~/components/Header'
import useMediaQuery from '~/api/useMediaQuery'

import HookFormField from 'github://tamuto/uilib/components/form/HookFormField.js'

const ChangeMailAddress = () => {
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

  const { handleSubmit, control } = useForm({
    defaultValues: {
      email: userSession?.attributes?.email || ''
    }
  })

  const navigate = useNavigate()

  const moveBack = () => {
    navigate(-1)
  }

  const _changeMail = async (email) => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log(user)
      await Auth.updateUserAttributes(user, email)
      enqueueSnackbar('メールアドレスを変更しました。', { variant: 'success' })
      navigate('/books/account/info')
    } catch (error) {
      console.log(error)
      enqueueSnackbar('メールアドレスを変更できませんでした。', { variant: 'error' })
    }
  }

  const onSubmit = handleSubmit(_changeMail)

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
      <Box css={layoutCss} onSubmit={onSubmit}>
        <Stack component='form' mb={2} spacing={2}>
          <HookFormField
            type='text'
            label='メールアドレス'
            name='email'
            rules={{ required: 'メールアドレスを入力してください。' }}
            control={control}
          />
          <Button
            style={{ width: '170px' }}
            color='secondary'
            type='submit'
          >
            メールアドレス変更
          </Button>
        </Stack>
      </Box>
    </>
  )
}
export default ChangeMailAddress
