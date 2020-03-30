import IconButton from '@material-ui/core/IconButton'
import Snackbar from '@material-ui/core/Snackbar'
import { makeStyles } from '@material-ui/core/styles'
import CloseIcon from '@material-ui/icons/Close'
import isEmpty from 'lodash.isempty'
import React, { useEffect } from 'react'

import { styles } from '../theme/styles'

const useStyles = makeStyles(styles)

const ErrorSnackbar = ({ error }) => {
  const classes = useStyles()
  const [open, setOpen] = React.useState(false)

  useEffect(() => {
    if (!isEmpty(error)) {
      setOpen(true)
    }
  }, [error, setOpen])

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'left'
      }}
      open={open}
      autoHideDuration={6000}
      variant={'error'}
      onClose={handleClose}
      message={
        error.message || 'Failed to fetch earthquake data, please try again.'
      }
      ContentProps={{ className: classes.errorSnackbar }}
      action={
        <>
          <IconButton
            size='small'
            aria-label='close'
            color='inherit'
            onClick={handleClose}
          >
            <CloseIcon fontSize='small' />
          </IconButton>
        </>
      }
    />
  )
}

export default ErrorSnackbar
