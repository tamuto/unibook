import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  Stack,
  Button,
  Tooltip,
  IconButton,
  Typography
} from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import useBookForm from '../api/useBookForm'
import RequestConfirmation from '~/conponents/RequestConfirmation'

const BookForm = () => {
  const { openModal, data, newEntry, moveEdit, toggleModal, moveDelete } = useBookForm()
  return (
    <>
      <Stack>
        <Stack direction='row'>
          <p>{data.book_name}</p>
          <Button onClick={newEntry}>新規登録</Button>
        </Stack>
        <Stack spacing={2} direction='row' sx={{ backgroundColor: 'lightgray', p: 2 }}>
          {
            data.columns.map((item, idx) => (
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
            data.records.map((record, idx) => (
              <Stack key={idx} direction='row' spacing={2} sx={{ borderBottom: 1, px: 2 }}>
                {
                  data.columns.map((item) => (
                    <Stack sx={{ width: '40%' }} key={item.field_name}>{record[item.field_name]}</Stack>
                  ))
                }
                <Stack sx={{ width: '20%' }}>
                  <Tooltip title='編集'>
                    <IconButton sx={{ cursor: 'pointer' }} onClick={() => moveEdit(record)} >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
                <Stack sx={{ width: '20%' }}>
                  <Tooltip title='削除'>
                    <IconButton color='error' sx={{ cursor: 'pointer' }} onClick={() => toggleModal(record)} >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </Stack>
              </Stack>
            ))
          }
        </Stack>
        <RequestConfirmation
          open={openModal}
          description={<>
            <Typography variant='h6'>削除確認</Typography>
            <Typography>本当に削除してよろしいですか？</Typography>
          </>}
          toggleModal={toggleModal}
          regist={moveDelete}
          buttonLabel='削除'
        >
        </RequestConfirmation>
        <Outlet />
      </Stack>
    </>
  )
}

export default BookForm
