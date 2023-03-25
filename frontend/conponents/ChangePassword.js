import React from 'react'
import {
  Stack,
  TextField,
  Button
} from '@mui/material'
import HeadBox from '../conponents/Header'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { Auth } from "aws-amplify"


const ChangePassword = () => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const navigate = useNavigate()

  const moveBack = () => {
    navigate(-1)
  }

  const _changePassword = async (event) => {
    console.log(event)
    try {
      const user = await Auth.currentAuthenticatedUser()
      console.log(user)
      const result = await Auth.changePassword(
        user,
        event.current,
        event.new
      )
      console.log(result)
    } catch (error) {
      console.log(error)
      alert(error.message)
    }

    console.log(event)
    navigate('/books/account')
  }

  const onSubmit = handleSubmit(_changePassword)


  return (
    <>
      <Stack component='form' spacing={2} onSubmit={onSubmit} >
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
        <Stack spacing={2}>
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
            error={!!errors.new}
            helperText={errors.new ? '新しいパスワードを入力してください。' : ''}
            {...register('new', {
              required: true
            })}
          />
          <Button
            variant='contained'
            type='submit'
          >
            パスワード変更
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
export default ChangePassword
