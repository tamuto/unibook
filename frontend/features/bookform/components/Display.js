import React from 'react'
import {
  FormControlLabel,
  Switch
} from '@mui/material'


const Display = () => {
  return (
    <FormControlLabel control={<Switch defaultChecked />} labelPlacement='top' label='ステータス表示ON' />
  )
}
export default Display


