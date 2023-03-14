import React from 'react'
import {
  Button,
  Stack,
  TextField
} from '@mui/material'


const Search = () => {
  return (
    <Stack
      direction='row'
      spacing={2}
    >
      <TextField
        label='キーワード検索'
      />
      <Button
        color='tertiary'
        type='submit'
      >
        検索
      </Button>
    </ Stack>
  )
}
export default Search


