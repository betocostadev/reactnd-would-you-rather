import { forwardRef } from 'react'
import PropTypes from 'prop-types'

import Snackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant='filled' {...props} />
})

const Notify = ({ open, severity, message, handleClose }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert
        onClose={handleClose}
        severity={severity || 'info'}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  )
}

Notify.propTypes = {
  open: PropTypes.bool.isRequired,
  severity: PropTypes.string,
  message: PropTypes.string,
  handleClose: PropTypes.func.isRequired,
}

export default Notify
