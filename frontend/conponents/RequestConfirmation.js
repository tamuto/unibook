import React from 'react'
import PropTypes from 'prop-types'
import { Button, Modal, Stack, Typography } from '@mui/material'


const RequestConfirmation = ({ open, title, description, children, toggleModal, regist, buttonLabel }) => {
  buttonLabel = buttonLabel ?? '登録'
  return (
    <Modal open={open}>
      <Stack
        p={2}
        sx={{
          background: 'white',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '40%'
        }}
      >
        <Typography variant='h4'>{title}</Typography>
        {description}
        {children}
        <Stack direction='row' justifyContent='flex-end'>
          <Button name='close' color='inherit' onClick={toggleModal}>キャンセル</Button>
          <Button color={buttonLabel === '登録' ? 'primary' : 'error'}
            onClick={regist}>{buttonLabel}</Button>
        </Stack>
      </Stack>
    </Modal>
  )
}
RequestConfirmation.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  description: PropTypes.node,
  children: PropTypes.node,
  toggleModal: PropTypes.func,
  regist: PropTypes.func,
  buttonLabel: PropTypes.string,
  buttonColor: PropTypes.string
}

export default RequestConfirmation
