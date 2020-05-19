import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import SearchTitle from './components/SearchTitle';
import AddRecord from './components/AddRecord';
import EditRecord from './components/EditRecord'

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={SearchTitle}/>
      <Route exact path='/new' component={AddRecord} />
      <Route path='/record/edit/:record_id' component={EditRecord} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
