import React from 'react';
import Users from './pages/Users'
import SignIn from './pages/SignIn'
import Profile from './pages/Profile'
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
        <Route path="/profile" component={Profile} />
        <Route path="/users" component={Users} />
        <Route path="/games" component={SortedGamesList} />
        <Route path="/event" component={Event} />
        <Route path="/signin" component={SignIn} />
        <Route path="/" exact component={Event} />
        <Route component={PageNotFound} />
      </Switch>
    </Layout>
  );
}

export default App;
