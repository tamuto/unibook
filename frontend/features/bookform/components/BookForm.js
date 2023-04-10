import React from 'react'
import { Outlet } from 'react-router-dom'
import styled from '@emotion/styled'
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

import Display from './Display'
import HeadBox from '../../../components/Header'
import RequestConfirmation from '~/components/RequestConfirmation'
import Search from './Search'
import useBookForm from '../api/useBookForm'

import DataCell from 'github://tamuto/boilerplate/uilib/components/datarow/DataCell.js'
import DataHead from 'github://tamuto/boilerplate/uilib/components/datarow/DataHead.js'
import DataRow from 'github://tamuto/boilerplate/uilib/components/datarow/DataRow.js'

const DataTable = styled.div`
  & .DataHead {
    border-bottom: solid 2px grey;
    background-color: #a0d0d0;
  }
  & .DataRow {
    border-bottom: solid 1px grey;
  }
  & .DataRow:nth-of-type(odd) {
    background-color: #FFFFFF;
  }
`

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
        <DataTable>
          <DataHead>
            {
              data.columns.map((item, idx) => (
                <DataCell key={idx} style={{ width: `${item.size}px` }}>
                  {item.caption}
                </DataCell>
              ))
            }
            <DataCell />
          </DataHead>
          {
            data.records.map((record, idx) => (
              <DataRow key={idx}>
                {
                  data.columns.map((item) => (
                    <DataCell key={item.field_name} style={{ width: `${item.size}px` }}>
                      {record[item.field_name]}
                    </DataCell>
                  ))
                }
                <DataCell>
                  <Tooltip title='編集'>
                    <IconButton onClick={() => moveEdit(record)} >
                      <EditIcon />
                    </IconButton>
                  </Tooltip>
                  <Tooltip title='削除'>
                    <IconButton color='error' onClick={() => toggleModal(record)} >
                      <DeleteIcon />
                    </IconButton>
                  </Tooltip>
                </DataCell>
              </DataRow>
            ))
          }
        </DataTable>
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
