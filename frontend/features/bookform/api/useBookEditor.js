import React, { useEffect, useState } from 'react'
// import ReactHookForm  from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import data from '../../../../etc/sample/address.yaml'
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

  const [regist, setRegist] = useState([])
  const currentPath = location.pathname
  const isEntry = currentPath.endsWith('entry') || currentPath.endsWith('entry/')
  const [data, setData] = useState({
    book_id: '',
    book_name: '',
    columns: [],
  })

  const _list = async () => {
    console.log(recordNo)
    const bookInfo = await axios.get(`/api/books/${form}`) // yaml
    if (recordNo) {
      const result = await axios.get(`/data/${form}/${recordNo}`)
      console.log(result.data)
      for (const k of Object.keys(result.data)) {
        console.log(k,result.data[k])
        setValue(k, result.data[k])
      }
    }
    setData({
      ...bookInfo.data,
    })
  }

  // const _regist = async () => {
  //   const result = await axios.get(`/data/${form}/${_id}`)
  //   setRegist(result.data)
  //   console.log(result)
  // }

  useEffect(() => {
    _list()
    // setValue(data.items.caption, 'test')
  }, [])


  const onSubmit = async (data) => {
    await axios.post(`/data/${form}`, watch(data))
    console.log('onSubmit:', data)
    navigate(`${base}`)
  }

  return {
    handleSubmit,
    onSubmit,
    register,
    watch,
    data,
    regist,
    formState: { errors }
  }
}

export default useBookEditor
