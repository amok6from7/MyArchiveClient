import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import Topbar from './components/Topbar'
import SearchTitle from './components/SearchTitle'
import AddRecord from './components/AddRecord'
import EditRecord from './components/EditRecord'

import * as serviceWorker from './serviceWorker'
import { CssBaseline, Container } from '@material-ui/core';



ReactDOM.render(
  <>
    <CssBaseline/>
    <Topbar/>
    <Container maxWidth="xs">
      <BrowserRouter>
        <Switch>
          <Route exact path='/' component={SearchTitle}/>
          <Route exact path='/record/new' component={AddRecord} />
          <Route path='/record/edit/:record_id' component={EditRecord} />
        </Switch>
      </BrowserRouter>
    </Container>
  </>,
  document.getElementById('root')
);

serviceWorker.unregister();
