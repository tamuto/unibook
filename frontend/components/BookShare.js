import React from 'react'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import axios from 'axios'

import useMediaQuery from '~/api/useMediaQuery'

import {
  Box,
  Button,
  Stack,
  Typography
} from '@mui/material'

import { useForm } from 'react-hook-form'

import HookFormField from 'github://tamuto/uilib/components/form/HookFormField.js'

const BookShare = () => {
  const mobile = useMediaQuery(state => state.mobile)

  const layoutCss = css`
    width: 600px;
    background-color: white;
    border: solid 1px lightgrey;
    border-radius: 5px;
    padding: 15px;
    margin: auto;
    ${mobile} {
      width: calc(95% - 5px);
    }
  `

  const navigate = useNavigate()
  const { handleSubmit, control } = useForm({
    defaultValues: {
      sub: '',
      book: ''
    }
  })

  const _bookShare = async (event) => {
    const sub_id = event.sub
    const book_id = event.book
    await axios.post(`/api/share/${sub_id}/${book_id}`)
    navigate('/books')
  }

  const cancel = () => {
    navigate('/books')
  }

  const onSubmit = handleSubmit(_bookShare)

  return (
    <Box css={layoutCss} onSubmit={onSubmit} >
      <Stack component='form' spacing={2}>
        <Typography variant='h5'>
          台帳共有
        </Typography>
        <Typography variant='subtitle1' style={{ fontWeight: 'bold' }} >
          入力先に台帳が共有されます。
        </Typography>
        <Typography variant='caption'>
          共有する方のリンクIDと台帳IDを入力してください。
        </Typography>
        <HookFormField
          type='text'
          label='リンクID'
          name='sub'
          rules={{ required: 'リンクIDを入力してください。' }}
          control={control}
        />
        <HookFormField
          type='text'
          label='台帳ID'
          name='book'
          rules={{ required: '台帳IDを入力してください。' }}
          control={control}
        />
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
    </Box >
  )
}

export default BookShare
