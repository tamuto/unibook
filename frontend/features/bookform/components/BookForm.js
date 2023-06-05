import React from 'react'
import { Outlet } from 'react-router-dom'
import { css } from '@emotion/react'
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

import HeadBox from '../../../components/Header'
import RequestConfirmation from '~/components/RequestConfirmation'
// import Display from './Display'
// import Search from './Search'

import useBookForm from '../api/useBookForm'
import useMediaQuery from '~/api/useMediaQuery'

import DataTable from 'github://tamuto/uilib/components/datarow/DataTable.js'
import DataCell from 'github://tamuto/uilib/components/datarow/DataCell.js'
import DataHead from 'github://tamuto/uilib/components/datarow/DataHead.js'
import DataRow from 'github://tamuto/uilib/components/datarow/DataRow.js'

const BookForm = () => {
  const mobile = useMediaQuery(state => state.mobile)

  const layoutCss = css`
    display: flex;
    padding: 10px;
    margin: auto;
    ${mobile} {
      width: calc(95% - 5px);
    }
  `

  const { openModal, data, newEntry, moveHome, moveEdit, toggleModal, moveDelete } = useBookForm()

  return (
    <Stack spacing={2} css={layoutCss}>
      <Stack direction='row' justifyContent='flex-end'>
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
      </Stack>
      <HeadBox direction='row'>
        {data.book_name}
      </HeadBox>
      <Stack
        css={layoutCss}
        direction='row'
        spacing={2}
      >
        <Stack flexGrow={1}></Stack>
        <Button
          onClick={newEntry}
          color='secondary'
        >新規登録
        </Button>
      </Stack>
      {/* <Stack spacing={2} direction='row'>
        <Search />
        <Display />
      </Stack> */}
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
  )
}

export default BookForm
