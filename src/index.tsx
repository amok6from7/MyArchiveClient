import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Topbar from './components/Topbar'
import SearchTitle from './components/SearchTitle'
import AddRecord from './components/AddRecord'
import EditRecord from './components/EditRecord'
import SearchAuthor from './components/SearchAuthor'
import AddAuthor from './components/AddAuthor'
import EditAuthor from './components/EditAuthor'
import SearchTitleByAuthor from './components/SearchTitleByAuthor'
import Signup from './components/Signup'
import Login from './components/Login'
import { AuthProvider } from './components/Auth'
import Graph from './components/Graph'

import * as serviceWorker from './serviceWorker'
import { ThemeProvider } from '@material-ui/core/styles'
import { CssBaseline, Container, createMuiTheme } from '@material-ui/core'

const theme = createMuiTheme({
  typography: {
    button: {
      textTransform: 'none',
    },
  },
})

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <AuthProvider>
      <Topbar />
      <Container maxWidth="xs">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" component={SearchTitle} />
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/login" component={Login} />
            <Route
              exact
              path="/record/search/author"
              component={SearchTitleByAuthor}
            />
            <Route exact path="/record/new" component={AddRecord} />
            <Route path="/record/edit/:record_id" component={EditRecord} />
            <Route exact path="/author/search" component={SearchAuthor} />
            <Route exact path="/author/new" component={AddAuthor} />
            <Route path="/author/edit/:author_id" component={EditAuthor} />
            <Route exact path="/analysis" component={Graph} />
          </Switch>
        </BrowserRouter>
      </Container>
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
