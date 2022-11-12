import React from 'react'
// import ReactHookForm  from 'react-hook-form'
import { Box, Stack, TextField, Button } from '@mui/material'
import data from '../../../../etc/sample/address.yaml'
import { useForm } from 'react-hook-form'
import axios from 'axios'


const BookEditor = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors }
  } = useForm()

  const onSubmit = async (data) => {
    const book_id = 'test'
    if (data != '') {
      await axios.post(`/data/${book_id}`, watch(data))
    }
    else {
      alert('この項目は必須項目です')
    }
    console.log('onSubmit:', data)
    console.log('watch:', watch(data))
  }
  console.log(errors)
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
