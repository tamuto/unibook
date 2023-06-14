import React from 'react'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'

import useMediaQuery from '~/api/useMediaQuery'
import { useForm } from 'react-hook-form'

import {
  Box,
  Button,
  IconButton,
  Stack,
  Typography
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

import HookFormField from 'github://tamuto/uilib/components/form/HookFormField.js'

const BookCreate = () => {
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
      book_name: '',
      caption: ''
    }
  })

  const bookSetting = () => {
    navigate('/books/setting')
  }

  const _bookCreate = async (event) => {
    console.log(event)
    navigate('/books')
  }

  const cancel = () => {
    navigate('/books')
  }

  const onSubmit = handleSubmit(_bookCreate)

  return (
    <Box css={layoutCss} onSubmit={onSubmit} >
      <Stack component='form' spacing={2}>
        <Stack direction='row'>
          <Typography variant='h5'>
            台帳作成
          </Typography>
          <Stack flexGrow={1}></Stack>
          <Button
            style={{ width: '120px' }}
            onClick={bookSetting}
          >
            詳細設定
          </Button>
        </Stack>
        <HookFormField
          type='text'
          label='台帳名'
          name='book_name'
          rules={{ required: '台帳名を入力してください。' }}
          control={control}
        />
        <HookFormField
          type='text'
          label='項目名'
          name='caption'
          rules={{ required: '台帳名を入力してください。' }}
          control={control}
        />
        <IconButton style={{ width: '50px' }}>
          <AddIcon />
        </IconButton>
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
            作成
          </Button>
        </Stack>
      </Stack>
    </Box >
  )
}

export default BookCreate
