import React from 'react';
import Users from './components/Users/Users'
import Event from './components/Event/Event'
import SortedGamesList from './components/SortedGamesList/SortedGamesList'
import { Switch, Route } from 'react-router-dom'
import PageNotFound from './components/PageNotFound/PageNotFound'

const App = props => {
  return (
    <Switch>
      <Route path="/users" component={Users} />
      <Route path="/games" component={SortedGamesList} />
      <Route path="/event" component={Event} />
      <Route path="/" exact component={Event} />
      <Route component={PageNotFound} />
    </Switch>
  );
}

export default App;
