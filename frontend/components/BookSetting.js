import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

import useMediaQuery from '~/api/useMediaQuery'
import { useForm } from 'react-hook-form'

import {
  Box,
  Button,
  FormControl,
  FormControlLabel,
  IconButton,
  Paper,
  RadioGroup,
  Radio,
  Stack,
  Typography
} from '@mui/material'

import AddIcon from '@mui/icons-material/Add'

import HookFormField from 'github://tamuto/uilib/components/form/HookFormField.js'

const BookSetting = () => {
  const mobile = useMediaQuery(state => state.mobile)
  const [showCard, setShowCard] = useState(false)

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

  const Card = styled(Paper)`
    display: flex;
    border: 1px solid rgba(188, 209, 209, 1);
    flex-direction: column;
    gap: 16px;
    position: relative;
    padding: 25px;

    ${mobile} {
      padding: 25px 15px;
    }
  `

  const navigate = useNavigate()
  const { handleSubmit, control } = useForm({
    defaultValues: {
      book_name: '',
      caption: '',
      pulldown_caption: ''
    }
  })

  const _bookCreate = async (event) => {
    console.log(event)
    navigate('/books')
  }

  const cancel = () => {
    navigate('/books')
  }

  const onSubmit = handleSubmit(_bookCreate)

  const handleRadioChange = (event) => {
    if (event.target.value === 'pulldown') {
      setShowCard(true)
    } else {
      setShowCard(false)
    }
  }

  return (
    <Box css={layoutCss} onSubmit={onSubmit} >
      <Stack component='form' spacing={2}>
        <Typography variant='h5'>
          台帳作成
        </Typography>
        <Typography variant='subtitle1' style={{ fontWeight: 'bold' }} >
          詳細設定
        </Typography>
        <Stack flexGrow={1}></Stack>
        <HookFormField
          type='text'
          label='台帳名'
          name='book_name'
          rules={{ required: '台帳名を入力してください。' }}
          control={control}
        />
        <Card>
          <HookFormField
            type='text'
            label='項目名'
            name='caption'
            rules={{ required: '項目名を入力してください。' }}
            control={control}
          />
          <FormControl>
            <RadioGroup
              aria-labelledby='caption_setting'
              name='caption_setting'
              onChange={handleRadioChange}
            >
              <FormControlLabel value='date' control={<Radio />} label='日付' />
              <FormControlLabel value='checkbox' control={<Radio />} label='チェックボックス' />
              <FormControlLabel value='pulldown' control={<Radio />} label='プルダウン選択' />
            </RadioGroup>
          </FormControl>
          {showCard && (
            <Card>
              <HookFormField
                type='text'
                label='選択内容'
                name='pulldown_caption'
                rules={{ required: '選択内容を入力してください。' }}
                control={control}
              />
              <IconButton style={{ width: '50px' }}>
                <AddIcon />
              </IconButton>
            </Card>
          )}
        </Card>
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

export default BookSetting
