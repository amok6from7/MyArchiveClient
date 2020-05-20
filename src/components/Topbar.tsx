import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Typography, Link } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu'

const useStyles = makeStyles((theme: Theme) => 
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2)
    }
  })
)

export default function Topbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit">
            <Link href="/" color="inherit">My Archive App</Link>
          </Typography>
        </Toolbar>
      </AppBar>  
    </div>
  )
}
