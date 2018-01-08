import React from 'react';
import Users from './components/Users/Users'
import Event from './components/Event/Event'
import SortedGamesList from './components/SortedGamesList/SortedGamesList'
import { Switch, Route } from 'react-router-dom'
import PageNotFound from './components/PageNotFound/PageNotFound'
import Layout from './components/Layout/Layout'
import './commonStyles.css'

const App = props => {
  return (
    <Layout>
      <Switch>
        <Route path="/users" component={Users} />
        <Route path="/games" component={SortedGamesList} />
        <Route path="/event" component={Event} />
        <Route path="/" exact component={Event} />
        <Route component={PageNotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
