import 'typeface-inconsolata'

import teal from '@material-ui/core/colors/teal'
import { createMuiTheme } from '@material-ui/core/styles'

export const theme = createMuiTheme({
  typography: {
    fontFamily: 'Inconsolata, Helvetica'
  }
})

export const sideMenuWidth = 280

export const styles = (theme) => ({
  root: {
    margin: 0,
    padding: 0,
    display: 'flex',
    fontFamily: 'Inconsolata, Helvetica'
  },
  sideMenu: {
    [theme.breakpoints.up('sm')]: {
      width: sideMenuWidth,
      flexShrink: 0
    },
    marginTop: 0,
    marginBottom: 0,
    paddingTop: 0,
    paddingBottom: 0
  },
  sideMenuTitle: {
    display: 'flex',
    flexGrow: 1,
    justifyContent: 'flex-start',
    aligntItems: 'flex-start',
    padding: theme.spacing(2),
    height: '100%'
  },
  sideMenuAnimations: {
    maxWidth: sideMenuWidth,
    padding: theme.spacing(2)
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${sideMenuWidth}px)`,
      marginLeft: sideMenuWidth
    },
    backgroundColor: teal[400]
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none'
    }
  },
  menuRight: {
    marginRight: theme.spacing(2)
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  sideMenuPaper: {
    width: sideMenuWidth
  },
  content: {
    flexGrow: 1,
    padding: 0,
    margin: 0
  },
  map: {
    margin: 0,
    padding: 0,
    [theme.breakpoints.only('xs')]: {
      width: '100%',
      position: 'relative',
      maxHeight: `calc(100% - ${theme.mixins.toolbar.minHeight}px)`
    },
    [theme.breakpoints.up('sm')]: {
      maxWidth: `calc(100% - ${sideMenuWidth}px)`,
      maxHeight: `calc(100% - ${theme.mixins.toolbar.minHeight + 8}px)`
    }
  },
  mapContainer: {
    margin: 0,
    padding: 0,
    maxHeight: `calc(100% - ${theme.mixins.toolbar.minHeight + 8}px)})`
  },
  infoWindow: {
    padding: theme.spacing(2),
    margin: theme.spacing(2)
  },
  heading: {
    fontWeight: 600
  },
  subheading: {
    fontSize: '1.2rem',
    fontWeight: 400
  },
  overlineText: {
    display: 'block',
    lineHeight: '1rem',
    paddingTop: '4px'
  }
})
