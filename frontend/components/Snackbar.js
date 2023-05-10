import { useEffect } from 'react'
import { useSnackbar } from 'notistack'
import useLoginState from '~/system/api/useLoginState'
import PropTypes from 'prop-types'

const Snackbar = () => {
  const { alertInfo } = useLoginState()
  const { enqueueSnackbar } = useSnackbar()

  useEffect(() => {
    if (alertInfo?.display && alertInfo?.message) {
      enqueueSnackbar(alertInfo.message, { variant: alertInfo.variant })
    }
  }, [alertInfo, enqueueSnackbar])

  return null
}

export default Snackbar

Snackbar.propTypes = {
  alertInfo: PropTypes.shape({
    display: PropTypes.bool,
    message: PropTypes.string,
    variant: PropTypes.string
  })
}
