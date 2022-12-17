import React from 'react'
// import ReactHookForm  from 'react-hook-form'
import {
  Box,
  Stack,
  TextField,
  Button
} from '@mui/material'
import data from '../../../../etc/sample/address.yaml'
import useBookEditor from '../api/useBookEditor'


const BookEditor = () => {
  const { handleSubmit, onSubmit, register, formState: { errors } } = useBookEditor()
  return (
    <>
      <Stack component='form' onSubmit={handleSubmit(onSubmit)} >
        {
          data.items.map((item, idx) => (
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
        <Box mt={1}>
          <Button
            type='submit'
            onClick={onSubmit}
          >
            OK
          </Button>
        </Box>
      </Stack>
    </>
  )
}
export default BookEditor
