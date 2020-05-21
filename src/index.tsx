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

import * as serviceWorker from './serviceWorker'
import { CssBaseline, Container } from '@material-ui/core'

ReactDOM.render(
  <>
    <CssBaseline />
    <Topbar />
    <Container maxWidth="xs">
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={SearchTitle} />
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
        </Switch>
      </BrowserRouter>
    </Container>
  </>,
  document.getElementById('root')
)

serviceWorker.unregister()
