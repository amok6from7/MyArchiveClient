import React, { useState, useContext } from 'react'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Link,
  Menu,
  MenuItem,
  Button,
} from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import auth from '../firebase/base'
import { AuthContext } from './Auth'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
  })
)

export default function Topbar(props: any) {
  const { currentUser } = useContext(AuthContext)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }
  const logout = async () => {
    await auth.signOut()
  }
  const classes = useStyles()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense">
          {currentUser && (
            <>
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
                <MenuItem>
                  <a href="/">Title Search</a>
                </MenuItem>
                <MenuItem>
                  <a href="/record/search/author">Title Search By Author</a>
                </MenuItem>
                <MenuItem>
                  <a href="/record/new">Add Record</a>
                </MenuItem>
                <MenuItem>
                  <a href="/author/search">Author Search</a>
                </MenuItem>
                <MenuItem>
                  <a href="/author/new">Add Author</a>
                </MenuItem>
              </Menu>
            </>
          )}
          <Typography variant="h6" color="inherit" className={classes.title}>
            <Link href="/" color="inherit">
              My Archive App
            </Link>
          </Typography>
          {currentUser && (
            <Button color="inherit" onClick={logout}>
              logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </div>
  )
}
