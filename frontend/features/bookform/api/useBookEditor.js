import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import axios from 'axios'


const useBookEditor = () => {
  const navigate = useNavigate()
  const { form, recordNo } = useParams()
  const base = `/books/${form}`
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm()

  const [data, setData] = useState({
    book_id: '',
    book_name: '',
    columns: [],
  })

  const _list = async () => {
    const bookInfo = await axios.get(`/api/books/${form}`) // yaml
    if (recordNo) {
      const result = await axios.get(`/data/${form}/${recordNo}`)
      for (const k of Object.keys(result.data)) {
        setValue(k, result.data[k])
      }
    }
    setData({
      ...bookInfo.data,
    })
  }

  useEffect(() => {
    _list()
  }, [])


  const onSubmit = async (data) => {
    if (recordNo) {
      await axios.put(`/data/${form}/${recordNo}`, watch(data))
    } else {
      await axios.post(`/data/${form}`, watch(data))
    }
    navigate(`${base}`)
  }

  const cancel = () => {
    navigate(`${base}`)
  }

  return {
    cancel,
    handleSubmit,
    onSubmit,
    register,
    watch,
    data,
    formState: { errors }
  }
}

export default useBookEditor
