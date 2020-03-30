import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import Hidden from '@material-ui/core/Hidden'
import List from '@material-ui/core/List'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types'
import React, { useCallback } from 'react'

import { styles } from '../theme/styles'
import Animations from './Animations'
import EqListItem from './EqListItem'

const useStyles = makeStyles(styles)

const SideMenuContent = ({
  error,
  earthquakes,
  selectedEqId,
  setSelectedEqId
}) => {
  const classes = useStyles()
  const handleListItemClick = useCallback(
    (eqid) => {
      // match Marker and Earthquake by eqid
      setSelectedEqId(eqid)
    },
    [setSelectedEqId]
  )

  if (!isEmpty(error)) {
    return (
      <>
        <div className={classes.toolbar}>
          <div className={classes.sideMenuTitle}>
            <Typography variant='h6'>Earthquakes</Typography>
          </div>
        </div>
        <Divider />
        <List style={{ paddingTop: 0, paddingBottom: 0 }}>
          <p className={classes.sideMenuContent}>
            {error.message ||
              'Failed to fetch earthquake data, please try again.'}
          </p>
        </List>
      </>
    )
  }

  return (
    <>
      <div className={classes.toolbar}>
        <div className={classes.sideMenuTitle}>
          <Typography variant='h6'>Earthquakes</Typography>
        </div>
      </div>
      <Divider />
      <List style={{ paddingTop: 0, paddingBottom: 0 }}>
        {!isEmpty(earthquakes.earthquakes) ? (
          earthquakes.earthquakes.map((eq) => (
            <EqListItem
              key={eq.eqid}
              eq={eq}
              handleListItemClick={handleListItemClick}
              selected={eq.eqid === selectedEqId}
            />
          ))
        ) : (
          <>{!error ? <p>Failed to fetch API data</p> : <Animations />}</>
        )}
      </List>
    </>
  )
}

const SideMenu = (props) => {
  const {
    container,
    error,
    handleMenuToggle,
    mobileOpen,
    earthquakes,
    selectedEqId,
    setSelectedEqId
  } = props
  const classes = useStyles()
  const theme = useTheme()

  return (
    <nav className={classes.sideMenu} aria-label='list'>
      {/* mobile view */}
      <Hidden smUp implementation='css'>
        <Drawer
          container={container}
          variant='temporary'
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={mobileOpen}
          onClose={handleMenuToggle}
          classes={{ paper: classes.sideMenuPaper }}
          ModalProps={{ keepMounted: true }}
        >
          <SideMenuContent
            error={error}
            earthquakes={earthquakes}
            selectedEqId={selectedEqId}
            setSelectedEqId={setSelectedEqId}
          />
        </Drawer>
      </Hidden>
      {/* wider screens */}
      <Hidden xsDown implementation='css'>
        <Drawer
          classes={{ paper: classes.sideMenuPaper }}
          variant='permanent'
          open
        >
          <SideMenuContent
            error={error}
            earthquakes={earthquakes}
            selectedEqId={selectedEqId}
            setSelectedEqId={setSelectedEqId}
          />
        </Drawer>
      </Hidden>
    </nav>
  )
}

SideMenu.propTypes = {
  earthquakes: PropTypes.object.isRequired,
  container: PropTypes.object,
  mobileOpen: PropTypes.bool.isRequired,
  handleMenuToggle: PropTypes.func.isRequired
}

export default SideMenu
