import React from 'react';
import { connect } from 'react-redux'
import Users from './components/Users/Users'
import Event from './components/Event/Event'
import SortedGamesList from './components/SortedGamesList/SortedGamesList'
import { flattenArray } from './utils'

export const getPlayersAttending = (users) => {
  if (!users) {
    return []
  }
  return users.filter(user => user.attending)
}

export const getPlayersGames = (users) => {
  if (!users) {
    return []
  }
  const games = users.map(user => user.attending ? Object.values(user.games) : [])
  return flattenArray(games)
}

export const App = props => {
  return (
    <div className="App">
      <Users users={props.users} />
      <SortedGamesList games={props.games} />
      <Event players={getPlayersAttending(props.users)} games={getPlayersGames(props.users)} />
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
