import React from 'react'
import {
  FormGroup,
  FormControlLabel,
  Switch
} from '@mui/material'


const Display = () => {
  return (
    <FormGroup>
      <FormControlLabel control={<Switch defaultChecked />} labelPlacement='end' label='ステータス表示ON' />
    </FormGroup>
  )
}
export default Display


