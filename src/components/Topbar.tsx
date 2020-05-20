import React, { useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, IconButton, Typography, Link, Menu, MenuItem } from '@material-ui/core';
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
const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
  setAnchorEl(event.currentTarget)
}
const handleClose = () => {
  setAnchorEl(null)
}
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <IconButton 
          edge="start" 
          className={classes.menuButton} 
          color="inherit" 
          aria-label="menu"
          onClick={handleClick}
          >
            <MenuIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem><a href="/">Search Title</a></MenuItem>
            <MenuItem><a href="/record/new">Add Title</a></MenuItem>
            <MenuItem>Search Author</MenuItem>
            <MenuItem>Add Author</MenuItem>

          </Menu>
          <Typography variant="h6" color="inherit">
            <Link href="/" color="inherit">My Archive App</Link>
          </Typography>
        </Toolbar>
      </AppBar>  
    </div>
  )
}
