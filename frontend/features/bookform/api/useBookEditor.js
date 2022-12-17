import React, { useEffect, useState } from 'react'
// import ReactHookForm  from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import data from '../../../../etc/sample/address.yaml'
import { useForm } from 'react-hook-form'
import axios from 'axios'


const useBookEditor = () => {
  const navigate = useNavigate()
  const base = '/books/:form'
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
  const _regist = async () => {
    const result = await axios.get(`/data/test/${_id}`)
    setRegist(result.data)
    console.log(result)
  }

  useEffect(() => {
    setValue(data.items.caption, 'test')
  }, [])


  const onSubmit = async (data) => {
    const book_id = 'test'
    await axios.post(`/data/${book_id}`, watch(data))
    console.log('onSubmit:', data)
    console.log('watch:', watch(data))
    navigate(`${base}`)
  }

  return {
    handleSubmit,
    onSubmit,
    register,
    watch,
    regist,
    formState: { errors }
  }
}

export default useBookEditor
