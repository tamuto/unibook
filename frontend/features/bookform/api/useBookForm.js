import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const useBookForm = () => {
  const navigate = useNavigate()
  const { form } = useParams()
  const base = `/books/${form}`
  const [openModal, setOpenModal] = useState(false)
  const [selectItem, setSlectItem] = useState([])
  const [data, setData] = useState({
    book_id: '',
    book_name: '',
    columns: [],
    records: []
  })

  const _list = async () => {
    const bookInfo = await axios.get(`/api/books/${form}`) // yaml
    const record = await axios.get(`/data/${form}`) // list
    setData({
      ...bookInfo.data,
      records: record.data
    })
  }

  useEffect(() => {
    console.log(form)
    _list()
  }, [])

  const newEntry = () => {
    navigate(`${base}/entry`)
  }

  const moveEdit = async (item) => {
    // await axios.get(`/data/${form}/${item._id}`)
    navigate(`${base}/edit/${item._id}`)
  }

  const toggleModal = (item) => {
    setSlectItem(item)
    setOpenModal(!openModal)
  }

  const moveClassDelete = async () => {
    await axios.delete(`/data/${book_id}/${selectItem.record_no}`)
      .then(async () => {
        await axios.get(`/data/${book_id}`)
        setList(res.data)
        console.log(res.data)
      })
    setOpenModal(!openModal)
  }
  return {
    openModal,
    selectItem,
    data,
    newEntry,
    moveEdit,
    toggleModal,
    moveClassDelete
  }
}
export default useBookForm
