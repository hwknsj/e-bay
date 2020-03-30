import CircularProgress from '@material-ui/core/CircularProgress'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect, useState } from 'react'

import { API_ROOT, get, params } from './api'
import ErrorSnackbar from './components/ErrorSnackbar'
import NavBar from './components/NavBar'
import SideMenu from './components/SideMenu'
import { styles } from './theme/styles'

// NOTE: lazy load Map to display map while earthquake data fetched
const MapLazy = React.lazy(() => import('./components/Map'))

const useStyles = makeStyles(styles)

const App = () => {
  const classes = useStyles()

  const [earthquakes, setEarthquakes] = useState({})
  const [mobileOpen, setMobileOpen] = useState(false)
  const [selectedEqId, setSelectedEqId] = useState('')
  const [error, setError] = useState({})

  const handleMenuToggle = () => {
    setMobileOpen(!mobileOpen)
  }

  // TODO: better error handling!!!
  useEffect(() => {
    const getData = () =>
      get(API_ROOT, params)
        .then((response) => {
          if (response.ok) {
            return response.json()
          }
          throw response
        })
        .catch((error) => {
          if (error instanceof Error) {
            return Promise.reject({ error })
          }

          return error.json().then((responseJson) => {
            return Promise.reject({
              error: new Error(
                `HTTP ${error.status} ${error.statusText}: ${responseJson.msg}`
              )
            })
          })
        })
        .then(setEarthquakes, (error) => {
          if (process.env.NODE_ENV === 'development') console.log(error)
          setError({ error })
        })
    getData()
  }, [setEarthquakes, setError])

  return (
    <div className={classes.root}>
      <ErrorSnackbar error={error} />
      <NavBar handleMenuToggle={handleMenuToggle} />
      <SideMenu
        handleMenuToggle={handleMenuToggle}
        mobileOpen={mobileOpen}
        selectedEqId={selectedEqId}
        setSelectedEqId={setSelectedEqId}
        earthquakes={earthquakes}
        error={error}
      />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <React.Suspense
          fallback={
            <CircularProgress
              style={{ margin: 'auto', left: '50%', top: '50%' }}
            />
          }
        >
          <MapLazy
            earthquakes={earthquakes}
            selectedEqId={selectedEqId}
            setSelectedEqId={setSelectedEqId}
          />
        </React.Suspense>
      </main>
    </div>
  )
}

export default App
