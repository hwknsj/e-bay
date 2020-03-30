import { makeStyles } from '@material-ui/core/styles/'
import Typography from '@material-ui/core/Typography'
import PropTypes from 'prop-types'
import React from 'react'

import { styles } from '../theme/styles'

const useStyles = makeStyles(styles)

// NOTE: eq is one element of the 'earthquakes' array
const EqItem = ({ eq }) => {
  const classes = useStyles()

  return (
    <>
      <Typography variant='h5' component='h2' className={classes.heading}>
        Magnitude: {eq.magnitude}
      </Typography>
      <Typography variant='h6' component='h3' className={classes.subheading}>
        ID: {eq.eqid}
      </Typography>
      <Typography variant='body1' component='p'>
        Depth: {eq.depth}km
      </Typography>
      <Typography variant='body1' component='p'>
        Source: {eq.src}
      </Typography>
      <hr />
      <Typography
        variant='overline'
        component='p'
        className={classes.overlineText}
      >
        {eq.datetime} UTC{' '}
      </Typography>
      <Typography
        variant='overline'
        component='p'
        className={classes.overlineText}
      >
        {eq.lat}&deg; {eq.lng}&deg;
      </Typography>
    </>
  )
}

EqItem.propTypes = {
  eq: PropTypes.shape({
    eqid: PropTypes.string.isRequired,
    magnitude: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    depth: PropTypes.number.isRequired
  })
}

export default EqItem
