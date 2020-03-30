import orange from '@material-ui/core/colors/orange'
import red from '@material-ui/core/colors/red'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react'
import isEmpty from 'lodash.isempty'
import PropTypes from 'prop-types'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'

import { styles } from '../theme/styles'
import EqItem from './EqItem'

const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const useStyles = makeStyles(styles)

const MapContainer = ({
  earthquakes,
  selectedEqId,
  setSelectedEqId,
  google
}) => {
  const containerStyle = {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
  const classes = useStyles()
  const [activeMarker, setActiveMarker] = useState({})
  const [selectedEqInfo, setSelectedEqInfo] = useState({})
  const [showingInfoWindow, setShowingInfoWindow] = useState(false)

  const closeInfoWindow = useCallback(() => setShowingInfoWindow(false), [
    setShowingInfoWindow
  ])
  const openInfoWindow = useCallback(() => setShowingInfoWindow(true), [
    setShowingInfoWindow
  ])

  const handleMarkerClick = useCallback(
    (props, marker, e) => {
      setSelectedEqInfo(props)
      setActiveMarker(marker)
      setSelectedEqId(marker.eqid)
      setShowingInfoWindow(true)
    },
    [setSelectedEqInfo, setActiveMarker, setSelectedEqId, setShowingInfoWindow]
  )

  const handleClose = () => {
    if (showingInfoWindow) {
      closeInfoWindow()
      setActiveMarker(null)
    }
  }

  const _mapLoaded = (mapProps, map) => {
    map.setOptions(mapProps)
  }

  // HACK: create a ref object to reference the corresponding Marker
  // passing only the eqid prop of the selected SideMenu item
  // This way, we can avoid adding additional dependencies or
  // supplying the GoogleMapsApi context elsewhere.
  const refObj = useRef({})
  const createMarkersArray = useCallback(
    (earthquakes) => {
      let markersArray = []
      if (!isEmpty(earthquakes)) {
        // NOTE: for loop computationally faster than map
        for (let i = 0; i < earthquakes.length; i++) {
          let eq = earthquakes[i]
          let marker = (
            <Marker
              key={eq.eqid}
              onClick={handleMarkerClick}
              title={eq.eqid}
              name={eq.eqid}
              position={{ lat: eq.lat, lng: eq.lng }}
              // opacity={Math.log10(eq.magnitude)}
              icon={{
                path: google.maps.SymbolPath.CIRCLE,
                fillColor: eq.magnitude >= 8.0 ? red[600] : orange[400],
                fillOpacity: 0.4 * (eq.magnitude / 9.0),
                strokeColor: eq.magnitude >= 8.0 ? red[600] : orange[400],
                scale: Math.pow(2, eq.magnitude) / 8,
                strokeWeight: 0.5
              }}
              {...eq}
              ref={(ref) => (refObj.current[`${eq.eqid}`] = ref)}
            />
          )
          markersArray.push(marker)
        }
      }
      return markersArray
    },
    [handleMarkerClick, refObj, google.maps.SymbolPath.CIRCLE]
  )

  // NOTE: memoize Markers since we are not expecting API data to change and
  // don't want to rebuild on every selectedEqId change or mouse click
  const memoizedMarkers = useMemo(
    () => createMarkersArray(earthquakes.earthquakes),
    [earthquakes, createMarkersArray]
  )

  useEffect(() => {
    closeInfoWindow()
    if (!isEmpty(memoizedMarkers)) {
      const [selectedMarker] = memoizedMarkers.filter(
        (marker) => marker.props.eqid === selectedEqId
      )
      if (selectedMarker) {
        setActiveMarker(refObj.current[`${selectedEqId}`].marker)
        setSelectedEqInfo(selectedMarker.props)
        openInfoWindow()
      }
    }
  }, [selectedEqId, memoizedMarkers, closeInfoWindow, openInfoWindow])

  // NOTE: optional Map props
  // const points = [
  //   { lat: -9.9, lng: 55.2 },
  //   { lat: 44.1, lng: -22.4 }
  // ]
  // or use params from api.js:
  // const points = [
  //   { lat: params.south, params.west },
  //   { lat: params.north, params.east }
  // ]
  // automatically calculate map bounds
  // let bounds = new props.google.maps.LatLngBounds()
  // for (let i = 0; i < points.length; i++) {
  //   bounds.extend(points[i])
  // }
  // const mapCenter = bounds.getCenter()

  // IDEA: color/style/size marker based on magnitude
  // const mapColor = (magnitude) => {
  //   let shade = Math.floor(magnitude) * 100
  //   return shade >= 800 ? red[shade] : orange[shade]
  // }
  // const maxMagnitude = earthquakes.earthquakes.map(item => item.magnitude).reduce((a,b) => Math.max(a,b))
  // const normalizedMagnitude = (magnitude) => (magnitude / 8.9)

  return (
    <Map
      google={google}
      zoom={3}
      containerStyle={containerStyle}
      style={{ width: '100%', height: '100%' }}
      className={classes.map}
      initialCenter={{
        lat: 0.0,
        lng: 60.0
      }}
      // bounds={bounds}
      streetViewControl={false}
      mapTypeId={'terrain'}
      onReady={(mapProps, map) => _mapLoaded(mapProps, map)}
    >
      {!isEmpty(memoizedMarkers) && memoizedMarkers.map((marker) => marker)}
      <InfoWindow
        className={classes.infoWindow}
        marker={activeMarker}
        visible={showingInfoWindow}
        onClose={handleClose}
      >
        <Paper style={{ padding: '0.5rem' }} elevation={0}>
          {selectedEqInfo && <EqItem eq={selectedEqInfo} />}
        </Paper>
      </InfoWindow>
    </Map>
  )
}

MapContainer.propTypes = {
  earthquakes: PropTypes.object,
  selectedEqId: PropTypes.string,
  setSelectedEqId: PropTypes.func
}

export default GoogleApiWrapper({ apiKey: GOOGLE_MAPS_API_KEY })(MapContainer)
