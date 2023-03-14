import React from 'react'
import { Outlet } from 'react-router-dom'
import {
  Button,
  IconButton,
  Stack,
  Tooltip,
  Typography
} from '@mui/material'

import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import OutputIcon from '@mui/icons-material/Output'

import HeadBox from '../../../conponents/Header'
import RequestConfirmation from '~/conponents/RequestConfirmation'
import Search from './Search'
import Display from './Display'
import useBookForm from '../api/useBookForm'


const BookForm = () => {
  const { openModal, data, newEntry, moveHome, moveEdit, toggleModal, moveDelete } = useBookForm()
  return (
    <>
      <Stack spacing={2}>
        <HeadBox direction='row'>
          {data.book_name}
          <Stack flexGrow={1}></Stack>
          <Button
            color='tertiary'
            onClick={moveHome}
          >戻る
          </Button>
          <Tooltip title='CSVで出力'>
            <IconButton>
              <OutputIcon />
            </IconButton>
          </Tooltip>
        </HeadBox>
        <Stack
          direction='row'
          spacing={2}
          sx={{
            padding: '15px'
          }}>
          <Stack flexGrow={1}></Stack>
          <Button
            onClick={newEntry}
            color='secondary'
          >新規登録
          </Button>
        </Stack>
        <Stack spacing={2} direction='row'>
          <Search />
          <Display />
        </Stack>
        <Stack spacing={2} direction='row' sx={{ backgroundColor: 'white', p: 2 }}>
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
