import red from '@material-ui/core/colors/red'

export const sideMenuWidth = 320

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
  sideMenuContent: {
    maxWidth: sideMenuWidth,
    padding: theme.spacing(2)
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${sideMenuWidth}px)`,
      marginLeft: sideMenuWidth
    },
    backgroundColor: '#227d4d'
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
      position: 'absolute',
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
  },
  errorSnackbar: {
    backgroundColor: red[600]
  }
})
