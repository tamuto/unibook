import React from 'react'
import {
  Box,
  Stack,
  TextField,
  Button
} from '@mui/material'
import useBookEditor from '../api/useBookEditor'
import HeadBox from '../../../conponents/Header'


const BookEditor = () => {
  const { cancel, handleSubmit, onSubmit, register, data, formState: { errors } } = useBookEditor()
  return (
    <>
      <Stack component='form' spacing={2} sx={{ padding: '15px' }} onSubmit={handleSubmit(onSubmit)} >
        <HeadBox>{data.book_name}</HeadBox>
        <Stack
          direction='row'
          spacing={2}
          sx={{
            padding: '15px'
          }}>
          <Stack flexGrow={1}></Stack>
        </Stack>
        {
          data.columns.map((item, idx) => (
            <TextField
              key={idx}
              name={item.field_name}
              label={item.caption}
              error={item.field_name in errors}
              helperText={item.field_name in errors ? '入力してください' : ''}
              {...register(`${item.field_name}`, { required: true })}
            />
          ))
        }
        <Stack mt={1} spacing={2} direction='row'>
          <Button
            color='inherit'
            onClick={cancel}
          >キャンセル
          </Button>
          <Button
            type='submit'
          >
            OK
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
export default BookEditor
