import AppBar from '@material-ui/core/AppBar'
import Hidden from '@material-ui/core/Hidden'
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import MenuIcon from '@material-ui/icons/Menu'
import PropTypes from 'prop-types'
import React from 'react'

import { styles } from '../theme/styles'

const useStyles = makeStyles(styles)

const NavBar = (props) => {
  const { handleMenuToggle } = props
  const classes = useStyles()

  return (
    <AppBar position='fixed' className={classes.appBar}>
      <Toolbar>
        <Hidden smUp implementation='css'>
          <IconButton
            className={classes.menuButton}
            edge='start'
            color='inherit'
            aria-label='open drawer'
            onClick={handleMenuToggle}
          >
            <MenuIcon />
          </IconButton>
        </Hidden>
        <Typography variant='h6'>
          E-bay <Typography variant='subtitle2'>(Earthquake-bay)</Typography>
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

NavBar.propTypes = {
  handleMenuToggle: PropTypes.func.isRequired
}

export default NavBar
