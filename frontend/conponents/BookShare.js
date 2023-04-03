import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from '@emotion/styled'

import {
  Box,
  Button,
  Stack,
  TextField,
  Typography
} from '@mui/material'

import { useForm } from 'react-hook-form'

const ShareForm = styled(Box)`
  width: 500px;
  background-color: white;
  border: solid 1px lightgrey;
  border-radius: 5px;
  padding: 15px;
  margin: auto;
`

const BookShare = () => {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const _bookShare = () => {
    navigate('/books/home')
  }

  const cancel = () => {
    navigate('/books/home')
  }

  const onSubmit = handleSubmit(_bookShare)

  return (
    <ShareForm onSubmit={onSubmit} sx={{ width: '600px', mx: 'auto', p: 2 }}>
      <Stack component='form' spacing={2}>
        <Typography variant='h5'>
          台帳共有
        </Typography>
        <Typography variant='subtitle1' style={{ fontWeight: 'bold' }} >
          入力先の台帳が共有されます。
        </Typography>
        <Typography variant='caption'>
          共有する方のサブIDと台帳IDを入力してください。
        </Typography>
        <Stack direction='row'>
          <Typography style={{ width: '200px' }} fontWeight='bold'>
            サブID:
          </Typography>
          <TextField
            fullWidth
            error={!!errors.sub}
            helperText={errors.sub ? 'サブIDを入力してください。' : ''}
            {...register('sub', {
              required: true
            })}
          >
          </TextField>
        </Stack>
        <Stack direction='row'>
          <Typography style={{ width: '200px' }} fontWeight='bold'>
            台帳ID:
          </Typography>
          <TextField
            fullWidth
            error={!!errors.book}
            helperText={errors.book ? '台帳IDを入力してください。' : ''}
            {...register('book', {
              required: true
            })}
          >
          </TextField>
        </Stack>
        <Stack direction='row'>
          <Button
            style={{ width: '120px' }}
            color='tertiary'
            onClick={cancel}
          >
            キャンセル
          </Button>
          <Button
            style={{ width: '120px' }}
            color='secondary'
            type='submit'
          >
            共有
          </Button>
        </Stack>
      </Stack>
    </ShareForm>
  )
}

export default BookShare
