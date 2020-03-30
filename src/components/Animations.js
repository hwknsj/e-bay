import { makeStyles } from '@material-ui/core/styles'
import Skeleton from '@material-ui/lab/Skeleton'
import React from 'react'

import { styles } from '../theme/styles'

const useStyles = makeStyles(styles)

const Animations = () => {
  const classes = useStyles()
  return (
    <div className={classes.sideMenuContent}>
      <Skeleton />
      <Skeleton animation={false} />
      <Skeleton animation='wave' />
    </div>
  )
}

export default Animations
