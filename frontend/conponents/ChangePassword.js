import React from 'react'
import styled from '@emotion/styled'
import {
  Box,
  Button,
  Stack,
  TextField
} from '@mui/material'
import HeadBox from '../conponents/Header'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Auth } from "aws-amplify"

const InputForm = styled(Box)`
  background-color: white;
  padding: 15px;
  margin: auto;
`

const ChangePassword = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const moveBack = () => {
    navigate(-1)
  }

  const _changePassword = async (event) => {
    try {
      const user = await Auth.currentAuthenticatedUser()
      await Auth.changePassword(
        user,
        event.current,
        event.confirmPassword
      )
      alert('パスワードを変更しました。')
      navigate('/books/account')
    } catch (error) {
      alert('パスワードを変更できませんでした。')
    }
  }

  const onSubmit = handleSubmit(_changePassword)

  const newPassword = watch('new')


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
      <InputForm onSubmit={onSubmit}>
        <Stack component='form' mb={2} spacing={2}>
          <TextField
            fullWidth
            label='現在のパスワード'
            type='password'
            error={!!errors.current}
            helperText={errors.current ? '現在のパスワードを入力してください。' : ''}
            {...register('current', {
              required: true
            })}
          />
          <TextField
            fullWidth
            label='新しいパスワード'
            type='password'
            error={!!errors.new && true}
            helperText={errors.new && '新しいパスワードを入力してください。'}
            {...register('new', {
              required: true
            })}
          />
          <TextField
            fullWidth
            label='新しいパスワード(確認用)'
            type='password'
            error={!!errors.confirmPassword && true}
            helperText={
              errors.confirmPassword
                ? 'パスワードが一致しません。'
                : ''
            }
            {...register('confirmPassword', {
              required: true,
              validate: (value) =>
                value === newPassword || 'パスワードが一致しません。'
            })}
          />
          <Button
            style={{ width: '150px' }}
            color='secondary'
            type='submit'
          >
            パスワード変更
          </Button>
        </Stack>
      </InputForm>
    </>
  )
}
export default ChangePassword
