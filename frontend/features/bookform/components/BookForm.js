import React, { useState, useEffect } from 'react'
import { useParams, Outlet } from 'react-router-dom'
import axios from 'axios'

import {
  Box,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
} from '@mui/material'

const BookForm = () => {
  const {bookId} = useParams()
  const [form, setForm] = useState({})
  // const [data, setData] = useState([])

  const _load_data = async () => {
    const result = await axios.get(`/api/books/${bookId}`)
    console.log(result)
    setForm(result.data)
  }

  useEffect(() => {
    _load_data()
  }, [])

  return (
    <Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              {
                form?.items?.map((item) => (
                  <TableCell key={item.field_name}>{item.caption}</TableCell>
                ))
              }
            </TableRow>
          </TableHead>
        </Table>
      </TableContainer>
      <Outlet />
    </Box>
  )
}

export default BookForm
