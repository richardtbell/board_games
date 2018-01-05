import React from 'react';
import { connect } from 'react-redux'
import Users from './components/Users/Users'
import AppropriateGamesList from './components/AppropriateGamesList/AppropriateGamesList'
import SortedGamesList from './components/SortedGamesList/SortedGamesList'

export const App = props => {
  return (
    <div className="App">
      <Users users={props.users} />
      <SortedGamesList games={props.games} />
      <AppropriateGamesList numberOfPlayers={props.users.length} games={props.games} />
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    users: state.users,
    games: state.games
  }
}

export default connect(mapStateToProps)(App);
