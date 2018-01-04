import React from 'react';
import { connect } from 'react-redux'
import Users from './components/Users'
import Games from './components/Games'
import AppropriateGamesList from './components/AppropriateGamesList'

export const App = props => {
  return (
    <div className="App">
      <h1>Users</h1>
      <Users users={props.users} />
      <h1>All Games</h1>
      <Games games={props.games.sort((a, b) => {
        const alphabeticalSort = a.name < b.name ? -1 : a.name > b.name ? 1 : 0
        return (a.minPlayers - b.minPlayers) || (a.maxPlayers - b.maxPlayers) || alphabeticalSort
      })} />
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
