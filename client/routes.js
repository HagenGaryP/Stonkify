import React from 'react';
import { withRouter, Route, Switch } from 'react-router-dom';

import { AllStocks, LandingPage, SingleStock } from './components';
const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={LandingPage} />
      <Route exact path="/stocks/:id" component={SingleStock} />
      <Route path="/stocks" component={AllStocks} />
    </Switch>
  );
}

export default Routes;
