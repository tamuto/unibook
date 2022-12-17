import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  Stack,
  Button,
  Tooltip,
  IconButton
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import data from '../../../../etc/sample/address.yaml'
import useBookForm from '../api/useBookForm'

const BookForm = () => {
  const { openModal, selectItem, list, newEntry, moveEdit, toggleModal, moveClassDelete } = useBookForm()
  return (
    <>
      <Stack direction='row'>
        <p>{data.book_name}</p>
        <Button onClick={newEntry}>新規登録</Button>
      </Stack>
      <Stack spacing={2} direction='row' sx={{ backgroundColor: 'lightgray', p: 2 }}>
        {
          data.items.map((item, idx) => (
            <Stack sx={{ width: '40%' }} key={idx}>
              {item.caption}
            </Stack>
          ))
        }
        <Stack sx={{ width: '20%' }}></Stack>
        <Stack sx={{ width: '20%' }}></Stack>
      </Stack>
      <Stack>
        {
          list.map((item, idx) => (
            <Stack key={idx} direction='row' spacing={2} sx={{ borderBottom: 1, px: 2 }}>
              <Stack sx={{ width: '40%' }}>{item.name}</Stack>
              <Stack sx={{ width: '40%' }}>{item.address1}</Stack>
              <Stack sx={{ width: '40%' }}>{item.address2}</Stack>
              <Stack sx={{ width: '40%' }}>{item.address3}</Stack>
              <Stack sx={{ width: '40%' }}>{item.phone_number}</Stack>
              <Stack sx={{ width: '20%' }}>
                <Tooltip title='編集'>
                  <IconButton sx={{ cursor: 'pointer' }} onClick={() => moveEdit()} >
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Stack sx={{ width: '20%' }}>
                <Tooltip title='削除'>
                  <IconButton color='error' sx={{ cursor: 'pointer' }} onClick={() => toggleModal(item)} >
                    <DeleteIcon />
                  </IconButton>
                </Tooltip>
              </Stack>
            </Stack>
          ))
        }
      </Stack>
      <Outlet />
    </>
  )
}

export default BookForm
