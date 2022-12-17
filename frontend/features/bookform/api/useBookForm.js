import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const useBookForm = () => {
  const navigate = useNavigate()
  const base = '/books/address'
  const [openModal, setOpenModal] = useState(false)
  const [selectItem, setSlectItem] = useState([])
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

  const moveEdit = async (item) => {
    const book_id = 'test'
    await axios.get(`/data/${book_id}/${item._id}`)
    setSlectItem(data)
    console.log(data)
    console.log(item)
    navigate(`${base}/${item._id}`, { state: { data } })
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
    list,
    newEntry,
    moveEdit,
    toggleModal,
    moveClassDelete
  }
}
export default useBookForm
