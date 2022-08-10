import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Register from '../pages/Register/index';

export default function Routes() {
  return (
    <Switch>
      <Route path="/register" component={ Register } />
    </Switch>
  );
}
