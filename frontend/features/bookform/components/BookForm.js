import React from 'react'
import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@mui/material'
import data from '../../../../etc/sample/address.yaml'
import axios from 'axios'
import { Stack } from '@mui/material'
import { useNavigate } from 'react-router-dom'

const BookForm = () => {
  const navigate = useNavigate()
  const base = '/books/:form'
  const [list, setList] = useState([])
  const _list = async () => {
    const result = await axios.get('/data/test')
    setList(result.data)
    console.log(result)
  }

  useEffect(() => {
    _list()
  }, [])

  const newEntry = () => {
    navigate(`${base}/entry`)
  }

  const editForm = () => {
    navigate(`${base}/${id}`)
  }

  return (
    <>
      <Stack direction='row'>
        <p>{data.book_name}</p>
        <Button onClick={newEntry}>新規登録</Button>
      </Stack>
      <Table>
        <TableHead sx={{ backgroundColor: 'lightgray' }}>
          <TableRow>
            {
              data.items.map((item, idx) => (
                <TableCell key={idx}>
                  {item.caption}
                </TableCell>
              ))
            }
          </TableRow>
        </TableHead>
        <TableBody spacing={2}>
          {
            list.map((address, idx) => (
              <TableRow key={idx} onClick={() => editForm(address)} >
                <TableCell>{address.name}</TableCell>
                <TableCell>{address.address1}</TableCell>
                <TableCell>{address.address2}</TableCell>
                <TableCell>{address.address3}</TableCell>
                <TableCell>{address.phone_number}</TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      <Outlet />
    </>
  )
}

export default BookForm
