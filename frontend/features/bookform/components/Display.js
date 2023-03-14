import React from 'react'
import {
  FormControlLabel,
  Switch
} from '@mui/material'


const Display = () => {
  return (
    <FormControlLabel control={<Switch defaultChecked />} labelPlacement='left' label='ステータス表示ON' />
  )
}
export default Display


