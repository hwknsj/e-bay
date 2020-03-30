import orange from '@material-ui/core/colors/orange'
import red from '@material-ui/core/colors/red'
import Divider from '@material-ui/core/Divider'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import RadioButtonCheckedIcon from '@material-ui/icons/RadioButtonChecked'
import PropTypes from 'prop-types'
import React, { forwardRef } from 'react'

import EqItem from './EqItem'

// NOTE: eq is one element of the 'earthquakes' array
const EqListItem = forwardRef(({ eq, selected, handleListItemClick }, ref) => {
  const color = eq.magnitude >= 8.0 ? red[600] : orange[400]
  // NOTE: floats derived from system of equations such that
  // mag=7.8 => 24(px), mag=8.8 => 48(px)
  const size = Math.round(Math.pow(eq.magnitude, 5.74616) / 5570.61)

  return (
    <React.Fragment>
      <ListItem
        button
        selected={selected}
        ref={ref}
        onClick={() => handleListItemClick(eq.eqid)}
      >
        <ListItemIcon>
          <RadioButtonCheckedIcon
            style={{
              color: color,
              fontSize: size
            }}
          />
        </ListItemIcon>
        <ListItemText>
          <EqItem eq={eq} />
        </ListItemText>
      </ListItem>
      <Divider />
    </React.Fragment>
  )
})

EqListItem.propTypes = {
  eq: PropTypes.shape({
    magnitude: PropTypes.number.isRequired,
    src: PropTypes.string.isRequired,
    datetime: PropTypes.string.isRequired,
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
    depth: PropTypes.number.isRequired,
    eqid: PropTypes.string.isRequired
  }),
  selected: PropTypes.bool,
  handleListItemClick: PropTypes.func.isRequired
}

export default EqListItem
