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
    _list()
  }, [])

  const newEntry = () => {
    navigate(`${base}/entry`)
  }

  const moveEdit = async (item) => {
    navigate(`${base}/edit/${item._id}`)
  }

  const toggleModal = (record) => {
    setSlectItem(record)
    setOpenModal(!openModal)
  }

  const moveDelete = async () => {
    await axios.delete(`/data/${form}/${selectItem._id}`)
      .then(async () => {
        await axios.get(`/data/${form}`)
          .then(res => {
            setData({
              ...data,
              records: res.data
            })
          })
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
    moveDelete
  }
}
export default useBookForm
