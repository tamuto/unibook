import React from 'react'
import {
  Stack,
  TextField,
  Typography,
  Button
} from '@mui/material'
import useBookEditor from '../api/useBookEditor'
import HeadBox from '../../../components/Header'


const BookEditor = () => {
  const { moveHome, handleSubmit, onSubmit, register, data, formState: { errors } } = useBookEditor()
  return (
    <>
      <Stack component='form' spacing={2} onSubmit={handleSubmit(onSubmit)} >
        <HeadBox direction='row'>
          {data.book_name}
          <Stack flexGrow={1}></Stack>
          <Button
            color='tertiary'
            onClick={moveHome}
          >戻る
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
          {
            data.columns.map((item, idx) => (
              <Stack direction='row' key={idx}>
                <Typography
                  sx={{ width: '10%' }}>
                  {item.caption}
                </Typography>
                <TextField
                  sx={{ width: '50%' }}
                  name={item.field_name}
                  error={item.field_name in errors}
                  helperText={item.field_name in errors ? '入力してください' : ''}
                  {...register(`${item.field_name}`, { required: true })}
                />
              </Stack>
            ))
          }
        </Stack>
        <Stack mt={1} spacing={2} direction='row'>
          <Button
            color='secondary'
            type='submit'
          >
            登録
          </Button>
        </Stack>
      </Stack>
    </>
  )
}
export default BookEditor
